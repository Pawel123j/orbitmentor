import { CheckCircle2, ChevronDown, ChevronRight, Circle, Clock3, Trophy } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "../constants/theme";
import type { RoadmapModule } from "../types";
import { getModuleProgress } from "../utils/progress";
import { AppCard } from "./AppCard";
import { ProgressBar } from "./ProgressBar";

type RoadmapModuleCardProps = {
  module: RoadmapModule;
  completedTasks: string[];
  expanded: boolean;
  onToggleExpanded: () => void;
  onToggleTask: (taskId: string) => void;
};

export function RoadmapModuleCard({
  module,
  completedTasks,
  expanded,
  onToggleExpanded,
  onToggleTask
}: RoadmapModuleCardProps) {
  const progress = getModuleProgress(module, completedTasks);
  const completedCount = module.tasks.filter((task) => completedTasks.includes(task.id)).length;

  return (
    <AppCard contentStyle={styles.content}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${expanded ? "Collapse" : "Expand"} ${module.title}`}
        onPress={onToggleExpanded}
        style={styles.header}
      >
        <View style={[styles.iconWrap, { backgroundColor: `${module.accent}22` }]}>
          <Trophy color={module.accent} size={18} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{module.title}</Text>
          <Text style={styles.description}>{module.description}</Text>
        </View>
        {expanded ? (
          <ChevronDown color={colors.textMuted} size={20} />
        ) : (
          <ChevronRight color={colors.textMuted} size={20} />
        )}
      </Pressable>

      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{completedCount}/{module.tasks.length} tasks</Text>
        <Text style={styles.progressValue}>{progress}%</Text>
      </View>
      <ProgressBar value={progress} />

      <View style={styles.milestone}>
        <Text style={styles.milestoneLabel}>Milestone</Text>
        <Text style={styles.milestoneText}>{module.milestone}</Text>
      </View>

      {expanded ? (
        <View style={styles.tasks}>
          {module.tasks.map((task) => {
            const isCompleted = completedTasks.includes(task.id);

            return (
              <Pressable
                key={task.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isCompleted }}
                onPress={() => onToggleTask(task.id)}
                style={[styles.taskRow, isCompleted && styles.taskRowDone]}
              >
                {isCompleted ? (
                  <CheckCircle2 color={colors.green} size={21} />
                ) : (
                  <Circle color={colors.textDim} size={21} />
                )}
                <View style={styles.taskTextBlock}>
                  <Text style={[styles.taskTitle, isCompleted && styles.taskTitleDone]}>
                    {task.title}
                  </Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                  <View style={styles.taskMeta}>
                    <Clock3 color={colors.textDim} size={13} />
                    <Text style={styles.taskMetaText}>{task.estimatedMinutes} min</Text>
                    <Text style={styles.taskMetaText}>{task.xp} XP</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderRadius: radii.md
  },
  titleBlock: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "900"
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.small,
    lineHeight: 19,
    marginTop: 2
  },
  progressHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    marginBottom: spacing.xs
  },
  progressLabel: {
    color: colors.textDim,
    fontSize: typography.small,
    fontWeight: "800"
  },
  progressValue: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "900"
  },
  milestone: {
    borderRadius: radii.md,
    backgroundColor: colors.surfaceGlass,
    padding: spacing.md,
    marginTop: spacing.md
  },
  milestoneLabel: {
    color: colors.textDim,
    fontSize: typography.tiny,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  milestoneText: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  tasks: {
    gap: spacing.sm,
    marginTop: spacing.md
  },
  taskRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(2,6,23,0.28)",
    padding: spacing.md
  },
  taskRowDone: {
    borderColor: "rgba(94,234,212,0.35)",
    backgroundColor: "rgba(94,234,212,0.08)"
  },
  taskTextBlock: {
    flex: 1
  },
  taskTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "800"
  },
  taskTitleDone: {
    color: colors.green
  },
  taskDescription: {
    color: colors.textMuted,
    fontSize: typography.small,
    lineHeight: 19,
    marginTop: spacing.xs
  },
  taskMeta: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.sm
  },
  taskMetaText: {
    color: colors.textDim,
    fontSize: typography.tiny,
    fontWeight: "800"
  }
});
