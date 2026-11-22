const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: { getItem: (...args: unknown[]) => mockGetItem(...args), setItem: (...args: unknown[]) => mockSetItem(...args) }
}));

const empty = {
  onboardingCompleted: false, profile: null, xp: 0, streak: 0,
  lastQuestCompletionDate: null, completedTasks: [], rewardedTaskIds: [],
  completedQuests: [], quizResults: [], exploredPortfolioIdeas: []
};
const settle = () => new Promise<void>((resolve) => setImmediate(resolve));
async function load(raw: string | null | Error) {
  jest.resetModules();
  mockGetItem.mockReset(); mockSetItem.mockReset();
  mockSetItem.mockResolvedValue(undefined);
  if (raw instanceof Error) mockGetItem.mockRejectedValue(raw);
  else mockGetItem.mockResolvedValue(raw);
  const { useAppStore } = await import("../src/store/useAppStore");
  await settle();
  return useAppStore;
}

test.each(["{invalid", JSON.stringify({ ...empty, completedTasks: null }), JSON.stringify({ ...empty, xp: -1 }), new Error("storage unavailable")])(
  "invalid or unreadable progress remains untouched", async (raw) => {
    const store = await load(raw);
    expect(store.getState().hasHydrated).toBe(true);
    expect(store.getState().storageError).toMatch(/stored copy is unchanged/);
    store.getState().toggleTaskCompletion("task");
    await settle();
    expect(mockSetItem).not.toHaveBeenCalled();
  }
);

test("stored unknown fields cannot replace actions and hydration does not rewrite data", async () => {
  const store = await load(JSON.stringify({ ...empty, xp: 75, resetApp: "broken", hasHydrated: false }));
  expect(typeof store.getState().resetApp).toBe("function");
  expect(store.getState()).toMatchObject({ xp: 75, hasHydrated: true, storageError: null });
  expect(mockSetItem).not.toHaveBeenCalled();
});

test("write failure is handled and a later action can save successfully", async () => {
  const store = await load(null);
  mockSetItem.mockRejectedValueOnce(new Error("disk full"));
  store.getState().toggleTaskCompletion("first");
  await settle();
  expect(store.getState().storageError).toMatch(/could not be saved/);
  store.getState().toggleTaskCompletion("second");
  await settle();
  expect(store.getState().storageError).toBeNull();
  expect(JSON.parse(mockSetItem.mock.calls.at(-1)[1]).state.completedTasks).toEqual(["first", "second"]);
});

test("rapid actions serialize writes so old snapshots cannot overwrite new progress", async () => {
  const store = await load(null);
  let finish: (() => void) | undefined;
  mockSetItem.mockImplementationOnce(() => new Promise<void>((resolve) => { finish = resolve; }));
  store.getState().toggleTaskCompletion("first");
  store.getState().toggleTaskCompletion("second");
  await settle();
  expect(mockSetItem).toHaveBeenCalledTimes(1);
  finish!();
  await settle();
  expect(mockSetItem).toHaveBeenCalledTimes(2);
  expect(JSON.parse(mockSetItem.mock.calls[1][1]).state.completedTasks).toEqual(["first", "second"]);
});


test("versioned backup round-trips progress into a clean installation", async () => {
  const store = await load(null);
  store.getState().toggleTaskCompletion("lesson-1");
  await settle();
  const api = await import("../src/store/useAppStore");
  const backup = api.exportProgress();
  expect(JSON.parse(backup).version).toBe(1);
  store.getState().resetProgress();
  await api.importProgress(backup);
  expect(store.getState().completedTasks).toEqual(["lesson-1"]);
  expect(store.getState().xp).toBe(15);
  expect(JSON.parse(mockSetItem.mock.calls.at(-1)[1]).state.xp).toBe(15);
});

test("unsupported and malformed backups never replace current progress", async () => {
  const store = await load(JSON.stringify({ ...empty, xp: 100 }));
  const api = await import("../src/store/useAppStore");
  for (const raw of ["{", JSON.stringify({ app: "orbitmentor", version: 9, state: empty }), JSON.stringify({ ...empty, xp: -5 })]) {
    await expect(api.importProgress(raw)).rejects.toThrow();
  }
  expect(store.getState().xp).toBe(100);
  expect(mockSetItem).not.toHaveBeenCalled();
});

