import { getGoal } from "../data/goals";
import type { DailyTime, GoalId, Level } from "../types";

export const getMentorInsight = (
  goalId: GoalId,
  level: Level,
  dailyTime: DailyTime,
  roadmapProgress: number
) => {
  const goal = getGoal(goalId);
  const cadence =
    dailyTime === 15
      ? "Keep the session tiny and finish one visible thing."
      : dailyTime === 30
        ? "Use the first 10 minutes to review, then build for 20."
        : "Protect a deep-work block and end by documenting what changed.";

  if (roadmapProgress >= 75) {
    return `You are close to a portfolio-level ${goal.shortTitle.toLowerCase()} foundation. Shift from collecting lessons to polishing a demo, README, and screenshots. ${cadence}`;
  }

  if (level === "intermediate") {
    return `Use your existing basics as leverage: build the task, then write a short tradeoff note about why you chose that approach. That habit makes your ${goal.shortTitle.toLowerCase()} work interview-ready.`;
  }

  return `Do not try to learn everything at once. One clean rep today beats a giant plan you avoid tomorrow. Focus on ${goal.signal.toLowerCase()} and keep proof of work in GitHub.`;
};
