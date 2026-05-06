import type { DailyTime, GoalId, LearningGoal, Level } from "../types";

export const goals: LearningGoal[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    shortTitle: "Frontend",
    description: "Build polished interfaces with HTML, CSS, TypeScript, React, accessibility, and product thinking.",
    signal: "UI systems, React, accessibility",
    gradient: ["#38D5F5", "#8B5CF6"]
  },
  {
    id: "backend",
    title: "Backend Developer",
    shortTitle: "Backend",
    description: "Design APIs, databases, authentication flows, background jobs, and reliable server-side systems.",
    signal: "APIs, databases, auth",
    gradient: ["#5EEAD4", "#2563EB"]
  },
  {
    id: "mobile",
    title: "Mobile Developer",
    shortTitle: "Mobile",
    description: "Ship Android-first apps with React Native, navigation, state, device APIs, and release discipline.",
    signal: "React Native, UX, release",
    gradient: ["#F472B6", "#38BDF8"]
  },
  {
    id: "python",
    title: "Python Developer",
    shortTitle: "Python",
    description: "Use Python for automation, scripts, APIs, data handling, testing, and portfolio-ready tools.",
    signal: "Python, automation, APIs",
    gradient: ["#FACC15", "#38D5F5"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    shortTitle: "Security",
    description: "Learn networking, Linux, threat modeling, web security, and defensive investigation workflows.",
    signal: "Linux, networks, web security",
    gradient: ["#FB923C", "#F43F5E"]
  },
  {
    id: "data",
    title: "Data Analyst",
    shortTitle: "Data",
    description: "Turn messy data into decisions with SQL, spreadsheets, Python, visualization, and storytelling.",
    signal: "SQL, Python, dashboards",
    gradient: ["#A3E635", "#14B8A6"]
  }
];

export const levels: { id: Level; title: string; description: string }[] = [
  {
    id: "beginner",
    title: "Beginner",
    description: "I want a guided foundation and clear first wins."
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "I know the basics and want structure, depth, and projects."
  }
];

export const dailyTimes: { value: DailyTime; title: string; description: string }[] = [
  {
    value: 15,
    title: "15 min",
    description: "Small daily reps"
  },
  {
    value: 30,
    title: "30 min",
    description: "Balanced progress"
  },
  {
    value: 60,
    title: "60 min",
    description: "Deep builder mode"
  }
];

export const getGoal = (goalId: GoalId) => {
  const goal = goals.find((item) => item.id === goalId);

  if (!goal) {
    throw new Error(`Unknown goal: ${goalId}`);
  }

  return goal;
};
