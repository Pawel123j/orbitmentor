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
