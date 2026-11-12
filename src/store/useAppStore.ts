import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { z } from "zod";
import type { DailyQuest, QuizResult, UserProfile } from "../types";
import { getLocalDateKey, getNextStreak } from "../utils/date";

const STORAGE_KEY = "orbitmentor-store";

type AppState = {
  hasHydrated: boolean;
  isRestoring: boolean;
  storageError: string | null;
  onboardingCompleted: boolean;
  profile: UserProfile | null;
  xp: number;
  streak: number;
  lastQuestCompletionDate: string | null;
  completedTasks: string[];
  rewardedTaskIds: string[];
  completedQuests: string[];
  quizResults: QuizResult[];
  exploredPortfolioIdeas: string[];
  setHasHydrated: (hasHydrated: boolean) => void;
  completeOnboarding: (profile: Omit<UserProfile, "createdAt">) => void;
  toggleTaskCompletion: (taskId: string, xpReward?: number) => void;
  completeQuest: (quest: DailyQuest) => void;
  recordQuizResult: (result: Omit<QuizResult, "id" | "completedAt">) => void;
  markPortfolioExplored: (ideaId: string) => void;
  resetProgress: () => void;
  resetApp: () => void;
};

type PersistedAppState = Pick<
  AppState,
  | "onboardingCompleted"
  | "profile"
  | "xp"
  | "streak"
  | "lastQuestCompletionDate"
  | "completedTasks"
  | "rewardedTaskIds"
  | "completedQuests"
  | "quizResults"
  | "exploredPortfolioIdeas"
>;

const goalId = z.enum(["frontend", "backend", "mobile", "python", "cybersecurity", "data"]);
export const persistedSchema = z.object({
  onboardingCompleted: z.boolean(),
  profile: z.object({
    goalId, level: z.enum(["beginner", "intermediate"]),
    dailyTime: z.union([z.literal(15), z.literal(30), z.literal(60)]),
    createdAt: z.string()
  }).nullable(),
  xp: z.number().int().nonnegative(),
  streak: z.number().int().nonnegative(),
  lastQuestCompletionDate: z.string().nullable(),
  completedTasks: z.array(z.string()),
  rewardedTaskIds: z.array(z.string()),
  completedQuests: z.array(z.string()),
  quizResults: z.array(z.object({
    id: z.string(), goalId, score: z.number().int().nonnegative(),
    total: z.number().int().positive(), xpEarned: z.number().int().nonnegative(),
    completedAt: z.string()
  })),
  exploredPortfolioIdeas: z.array(z.string())
}).refine((state) => !state.onboardingCompleted || state.profile !== null);

const addUnique = (items: string[], value: string) =>
  items.includes(value) ? items : [...items, value];

const removeItem = (items: string[], value: string) => items.filter((item) => item !== value);

const initialProgress = {
  xp: 0,
  streak: 0,
  lastQuestCompletionDate: null,
  completedTasks: [],
  rewardedTaskIds: [],
  completedQuests: [],
  quizResults: [],
  exploredPortfolioIdeas: []
};

const selectPersistedState = (state: AppState): PersistedAppState => ({
  onboardingCompleted: state.onboardingCompleted,
  profile: state.profile,
  xp: state.xp,
  streak: state.streak,
  lastQuestCompletionDate: state.lastQuestCompletionDate,
  completedTasks: state.completedTasks,
  rewardedTaskIds: state.rewardedTaskIds,
  completedQuests: state.completedQuests,
  quizResults: state.quizResults,
  exploredPortfolioIdeas: state.exploredPortfolioIdeas
});

