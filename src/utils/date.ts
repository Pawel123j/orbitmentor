const pad = (value: number) => String(value).padStart(2, "0");

export const getLocalDateKey = (date = new Date()) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const isYesterday = (previousDateKey: string, todayKey: string) => {
  const [prevYear, prevMonth, prevDay] = previousDateKey.split("-").map(Number);
  const [todayYear, todayMonth, todayDay] = todayKey.split("-").map(Number);

  if (!prevYear || !prevMonth || !prevDay || !todayYear || !todayMonth || !todayDay) {
    return false;
  }

  const previous = new Date(prevYear, prevMonth - 1, prevDay).getTime();
  const today = new Date(todayYear, todayMonth - 1, todayDay).getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  return today - previous === oneDay;
};

/**
 * Wylicza nową długość serii po ukończeniu zadania dziennego.
 *
 * Mieszka tutaj, a nie w store, bo to czysta reguła oparta na datach —
 * store jedynie ją wywołuje. Dzięki temu da się ją przetestować bez
 * stawiania zustanda razem z warstwą trwałości na AsyncStorage, która
 * w środowisku node w ogóle się nie uruchamia.
 *
 * Trzy przypadki:
 *  - ten sam dzień  → seria bez zmian (inaczej dałoby się nabić dowolną
 *    serię w jedno popołudnie),
 *  - dzień po dniu  → +1,
 *  - dłuższa przerwa lub pierwszy raz → 1, nie 0: użytkownik właśnie coś
 *    ukończył, więc dzisiejszy dzień się liczy.
 */
export const getNextStreak = (
  previousDateKey: string | null,
  todayKey: string,
  currentStreak: number
) => {
  if (previousDateKey === todayKey) {
    return currentStreak;
  }

  if (previousDateKey && isYesterday(previousDateKey, todayKey)) {
    return currentStreak + 1;
  }

  return 1;
};
