import { Redirect, router } from "expo-router";
import { BadgeCheck, ClipboardCheck, PartyPopper, Rocket } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { EmptyState } from "../../src/components/EmptyState";
import { GradientButton } from "../../src/components/GradientButton";
import { ProgressBar } from "../../src/components/ProgressBar";
import { QuestCard } from "../../src/components/QuestCard";
import { Screen } from "../../src/components/Screen";
import { colors, radii, spacing, typography } from "../../src/constants/theme";
import { getGoal } from "../../src/data/goals";
import { useAppStore } from "../../src/store/useAppStore";
import { getLocalDateKey } from "../../src/utils/date";
import { getDailyQuests } from "../../src/utils/questGenerator";
import { getRoadmapProgress } from "../../src/utils/progress";

export default function QuestsScreen() {
  const profile = useAppStore((state) => state.profile);
  const completedTasks = useAppStore((state) => state.completedTasks);
  const completedQuests = useAppStore((state) => state.completedQuests);
  const completeQuest = useAppStore((state) => state.completeQuest);

  if (!profile) {
    return <Redirect href="/onboarding" />;
  }

  const goal = getGoal(profile.goalId);
  const todayKey = getLocalDateKey();
  const dailyQuests = getDailyQuests(
    profile.goalId,
    profile.dailyTime,
    completedTasks,
    todayKey,
    completedQuests
  );
  const completedToday = dailyQuests.filter((quest) => completedQuests.includes(quest.id)).length;
  const allDone = dailyQuests.length > 0 && completedToday === dailyQuests.length;
  const completionValue = dailyQuests.length === 0 ? 100 : Math.round((completedToday / dailyQuests.length) * 100);
  const roadmapProgress = getRoadmapProgress(profile.goalId, completedTasks);

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <ClipboardCheck color={colors.green} size={23} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>{goal.shortTitle} daily loop</Text>
          <Text style={styles.title}>Daily quests</Text>
        </View>
      </View>

      <View style={styles.focusCard}>
        <Text style={styles.focusLabel}>Today&apos;s focus</Text>
        <Text style={styles.focusTitle}>{completedToday}/{dailyQuests.length} quests complete</Text>
        <ProgressBar value={completionValue} />
        <Text style={styles.focusCopy}>
          Your {profile.dailyTime}-minute plan is generated from the next useful roadmap tasks.
          Roadmap progress is now {roadmapProgress}%.
        </Text>
      </View>

      {allDone ? (
        <EmptyState
          icon={<PartyPopper color={colors.yellow} size={26} />}
          title="Daily launch complete"
          description="You banked today&apos;s XP. Keep the streak alive tomorrow or jump into a quiz for bonus practice."
        />
      ) : null}

      <View style={styles.questList}>
        {dailyQuests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            completed={completedQuests.includes(quest.id)}
            onComplete={() => completeQuest(quest)}
          />
        ))}
      </View>

      {dailyQuests.length === 0 ? (
        <EmptyState
          icon={<BadgeCheck color={colors.green} size={26} />}
          title="Roadmap quests cleared"
          description="You have completed every roadmap task for this path. Portfolio work is the best next signal."
        />
      ) : null}

      <View style={styles.actions}>
        <GradientButton
          label="Take a quiz"
          onPress={() => router.push("/quiz")}
          icon={<Rocket color={colors.black} size={18} />}
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
    backgroundColor: "rgba(94,234,212,0.12)",
    borderWidth: 1,
    borderColor: "rgba(94,234,212,0.28)"
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
  focusCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.075)",
    padding: spacing.lg,
    marginTop: spacing.lg
  },
  focusLabel: {
    color: colors.green,
    fontSize: typography.tiny,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  focusTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900",
    marginTop: spacing.xs,
    marginBottom: spacing.md
  },
  focusCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.md
  },
  questList: {
    gap: spacing.md,
    marginTop: spacing.md
  },
  actions: {
    marginTop: spacing.lg
  }
});
