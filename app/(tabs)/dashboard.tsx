import { LinearGradient } from "expo-linear-gradient";
import { Redirect, router } from "expo-router";
import { BookOpenCheck, Flame, FolderKanban, Rocket, Target, Timer, Trophy, Zap } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "../../src/components/AppCard";
import { GradientButton } from "../../src/components/GradientButton";
import { MentorCard } from "../../src/components/MentorCard";
import { ProgressBar } from "../../src/components/ProgressBar";
import { QuestCard } from "../../src/components/QuestCard";
import { Screen } from "../../src/components/Screen";
import { StatCard } from "../../src/components/StatCard";
import { colors, radii, spacing, typography } from "../../src/constants/theme";
import { getGoal } from "../../src/data/goals";
import { portfolioIdeas } from "../../src/data/portfolioIdeas";
import { quizzes } from "../../src/data/quizzes";
import { useAppStore } from "../../src/store/useAppStore";
import { getLocalDateKey } from "../../src/utils/date";
import { getMentorInsight } from "../../src/utils/mentor";
import { getDailyQuests } from "../../src/utils/questGenerator";
import {
  getCompletedTaskCount,
  getCurrentRank,
  getRoadmapProgress,
  getTaskCount,
  getXpProgress
} from "../../src/utils/progress";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
};

export default function DashboardScreen() {
  const profile = useAppStore((state) => state.profile);
  const xp = useAppStore((state) => state.xp);
  const streak = useAppStore((state) => state.streak);
  const completedTasks = useAppStore((state) => state.completedTasks);
  const completedQuests = useAppStore((state) => state.completedQuests);
  const completeQuest = useAppStore((state) => state.completeQuest);
  const quizResults = useAppStore((state) => state.quizResults);

  if (!profile) {
    return <Redirect href="/onboarding" />;
  }

  const goal = getGoal(profile.goalId);
  const todayKey = getLocalDateKey();
  const quests = getDailyQuests(profile.goalId, profile.dailyTime, completedTasks, todayKey, completedQuests);
  const recommendedQuest = quests[0];
  const roadmapProgress = getRoadmapProgress(profile.goalId, completedTasks);
  const completedTaskCount = getCompletedTaskCount(profile.goalId, completedTasks);
  const totalTaskCount = getTaskCount(profile.goalId);
  const mentorAdvice = getMentorInsight(profile.goalId, profile.level, profile.dailyTime, roadmapProgress);
  const rank = getCurrentRank(xp);
  const xpProgress = getXpProgress(xp);
  const completedQuizCount = quizResults.filter((result) => result.goalId === profile.goalId).length;

  return (
    <Screen>
      <LinearGradient colors={goal.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.heroTitle}>{goal.shortTitle} mission</Text>
          </View>
          <View style={styles.heroIcon}>
            <Rocket color={colors.black} size={24} />
          </View>
        </View>
        <Text style={styles.heroCopy}>{goal.description}</Text>
        <View style={styles.heroMetaRow}>
          <View style={styles.heroPill}>
            <Target color={colors.black} size={14} />
            <Text style={styles.heroPillText}>{profile.level}</Text>
          </View>
          <View style={styles.heroPill}>
            <Timer color={colors.black} size={14} />
            <Text style={styles.heroPillText}>{profile.dailyTime} min/day</Text>
          </View>
        </View>
      </LinearGradient>

      <AppCard contentStyle={styles.xpCard}>
        <View style={styles.xpHeader}>
          <View>
            <Text style={styles.eyebrow}>Current rank</Text>
            <Text style={styles.rank}>{rank}</Text>
          </View>
          <View style={styles.xpBadge}>
            <Zap color={colors.yellow} size={15} />
            <Text style={styles.xpBadgeText}>{xp} XP</Text>
          </View>
        </View>
        <ProgressBar value={xpProgress} height={11} />
        <Text style={styles.xpHelper}>{500 - (xp % 500)} XP until the next rank signal</Text>
      </AppCard>

      <View style={styles.statsGrid}>
        <StatCard
          label="Streak"
          value={`${streak} day${streak === 1 ? "" : "s"}`}
          helper="Quest completions"
          icon={<Flame color={colors.orange} size={18} />}
        />
        <StatCard
          label="Roadmap"
          value={`${roadmapProgress}%`}
          helper={`${completedTaskCount}/${totalTaskCount} tasks`}
          icon={<BookOpenCheck color={colors.green} size={18} />}
        />
        <StatCard
          label="Quizzes"
          value={`${completedQuizCount}/${quizzes[profile.goalId].length}`}
          helper="Attempts finished"
          icon={<Trophy color={colors.yellow} size={18} />}
        />
        <StatCard
          label="Portfolio"
          value={`${portfolioIdeas[profile.goalId].length}`}
          helper="Project prompts"
          icon={<FolderKanban color={colors.pink} size={18} />}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today&apos;s quest</Text>
        <Text style={styles.sectionHint}>Generated from your next roadmap task</Text>
      </View>
      {recommendedQuest ? (
        <QuestCard
          quest={recommendedQuest}
          completed={completedQuests.includes(recommendedQuest.id)}
          onComplete={() => completeQuest(recommendedQuest)}
        />
      ) : (
        <AppCard contentStyle={styles.doneCard}>
          <Text style={styles.doneTitle}>Roadmap cleared</Text>
          <Text style={styles.doneText}>Your next move is portfolio polish: pick an idea and make it demo-ready.</Text>
          <GradientButton label="View portfolio ideas" onPress={() => router.push("/portfolio")} variant="success" />
        </AppCard>
      )}

      <MentorCard advice={mentorAdvice} />

      <View style={styles.actions}>
        <GradientButton label="Open quests" onPress={() => router.push("/quests")} />
        <GradientButton label="Portfolio ideas" onPress={() => router.push("/portfolio")} variant="warm" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    overflow: "hidden"
  },
  heroHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  greeting: {
    color: "rgba(2,6,23,0.72)",
    fontSize: typography.small,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  heroTitle: {
    color: colors.black,
    fontSize: typography.h1,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  heroIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderRadius: radii.lg,
    backgroundColor: "rgba(255,255,255,0.34)"
  },
  heroCopy: {
    color: "rgba(2,6,23,0.76)",
    fontSize: typography.body,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: spacing.md
  },
  heroMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  heroPill: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255,255,255,0.32)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  heroPillText: {
    color: colors.black,
    fontSize: typography.small,
    fontWeight: "900",
    textTransform: "capitalize"
  },
  xpCard: {
    marginTop: spacing.md
  },
  xpHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md
  },
  eyebrow: {
    color: colors.textDim,
    fontSize: typography.tiny,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  rank: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  xpBadge: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: "rgba(250,204,21,0.12)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  xpBadgeText: {
    color: colors.yellow,
    fontSize: typography.small,
    fontWeight: "900"
  },
  xpHelper: {
    color: colors.textDim,
    fontSize: typography.small,
    marginTop: spacing.sm
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  sectionHeader: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  sectionHint: {
    color: colors.textDim,
    fontSize: typography.small,
    marginTop: spacing.xs
  },
  doneCard: {
    gap: spacing.md
  },
  doneTitle: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "900"
  },
  doneText: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.md
  }
});
