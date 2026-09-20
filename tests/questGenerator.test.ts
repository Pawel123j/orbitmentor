/**
 * Testy generatora zadań dziennych i logiki serii.
 *
 * Seria (streak) jest tą częścią aplikacji, w której błąd widać dopiero po
 * dwóch dniach używania — i wtedy użytkownik traci postęp, na który pracował.
 * Dlatego jest tu sprawdzana osobno, razem z arytmetyką dat, na której stoi.
 */
import { getDailyQuests } from "../src/utils/questGenerator";
import { getLocalDateKey, getNextStreak, isYesterday } from "../src/utils/date";
import { roadmaps } from "../src/data/roadmaps";
import { flattenTasks } from "../src/utils/progress";

const DATE = "2026-09-20";

// ── daty ────────────────────────────────────────────────────────────────

describe("getLocalDateKey", () => {
  it("uzupełnia miesiąc i dzień zerami", () => {
    expect(getLocalDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
    expect(getLocalDateKey(new Date(2026, 11, 31))).toBe("2026-12-31");
  });

  it("używa czasu lokalnego, nie UTC", () => {
    // Data tuż przed północą czasu lokalnego nie może „przeskoczyć" na
    // następny dzień tylko dlatego, że w UTC jest już jutro — inaczej seria
    // zaliczałaby się o dzień za wcześnie dla części użytkowników.
    const late = new Date(2026, 5, 15, 23, 30);
    expect(getLocalDateKey(late)).toBe("2026-06-15");
  });
});

describe("isYesterday", () => {
  it("rozpoznaje dzień poprzedni", () => {
    expect(isYesterday("2026-09-19", "2026-09-20")).toBe(true);
  });

  it("działa przez granicę miesiąca", () => {
    expect(isYesterday("2026-08-31", "2026-09-01")).toBe(true);
  });

  it("działa przez granicę roku", () => {
    expect(isYesterday("2026-12-31", "2027-01-01")).toBe(true);
  });

  it("działa przez 29 lutego roku przestępnego", () => {
    expect(isYesterday("2028-02-29", "2028-03-01")).toBe(true);
    expect(isYesterday("2028-02-28", "2028-02-29")).toBe(true);
  });

  it("ten sam dzień to nie wczoraj", () => {
    expect(isYesterday("2026-09-20", "2026-09-20")).toBe(false);
  });

  it("dwa dni wstecz to nie wczoraj", () => {
    expect(isYesterday("2026-09-18", "2026-09-20")).toBe(false);
  });

  it("data z przyszłości to nie wczoraj", () => {
    expect(isYesterday("2026-09-21", "2026-09-20")).toBe(false);
  });

  it("niepoprawne wejście zwraca false zamiast wybuchać", () => {
    expect(isYesterday("", "2026-09-20")).toBe(false);
    expect(isYesterday("nonsens", "2026-09-20")).toBe(false);
  });
});

// ── seria ───────────────────────────────────────────────────────────────

describe("getNextStreak", () => {
  it("pierwsze zadanie w życiu zaczyna serię od jednego", () => {
    expect(getNextStreak(null, DATE, 0)).toBe(1);
  });

  it("drugie zadanie tego samego dnia nie podbija serii", () => {
    // Inaczej dałoby się nabić dowolną serię w jedno popołudnie.
    expect(getNextStreak(DATE, DATE, 5)).toBe(5);
  });

  it("zadanie dzień po dniu podbija serię o jeden", () => {
    expect(getNextStreak("2026-09-19", DATE, 5)).toBe(6);
  });

  it("przerwa dłuższa niż dzień resetuje serię do jednego", () => {
    // Do jednego, nie do zera: użytkownik właśnie coś ukończył, więc ten
    // dzień się liczy.
    expect(getNextStreak("2026-09-17", DATE, 12)).toBe(1);
  });

  it("seria przechodzi przez granicę roku", () => {
    expect(getNextStreak("2026-12-31", "2027-01-01", 9)).toBe(10);
  });
});

// ── generator zadań dziennych ───────────────────────────────────────────

describe("getDailyQuests", () => {
  it("piętnaście minut dziennie daje dwa zadania, więcej — trzy", () => {
    expect(getDailyQuests("frontend", 15, [], DATE)).toHaveLength(2);
    expect(getDailyQuests("frontend", 30, [], DATE)).toHaveLength(3);
    expect(getDailyQuests("frontend", 60, [], DATE)).toHaveLength(3);
  });

  it("czas zadania nigdy nie przekracza deklarowanego czasu dziennego", () => {
    // Zadanie na 40 minut w planie „15 minut dziennie" jest obietnicą,
    // której aplikacja nie dotrzyma.
    for (const time of [15, 30, 60] as const) {
      for (const quest of getDailyQuests("backend", time, [], DATE)) {
        expect(quest.estimatedMinutes).toBeLessThanOrEqual(time);
      }
    }
  });

  it("dłuższy czas dzienny daje więcej XP za to samo zadanie", () => {
    const short = getDailyQuests("frontend", 15, [], DATE)[0]!;
    const long = getDailyQuests("frontend", 60, [], DATE)[0]!;

    expect(long.taskId).toBe(short.taskId);
    expect(long.xp).toBeGreaterThan(short.xp);
  });

  it("identyfikator zadania zawiera datę, więc jutro pojawi się nowe", () => {
    const today = getDailyQuests("frontend", 30, [], "2026-09-20")[0]!;
    const tomorrow = getDailyQuests("frontend", 30, [], "2026-09-21")[0]!;

    expect(today.id).toContain("2026-09-20");
    expect(tomorrow.id).toContain("2026-09-21");
    expect(today.id).not.toBe(tomorrow.id);
  });

  it("trudność rośnie razem z numerem modułu", () => {
    // Pierwszy moduł to Starter, drugi Core, dalsze Stretch.
    const firstModuleTaskIds = new Set(roadmaps.frontend[0]!.tasks.map((t) => t.id));
    const quests = getDailyQuests("frontend", 60, [], DATE);

    for (const quest of quests) {
      if (firstModuleTaskIds.has(quest.taskId)) {
        expect(quest.difficulty).toBe("Starter");
      }
    }
  });

  it("ukończone zadania znikają z puli", () => {
    const firstTwo = flattenTasks("frontend").slice(0, 2).map((t) => t.id);
    const quests = getDailyQuests("frontend", 60, firstTwo, DATE);

    for (const quest of quests) {
      expect(firstTwo).not.toContain(quest.taskId);
    }
  });

  it("zadanie ukończone DZISIAJ zostaje na liście", () => {
    // Bez tego zadanie znikałoby w chwili odhaczenia i użytkownik nie
    // widziałby, że je zrobił — lista dnia skurczyłaby się w locie.
    const task = flattenTasks("frontend")[0]!;
    const questId = `${DATE}-${task.id}`;

    const quests = getDailyQuests("frontend", 60, [task.id], DATE, [questId]);
    expect(quests.map((q) => q.taskId)).toContain(task.id);
  });

  it("po ukończeniu całej ścieżki zwraca pustą listę zamiast wybuchać", () => {
    const all = flattenTasks("frontend").map((t) => t.id);
    expect(getDailyQuests("frontend", 30, all, DATE)).toEqual([]);
  });

  it("każde wygenerowane zadanie ma komplet pól wymaganych przez kartę", () => {
    for (const goalId of Object.keys(roadmaps) as Array<keyof typeof roadmaps>) {
      for (const quest of getDailyQuests(goalId, 30, [], DATE)) {
        expect(quest.id).toBeTruthy();
        expect(quest.taskId).toBeTruthy();
        expect(quest.title.trim()).not.toBe("");
        expect(quest.description.trim()).not.toBe("");
        expect(quest.moduleTitle.trim()).not.toBe("");
        expect(quest.xp).toBeGreaterThan(0);
        expect(quest.estimatedMinutes).toBeGreaterThan(0);
        expect(["Starter", "Core", "Stretch"]).toContain(quest.difficulty);
      }
    }
  });

  it("identyfikatory zadań dnia nie powtarzają się", () => {
    const quests = getDailyQuests("frontend", 60, [], DATE);
    expect(new Set(quests.map((q) => q.id)).size).toBe(quests.length);
  });
});
