import { roadmaps } from "../data/roadmaps";
import type { DailyQuest, DailyTime, Difficulty, GoalId } from "../types";
import { getLocalDateKey } from "./date";

const difficultyByIndex = (moduleIndex: number): Difficulty => {
  if (moduleIndex === 0) {
    return "Starter";
  }

  if (moduleIndex === 1) {
    return "Core";
  }

  return "Stretch";
};

const timeMultiplier: Record<DailyTime, number> = {
  15: 0.75,
  30: 1,
  60: 1.2
};

export const getDailyQuests = (
  goalId: GoalId,
  dailyTime: DailyTime,
  completedTasks: string[],
  dateKey = getLocalDateKey(),
  completedQuests: string[] = []
): DailyQuest[] => {
  const modules = roadmaps[goalId];
  const candidates = modules.flatMap((module, moduleIndex) =>
    module.tasks
      .filter((task) => {
        const questId = `${dateKey}-${task.id}`;
        return !completedTasks.includes(task.id) || completedQuests.includes(questId);
      })
      .map((task) => ({
        task,
        module,
        moduleIndex
      }))
  );

  return candidates.slice(0, dailyTime === 15 ? 2 : 3).map(({ task, module, moduleIndex }, index) => {
    const adjustedXp = Math.round(task.xp * timeMultiplier[dailyTime]) + index * 5;

    return {
      id: `${dateKey}-${task.id}`,
      taskId: task.id,
      title: task.title,
      description: task.description,
      difficulty: difficultyByIndex(moduleIndex),
      xp: adjustedXp,
      estimatedMinutes: Math.min(dailyTime, task.estimatedMinutes),
      moduleTitle: module.title
    };
  });
};
