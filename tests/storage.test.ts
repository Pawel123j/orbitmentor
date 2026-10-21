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
  expect(JSON.parse(mockSetItem.mock.calls.at(-1)[1]).completedTasks).toEqual(["first", "second"]);
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
  expect(JSON.parse(mockSetItem.mock.calls[1][1]).completedTasks).toEqual(["first", "second"]);
});
