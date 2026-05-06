import { Redirect } from "expo-router";
import { Map, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "../../src/components/AppCard";
import { RoadmapModuleCard } from "../../src/components/RoadmapModuleCard";
import { Screen } from "../../src/components/Screen";
import { colors, radii, spacing, typography } from "../../src/constants/theme";
import { getGoal } from "../../src/data/goals";
import { getRoadmap } from "../../src/data/roadmaps";
import { useAppStore } from "../../src/store/useAppStore";
import { getCompletedTaskCount, getRoadmapProgress, getTaskCount } from "../../src/utils/progress";

export default function RoadmapScreen() {
  const profile = useAppStore((state) => state.profile);
  const completedTasks = useAppStore((state) => state.completedTasks);
  const toggleTaskCompletion = useAppStore((state) => state.toggleTaskCompletion);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  if (!profile) {
    return <Redirect href="/onboarding" />;
  }

  const goal = getGoal(profile.goalId);
  const modules = getRoadmap(profile.goalId);
  const progress = getRoadmapProgress(profile.goalId, completedTasks);
  const completedCount = getCompletedTaskCount(profile.goalId, completedTasks);
  const taskCount = getTaskCount(profile.goalId);
  const nextModule = modules.find((module) =>
    module.tasks.some((task) => !completedTasks.includes(task.id))
  );
  const defaultExpandedId = nextModule?.id ?? modules[0]?.id ?? null;
  const activeExpandedId = expandedModuleId ?? defaultExpandedId;

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Map color={colors.cyan} size={22} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>{goal.title}</Text>
          <Text style={styles.title}>Roadmap</Text>
        </View>
      </View>

      <AppCard contentStyle={styles.summaryCard}>
        <View style={styles.summaryTop}>
          <View>
            <Text style={styles.summaryLabel}>Mission progress</Text>
            <Text style={styles.summaryValue}>{progress}% complete</Text>
          </View>
          <View style={styles.summaryBadge}>
            <Sparkles color={colors.yellow} size={14} />
            <Text style={styles.summaryBadgeText}>{completedCount}/{taskCount}</Text>
          </View>
        </View>
        <Text style={styles.summaryCopy}>
          Tap tasks as you finish them. Quest completions also update this roadmap automatically.
        </Text>
      </AppCard>

      <View style={styles.modules}>
        {modules.map((module) => (
          <RoadmapModuleCard
            key={module.id}
            module={module}
            completedTasks={completedTasks}
            expanded={module.id === activeExpandedId}
            onToggleExpanded={() =>
              setExpandedModuleId((current) => (current === module.id ? "" : module.id))
            }
            onToggleTask={(taskId) => toggleTaskCompletion(taskId)}
          />
        ))}
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
  summaryCard: {
    marginTop: spacing.lg
  },
  summaryTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  summaryLabel: {
    color: colors.textDim,
    fontSize: typography.tiny,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  summaryValue: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  summaryBadge: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: "rgba(250,204,21,0.12)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  summaryBadgeText: {
    color: colors.yellow,
    fontSize: typography.small,
    fontWeight: "900"
  },
  summaryCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.md
  },
  modules: {
    gap: spacing.md,
    marginTop: spacing.md
  }
});
