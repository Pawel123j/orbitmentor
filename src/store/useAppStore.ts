import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import type { DailyQuest, QuizResult, UserProfile } from "../types";
import { getLocalDateKey, isYesterday } from "../utils/date";

const STORAGE_KEY = "orbitmentor-store";

type AppState = {
  hasHydrated: boolean;
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

const addUnique = (items: string[], value: string) =>
  items.includes(value) ? items : [...items, value];

const removeItem = (items: string[], value: string) => items.filter((item) => item !== value);

const getNextStreak = (previousDateKey: string | null, todayKey: string, currentStreak: number) => {
  if (previousDateKey === todayKey) {
    return currentStreak;
  }

  if (previousDateKey && isYesterday(previousDateKey, todayKey)) {
    return currentStreak + 1;
  }

  return 1;
};

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

export const useAppStore = create<AppState>((set, get) => ({
  hasHydrated: false,
  onboardingCompleted: false,
  profile: null,
  ...initialProgress,
  setHasHydrated: (hasHydrated) => set({ hasHydrated }),
  completeOnboarding: (profile) =>
    set({
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
      set({
        completedTasks: removeItem(state.completedTasks, taskId)
      });
      return;
    }

    const alreadyRewarded = state.rewardedTaskIds.includes(taskId);

    set({
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

    set({
      completedQuests: addUnique(state.completedQuests, quest.id),
      completedTasks: addUnique(state.completedTasks, quest.taskId),
      rewardedTaskIds: addUnique(state.rewardedTaskIds, quest.taskId),
      xp: state.xp + quest.xp,
      streak: getNextStreak(state.lastQuestCompletionDate, todayKey, state.streak),
      lastQuestCompletionDate: todayKey
    });
  },
  recordQuizResult: (result) =>
    set((state) => ({
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
    set((state) => ({
      exploredPortfolioIdeas: addUnique(state.exploredPortfolioIdeas, ideaId)
    })),
  resetProgress: () => set({ ...initialProgress }),
  resetApp: () =>
    set({
      onboardingCompleted: false,
      profile: null,
      ...initialProgress
    })
}));

useAppStore.subscribe((state) => {
  if (!state.hasHydrated) {
    return;
  }

  void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(selectPersistedState(state)));
});

void (async () => {
  try {
    const storedState = await AsyncStorage.getItem(STORAGE_KEY);

    if (storedState) {
      useAppStore.setState({
        ...(JSON.parse(storedState) as PersistedAppState),
        hasHydrated: true
      });
      return;
    }
  } catch (error) {
    console.warn("Unable to hydrate OrbitMentor progress", error);
  }

  useAppStore.setState({ hasHydrated: true });
})();
