export type GoalId =
  | "frontend"
  | "backend"
  | "mobile"
  | "python"
  | "cybersecurity"
  | "data";

export type Level = "beginner" | "intermediate";
export type DailyTime = 15 | 30 | 60;
export type Difficulty = "Starter" | "Core" | "Stretch";

export type LearningGoal = {
  id: GoalId;
  title: string;
  shortTitle: string;
  description: string;
  signal: string;
  gradient: readonly [string, string];
};

export type UserProfile = {
  goalId: GoalId;
  level: Level;
  dailyTime: DailyTime;
  createdAt: string;
};

export type RoadmapTask = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  xp: number;
};

export type RoadmapModule = {
  id: string;
  goalId: GoalId;
  title: string;
  description: string;
  milestone: string;
  accent: string;
  tasks: RoadmapTask[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type QuizResult = {
  id: string;
  goalId: GoalId;
  score: number;
  total: number;
  xpEarned: number;
  completedAt: string;
};

export type PortfolioIdea = {
  id: string;
  goalId: GoalId;
  title: string;
  description: string;
  difficulty: Difficulty;
  skills: string[];
  readmeSummary: string;
};

export type DailyQuest = {
  id: string;
  taskId: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  xp: number;
  estimatedMinutes: number;
  moduleTitle: string;
};
