import { Redirect, router } from "expo-router";
import {
  Award,
  BadgeCheck,
  BookOpenCheck,
  ClipboardCheck,
  Flame,
  FolderKanban,
  RotateCcw,
  Trophy,
  UserRound,
  Zap
} from "lucide-react-native";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AchievementBadge } from "../../src/components/AchievementBadge";
import { AppCard } from "../../src/components/AppCard";
import { GradientButton } from "../../src/components/GradientButton";
import { ProgressBar } from "../../src/components/ProgressBar";
import { Screen } from "../../src/components/Screen";
import { StatCard } from "../../src/components/StatCard";
import { colors, radii, spacing, typography } from "../../src/constants/theme";
import { getGoal } from "../../src/data/goals";
import { portfolioIdeas } from "../../src/data/portfolioIdeas";
import { useAppStore } from "../../src/store/useAppStore";
import { getCompletedTaskCount, getCurrentRank, getRoadmapProgress, getTaskCount, getXpProgress } from "../../src/utils/progress";

export default function ProfileScreen() {
  const profile = useAppStore((state) => state.profile);
  const xp = useAppStore((state) => state.xp);
  const streak = useAppStore((state) => state.streak);
  const completedTasks = useAppStore((state) => state.completedTasks);
  const completedQuests = useAppStore((state) => state.completedQuests);
  const quizResults = useAppStore((state) => state.quizResults);
  const exploredPortfolioIdeas = useAppStore((state) => state.exploredPortfolioIdeas);
  const resetProgress = useAppStore((state) => state.resetProgress);

  if (!profile) {
    return <Redirect href="/onboarding" />;
  }

  const goal = getGoal(profile.goalId);
  const completedTaskCount = getCompletedTaskCount(profile.goalId, completedTasks);
  const roadmapProgress = getRoadmapProgress(profile.goalId, completedTasks);
  const quizCount = quizResults.filter((result) => result.goalId === profile.goalId).length;
  const projectCount = portfolioIdeas[profile.goalId].length;
  const rank = getCurrentRank(xp);

  const achievements = [
    {
      title: "First Quest",
      description: "Complete any daily quest.",
      earned: completedQuests.length > 0,
      icon: <ClipboardCheck color={completedQuests.length > 0 ? colors.green : colors.textDim} size={20} />
    },
    {
      title: "3 Day Streak",
      description: "Complete quests on three consecutive days.",
      earned: streak >= 3,
      icon: <Flame color={streak >= 3 ? colors.orange : colors.textDim} size={20} />
    },
    {
      title: "Quiz Rookie",
      description: "Finish your first mini quiz.",
      earned: quizCount > 0,
      icon: <Trophy color={quizCount > 0 ? colors.yellow : colors.textDim} size={20} />
    },
    {
      title: "Roadmap Explorer",
      description: "Complete at least three roadmap tasks.",
      earned: completedTaskCount >= 3,
      icon: <BookOpenCheck color={completedTaskCount >= 3 ? colors.cyan : colors.textDim} size={20} />
    },
    {
      title: "Portfolio Builder",
      description: "Explore one portfolio project idea.",
      earned: exploredPortfolioIdeas.length > 0,
      icon: <FolderKanban color={exploredPortfolioIdeas.length > 0 ? colors.pink : colors.textDim} size={20} />
    }
  ];

  const confirmReset = () => {
    Alert.alert(
      "Reset progress?",
      "This clears XP, streaks, completed tasks, quests, quizzes, and achievements. Your onboarding choices stay saved.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: resetProgress
        }
      ]
    );
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <UserRound color={colors.cyan} size={23} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>{goal.title}</Text>
          <Text style={styles.title}>Profile</Text>
        </View>
      </View>

      <AppCard contentStyle={styles.identityCard}>
        <View style={styles.identityTop}>
          <View>
            <Text style={styles.identityLabel}>Developer path</Text>
            <Text style={styles.identityTitle}>{goal.title}</Text>
          </View>
          <View style={styles.rankBadge}>
            <Award color={colors.yellow} size={15} />
            <Text style={styles.rankBadgeText}>{rank}</Text>
          </View>
        </View>
        <Text style={styles.identityCopy}>
          {profile.level === "beginner" ? "Beginner foundation" : "Intermediate acceleration"} with {profile.dailyTime} focused minutes per day.
        </Text>
        <View style={styles.xpLine}>
          <Text style={styles.xpLabel}>{xp} XP</Text>
          <Text style={styles.xpLabel}>{getXpProgress(xp)}%</Text>
        </View>
        <ProgressBar value={getXpProgress(xp)} />
      </AppCard>

      <View style={styles.statsGrid}>
        <StatCard label="Streak" value={`${streak}`} helper="days" icon={<Flame color={colors.orange} size={18} />} />
        <StatCard label="Tasks" value={`${completedTaskCount}`} helper={`${getTaskCount(profile.goalId)} total`} icon={<BadgeCheck color={colors.green} size={18} />} />
        <StatCard label="Quizzes" value={`${quizCount}`} helper="completed" icon={<Trophy color={colors.yellow} size={18} />} />
        <StatCard label="Roadmap" value={`${roadmapProgress}%`} helper="complete" icon={<Zap color={colors.cyan} size={18} />} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <Text style={styles.sectionHint}>Earned badges turn bright as you build momentum.</Text>
      </View>
      <View style={styles.achievements}>
        {achievements.map((achievement) => (
          <AchievementBadge
            key={achievement.title}
            title={achievement.title}
            description={achievement.description}
            earned={achievement.earned}
            icon={achievement.icon}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <GradientButton
          label={`Explore ${projectCount} project ideas`}
          onPress={() => router.push("/portfolio")}
          variant="warm"
          icon={<FolderKanban color={colors.black} size={18} />}
        />
        <GradientButton
          label="Reset progress"
          onPress={confirmReset}
          variant="primary"
          icon={<RotateCcw color={colors.black} size={18} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md
  },
  headerIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: "rgba(56,213,245,0.12)",
    borderWidth: 1,
    borderColor: "rgba(56,213,245,0.28)"
  },
  headerText: {
    flex: 1
  },
  eyebrow: {
    color: colors.textDim,
    fontSize: typography.small,
    fontWeight: "800"
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: "900"
  },
  identityCard: {
    marginTop: spacing.lg
  },
  identityTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  identityLabel: {
    color: colors.textDim,
    fontSize: typography.tiny,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  identityTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  rankBadge: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    flexShrink: 1,
    borderRadius: radii.pill,
    backgroundColor: "rgba(250,204,21,0.12)",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  rankBadgeText: {
    color: colors.yellow,
    fontSize: typography.tiny,
    fontWeight: "900"
  },
  identityCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.md
  },
  xpLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    marginBottom: spacing.xs
  },
  xpLabel: {
    color: colors.textMuted,
    fontSize: typography.small,
    fontWeight: "900"
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
  achievements: {
    gap: spacing.sm
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.lg
  }
});
