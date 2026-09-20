/**
 * Testy postępu i rang.
 *
 * To są liczby, które użytkownik widzi na pulpicie po każdym ukończonym
 * zadaniu. Błąd tutaj nie wywala aplikacji — po prostu pokazuje nieprawdę,
 * i to przez cały czas jej używania.
 */
import { roadmaps } from "../src/data/roadmaps";
import {
  flattenTasks,
  getCompletedTaskCount,
  getCurrentRank,
  getModuleProgress,
  getNextIncompleteTask,
  getRoadmapProgress,
  getTaskCount,
  getXpProgress
} from "../src/utils/progress";
import type { GoalId } from "../src/types";

const ALL_GOALS = Object.keys(roadmaps) as GoalId[];

// ── spójność danych ścieżek ─────────────────────────────────────────────

describe("dane ścieżek", () => {
  it.each(ALL_GOALS)("%s ma moduły i zadania", (goalId) => {
    expect(roadmaps[goalId].length).toBeGreaterThan(0);
    expect(getTaskCount(goalId)).toBeGreaterThan(0);
  });

  it("identyfikatory zadań są unikalne w obrębie całej aplikacji", () => {
    // Postęp jest liczony po identyfikatorach zadań. Powtórzony identyfikator
    // w dwóch ścieżkach sprawiłby, że ukończenie zadania w jednej zaliczałoby
    // je też w drugiej.
    const all = ALL_GOALS.flatMap((goalId) => flattenTasks(goalId).map((t) => t.id));
    expect(new Set(all).size).toBe(all.length);
  });

  it("każde zadanie ma dodatnie XP i czas", () => {
    for (const goalId of ALL_GOALS) {
      for (const task of flattenTasks(goalId)) {
        expect(task.xp).toBeGreaterThan(0);
        expect(task.estimatedMinutes).toBeGreaterThan(0);
        expect(task.title.trim()).not.toBe("");
      }
    }
  });
});

// ── postęp ścieżki ──────────────────────────────────────────────────────

describe("getRoadmapProgress", () => {
  it("pusta lista ukończonych daje zero", () => {
    expect(getRoadmapProgress("frontend", [])).toBe(0);
  });

  it("wszystkie zadania ukończone dają sto", () => {
    const all = flattenTasks("frontend").map((t) => t.id);
    expect(getRoadmapProgress("frontend", all)).toBe(100);
  });

  it("nigdy nie wychodzi poza zakres 0-100", () => {
    for (const goalId of ALL_GOALS) {
      const all = flattenTasks(goalId).map((t) => t.id);
      for (let i = 0; i <= all.length; i++) {
        const value = getRoadmapProgress(goalId, all.slice(0, i));
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      }
    }
  });

  it("nie liczy zadań z innej ścieżki", () => {
    // Store trzyma JEDNĄ listę ukończonych zadań dla wszystkich ścieżek.
    // Gdyby postęp liczył wszystko, co w niej leży, przełączenie celu
    // pokazywałoby fałszywy postęp od pierwszego dnia.
    const backendTasks = flattenTasks("backend").map((t) => t.id);
    expect(getRoadmapProgress("frontend", backendTasks)).toBe(0);
  });

  it("nie liczy identyfikatorów, których w ogóle nie ma", () => {
    expect(getCompletedTaskCount("frontend", ["nie-ma-takiego", "ani-takiego"])).toBe(0);
  });
});

describe("getModuleProgress", () => {
  const firstModule = roadmaps.frontend[0]!;

  it("liczy postęp w obrębie jednego modułu", () => {
    const half = firstModule.tasks
      .slice(0, Math.floor(firstModule.tasks.length / 2))
      .map((t) => t.id);

    const value = getModuleProgress(firstModule, half);
    expect(value).toBeGreaterThan(0);
    expect(value).toBeLessThan(100);
  });

  it("moduł bez zadań daje zero zamiast dzielenia przez zero", () => {
    expect(getModuleProgress({ ...firstModule, tasks: [] }, [])).toBe(0);
  });
});

describe("getNextIncompleteTask", () => {
  it("bez postępu zwraca pierwsze zadanie pierwszego modułu", () => {
    const firstTask = roadmaps.frontend[0]!.tasks[0]!;
    expect(getNextIncompleteTask("frontend", [])?.id).toBe(firstTask.id);
  });

  it("pomija ukończone i zwraca kolejne w kolejności", () => {
    const tasks = flattenTasks("frontend");
    expect(getNextIncompleteTask("frontend", [tasks[0]!.id])?.id).toBe(tasks[1]!.id);
  });

  it("po ukończeniu wszystkiego zwraca undefined", () => {
    const all = flattenTasks("frontend").map((t) => t.id);
    expect(getNextIncompleteTask("frontend", all)).toBeUndefined();
  });
});

// ── rangi ───────────────────────────────────────────────────────────────

describe("getCurrentRank", () => {
  it.each([
    [0, "New Explorer"],
    [299, "New Explorer"],
    [300, "Code Cadet"],
    [799, "Code Cadet"],
    [800, "Mission Builder"],
    [1499, "Mission Builder"],
    [1500, "Launch Lead"],
    [2499, "Launch Lead"],
    [2500, "Orbit Architect"],
    [999999, "Orbit Architect"]
  ])("%i XP → %s", (xp, expected) => {
    expect(getCurrentRank(xp)).toBe(expected);
  });

  it("ranga nigdy nie spada przy rosnącym XP", () => {
    const order = ["New Explorer", "Code Cadet", "Mission Builder", "Launch Lead", "Orbit Architect"];
    let last = 0;
    for (let xp = 0; xp <= 3000; xp += 25) {
      const index = order.indexOf(getCurrentRank(xp));
      expect(index).toBeGreaterThanOrEqual(last);
      last = index;
    }
  });
});

describe("getXpProgress", () => {
  it("początek poziomu to zero, połowa to pięćdziesiąt", () => {
    expect(getXpProgress(0)).toBe(0);
    expect(getXpProgress(250)).toBe(50);
    expect(getXpProgress(500)).toBe(0);   // nowy poziom zaczyna się od zera
    expect(getXpProgress(750)).toBe(50);
  });

  it("zawsze mieści się w zakresie 0-100", () => {
    for (let xp = 0; xp <= 5000; xp += 7) {
      const value = getXpProgress(xp);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });
});
