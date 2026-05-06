import { roadmaps } from "../data/roadmaps";
import type { GoalId, RoadmapModule, RoadmapTask } from "../types";

export const flattenTasks = (goalId: GoalId): RoadmapTask[] =>
  roadmaps[goalId].flatMap((module) => module.tasks);

export const getTaskCount = (goalId: GoalId) => flattenTasks(goalId).length;

export const getCompletedTaskCount = (goalId: GoalId, completedTasks: string[]) => {
  const taskIds = new Set(flattenTasks(goalId).map((task) => task.id));
  return completedTasks.filter((taskId) => taskIds.has(taskId)).length;
};

export const getRoadmapProgress = (goalId: GoalId, completedTasks: string[]) => {
  const total = getTaskCount(goalId);

  if (total === 0) {
    return 0;
  }

  return Math.round((getCompletedTaskCount(goalId, completedTasks) / total) * 100);
};

export const getModuleProgress = (module: RoadmapModule, completedTasks: string[]) => {
  if (module.tasks.length === 0) {
    return 0;
  }

  const completed = module.tasks.filter((task) => completedTasks.includes(task.id)).length;
  return Math.round((completed / module.tasks.length) * 100);
};

export const getNextIncompleteTask = (goalId: GoalId, completedTasks: string[]) =>
  flattenTasks(goalId).find((task) => !completedTasks.includes(task.id));

export const getCurrentRank = (xp: number) => {
  if (xp >= 2500) {
    return "Orbit Architect";
  }

  if (xp >= 1500) {
    return "Launch Lead";
  }

  if (xp >= 800) {
    return "Mission Builder";
  }

  if (xp >= 300) {
    return "Code Cadet";
  }

  return "New Explorer";
};

export const getXpProgress = (xp: number) => {
  const tierSize = 500;
  return Math.min(100, Math.round(((xp % tierSize) / tierSize) * 100));
};
