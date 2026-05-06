import { CheckCircle2, Clock3, Flame, Sparkles } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "../constants/theme";
import type { DailyQuest } from "../types";
import { AppCard } from "./AppCard";

type QuestCardProps = {
  quest: DailyQuest;
  completed: boolean;
  onComplete: () => void;
};

const difficultyColor = {
  Starter: colors.green,
  Core: colors.cyan,
  Stretch: colors.orange
};

export function QuestCard({ quest, completed, onComplete }: QuestCardProps) {
  return (
    <AppCard contentStyle={styles.content}>
      <View style={styles.header}>
        <View style={[styles.badge, { borderColor: difficultyColor[quest.difficulty] }]}>
          <Sparkles color={difficultyColor[quest.difficulty]} size={13} />
          <Text style={[styles.badgeText, { color: difficultyColor[quest.difficulty] }]}>
            {quest.difficulty}
          </Text>
        </View>
        <View style={styles.xpBadge}>
          <Flame color={colors.yellow} size={13} />
          <Text style={styles.xpText}>{quest.xp} XP</Text>
        </View>
      </View>

      <Text style={styles.module}>{quest.moduleTitle}</Text>
      <Text style={styles.title}>{quest.title}</Text>
      <Text style={styles.description}>{quest.description}</Text>

      <View style={styles.footer}>
        <View style={styles.time}>
          <Clock3 color={colors.textDim} size={15} />
          <Text style={styles.timeText}>{quest.estimatedMinutes} min</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={completed ? "Quest completed" : `Complete ${quest.title}`}
          onPress={onComplete}
          disabled={completed}
          style={[styles.completeButton, completed && styles.completeButtonDone]}
        >
          <CheckCircle2 color={completed ? colors.black : colors.cyan} size={16} />
          <Text style={[styles.completeText, completed && styles.completeTextDone]}>
            {completed ? "Done" : "Complete"}
          </Text>
        </Pressable>
      </View>
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
    justifyContent: "space-between",
    marginBottom: spacing.md
  },
  badge: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: "rgba(255,255,255,0.06)"
  },
  badgeText: {
    fontSize: typography.tiny,
    fontWeight: "900"
  },
  xpBadge: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: "rgba(250,204,21,0.12)"
  },
  xpText: {
    color: colors.yellow,
    fontSize: typography.tiny,
    fontWeight: "900"
  },
  module: {
    color: colors.textDim,
    fontSize: typography.tiny,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.sm
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg
  },
  time: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs
  },
  timeText: {
    color: colors.textDim,
    fontSize: typography.small,
    fontWeight: "700"
  },
  completeButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: "rgba(56,213,245,0.45)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  completeButtonDone: {
    backgroundColor: colors.green,
    borderColor: colors.green
  },
  completeText: {
    color: colors.cyan,
    fontSize: typography.small,
    fontWeight: "900"
  },
  completeTextDone: {
    color: colors.black
  }
});