export const useAppStore = create<AppState>((set, get) => {
  // Import commits to storage before exposing its snapshot. No progress action
  // may queue a snapshot of the old state while that transaction is in flight.
  const updateProgress = (
    update: Partial<PersistedAppState> | ((state: AppState) => Partial<PersistedAppState>)
  ) => {
    if (!get().hasHydrated || get().isRestoring) return;
    set(update);
  };
  return {
    hasHydrated: false,
    isRestoring: false,
    storageError: null,
    onboardingCompleted: false,
    profile: null,
    ...initialProgress,
    setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    completeOnboarding: (profile) =>
      updateProgress({
        profile: {
          ...profile,
          createdAt: new Date().toISOString()
        },
        onboardingCompleted: true
      }),
    toggleTaskCompletion: (taskId, xpReward = 15) => {
      const state = get();
      const isCompleted = state.completedTasks.includes(taskId);

      if (isCompleted) {
        updateProgress({
          completedTasks: removeItem(state.completedTasks, taskId)
        });
        return;
      }

      const alreadyRewarded = state.rewardedTaskIds.includes(taskId);

      updateProgress({
        completedTasks: addUnique(state.completedTasks, taskId),
        rewardedTaskIds: addUnique(state.rewardedTaskIds, taskId),
        xp: alreadyRewarded ? state.xp : state.xp + xpReward
      });
    },
    completeQuest: (quest) => {
      const state = get();

      if (state.completedQuests.includes(quest.id)) {
        return;
      }

      const todayKey = getLocalDateKey();

      updateProgress({
        completedQuests: addUnique(state.completedQuests, quest.id),
        completedTasks: addUnique(state.completedTasks, quest.taskId),
        rewardedTaskIds: addUnique(state.rewardedTaskIds, quest.taskId),
        xp: state.xp + quest.xp,
        streak: getNextStreak(state.lastQuestCompletionDate, todayKey, state.streak),
        lastQuestCompletionDate: todayKey
      });
    },
    recordQuizResult: (result) =>
      updateProgress((state) => ({
        quizResults: [
          ...state.quizResults,
          {
            ...result,
            id: `${result.goalId}-${Date.now()}`,
            completedAt: new Date().toISOString()
          }
        ],
        xp: state.xp + result.xpEarned
      })),
    markPortfolioExplored: (ideaId) =>
      updateProgress((state) => ({
        exploredPortfolioIdeas: addUnique(state.exploredPortfolioIdeas, ideaId)
      })),
    resetProgress: () => updateProgress({ ...initialProgress }),
    resetApp: () =>
      updateProgress({
        onboardingCompleted: false,
        profile: null,
        ...initialProgress
      })
  };
});

let persistenceEnabled = false;
let writes: Promise<void> = Promise.resolve();

useAppStore.subscribe((state, previous) => {
  if (!persistenceEnabled || !state.hasHydrated) {
    return;
  }
  const snapshot = encodeProgress(state);
  if (snapshot === encodeProgress(previous)) return;
  // Ordered writes prevent a slower old snapshot replacing newer progress.
  writes = writes.then(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, snapshot);
      useAppStore.setState({ storageError: null });
    } catch {
      useAppStore.setState({ storageError: "Progress could not be saved. Keep this session open and try another action when storage is available." });
    }
  });
});

void (async () => {
  try {
    const storedState = await AsyncStorage.getItem(STORAGE_KEY);

    const restored = storedState ? decodeProgress(storedState) : {};
    // Zod strips unknown keys: stored data cannot replace store actions.
    useAppStore.setState({ ...restored, hasHydrated: true });
    persistenceEnabled = true;
  } catch {
    // Keep the original stored bytes. In particular, do not write default
    // progress after a read failure or corrupt payload.
    useAppStore.setState({
      hasHydrated: true,
      storageError: "Saved progress could not be loaded. The stored copy is unchanged. Changes in this session will not be saved; restart the app to retry."
    });
  }
})();


/** Version 1 wraps the original unversioned payload without changing progress. */
export function decodeProgress(raw: string): PersistedAppState {
  if (raw.length > 2_000_000) throw new Error("Backup is too large (maximum 2 MB).");
  const value: unknown = JSON.parse(raw);
  if (typeof value !== "object" || value === null) throw new Error("Invalid backup.");
  if ("version" in value || "app" in value) {
    const envelope = z.object({ app: z.literal("orbitmentor"), version: z.literal(1), state: persistedSchema }).parse(value);
    return envelope.state;
  }
  return persistedSchema.parse(value);
}

function encodeProgress(state: AppState): string {
  return JSON.stringify({ app: "orbitmentor", version: 1, state: selectPersistedState(state) });
}

export function exportProgress(): string {
  return encodeProgress(useAppStore.getState());
}

/** Parse before writing. Commit storage before replacing the visible progress. */
export async function importProgress(raw: string): Promise<void> {
  if (!useAppStore.getState().hasHydrated) throw new Error("Progress is still loading.");
  if (useAppStore.getState().isRestoring) throw new Error("A restore is already in progress.");
  const restored = decodeProgress(raw);
  const snapshot = JSON.stringify({ app: "orbitmentor", version: 1, state: restored });
  // Acquire synchronously, including while previous ordinary writes finish.
  useAppStore.setState({ isRestoring: true });
  const operation = writes.then(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, snapshot);
      persistenceEnabled = false;
      useAppStore.setState({ ...restored, hasHydrated: true, storageError: null });
      persistenceEnabled = true;
    } finally {
      useAppStore.setState({ isRestoring: false });
    }
  });
  writes = operation.catch(() => undefined);
  await operation;
}