test("failed restore leaves current memory and storage intact and can retry", async () => {
  const store = await load(JSON.stringify({ ...empty, xp: 100 }));
  const api = await import("../src/store/useAppStore");
  mockSetItem.mockRejectedValueOnce(new Error("disk full"));
  await expect(api.importProgress(JSON.stringify(empty))).rejects.toThrow("disk full");
  expect(store.getState().xp).toBe(100);
  await api.importProgress(JSON.stringify(empty));
  expect(store.getState().xp).toBe(0);
});

test("restore locks all progress actions until the same snapshot is visible and durable", async () => {
  const store = await load(JSON.stringify({ ...empty, xp: 20 }));
  const api = await import("../src/store/useAppStore");
  let finish: (() => void) | undefined;
  let saved = "";
  mockSetItem.mockImplementationOnce((_key: string, value: string) => new Promise<void>((resolve) => {
    finish = () => { saved = value; resolve(); };
  }));
  const restore = api.importProgress(JSON.stringify({ ...empty, xp: 100 }));
  expect(store.getState().isRestoring).toBe(true);
  await settle();

  store.getState().toggleTaskCompletion("during-restore");
  store.getState().completeQuest({
    id: "restore-quest", taskId: "quest-task", title: "Quest", description: "",
    difficulty: "Starter", xp: 50, estimatedMinutes: 15, moduleTitle: "Module"
  });
  store.getState().completeOnboarding({ goalId: "python", level: "beginner", dailyTime: 15 });
  store.getState().recordQuizResult({ goalId: "python", score: 1, total: 1, xpEarned: 20 });
  store.getState().markPortfolioExplored("project");
  store.getState().resetProgress();
  store.getState().resetApp();
  expect(store.getState()).toMatchObject({ ...empty, xp: 20 });
  await expect(api.importProgress(JSON.stringify(empty))).rejects.toThrow(/already/i);

  finish!();
  await restore;
  await settle();
  expect(store.getState()).toMatchObject({ ...empty, xp: 100, isRestoring: false });
  expect(mockSetItem).toHaveBeenCalledTimes(1);
  const restarted = await load(saved);
  expect(restarted.getState()).toMatchObject({ ...empty, xp: 100 });
  restarted.getState().toggleTaskCompletion("after-restore");
  await settle();
  expect(restarted.getState().xp).toBe(115);
  expect(JSON.parse(mockSetItem.mock.calls.at(-1)[1]).state.xp).toBe(115);
});

test("restore waits for previous writes and releases the progress lock on failure", async () => {
  const store = await load(null);
  const api = await import("../src/store/useAppStore");
  let finish: (() => void) | undefined;
  mockSetItem.mockImplementationOnce(() => new Promise<void>((resolve) => { finish = resolve; }));
  store.getState().toggleTaskCompletion("before-restore");
  await settle();
  mockSetItem.mockRejectedValueOnce(new Error("disk full"));
  const restore = api.importProgress(JSON.stringify({ ...empty, xp: 100 }));
  const rejected = expect(restore).rejects.toThrow("disk full");
  store.getState().toggleTaskCompletion("during-restore");
  expect(store.getState().completedTasks).toEqual(["before-restore"]);
  expect(mockSetItem).toHaveBeenCalledTimes(1);
  finish!();
  await rejected;
  expect(store.getState()).toMatchObject({ xp: 15, isRestoring: false });
  store.getState().toggleTaskCompletion("after-failure");
  await settle();
  expect(store.getState().xp).toBe(30);
  expect(JSON.parse(mockSetItem.mock.calls.at(-1)[1]).state.completedTasks).toEqual(["before-restore", "after-failure"]);
});

test("hydration blocks progress changes and imports until stored data is available", async () => {
  jest.resetModules();
  mockGetItem.mockReset(); mockSetItem.mockReset();
  let finish: ((value: string) => void) | undefined;
  mockGetItem.mockImplementationOnce(() => new Promise<string>((resolve) => { finish = resolve; }));
  const api = await import("../src/store/useAppStore");
  const store = api.useAppStore;
  store.getState().toggleTaskCompletion("premature");
  store.getState().completeOnboarding({ goalId: "python", level: "beginner", dailyTime: 15 });
  expect(store.getState()).toMatchObject({ ...empty, hasHydrated: false });
  await expect(api.importProgress(JSON.stringify(empty))).rejects.toThrow(/loading/i);
  expect(mockSetItem).not.toHaveBeenCalled();
  finish!(JSON.stringify({ ...empty, xp: 70 }));
  await settle();
  expect(store.getState()).toMatchObject({ ...empty, xp: 70, hasHydrated: true });
  expect(mockSetItem).not.toHaveBeenCalled();
});
