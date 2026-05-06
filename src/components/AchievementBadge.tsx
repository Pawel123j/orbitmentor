import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "../constants/theme";

type AchievementBadgeProps = {
  title: string;
  description: string;
  earned: boolean;
  icon: ReactNode;
};

export function AchievementBadge({ title, description, earned, icon }: AchievementBadgeProps) {
  return (
    <View style={[styles.badge, earned && styles.badgeEarned]}>
      <View style={[styles.iconWrap, earned && styles.iconWrapEarned]}>{icon}</View>
      <View style={styles.textBlock}>
        <Text style={[styles.title, earned && styles.titleEarned]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.045)",
    padding: spacing.md
  },
  badgeEarned: {
    borderColor: "rgba(94,234,212,0.32)",
    backgroundColor: "rgba(94,234,212,0.08)"
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255,255,255,0.06)"
  },
  iconWrapEarned: {
    backgroundColor: "rgba(94,234,212,0.16)"
  },
  textBlock: {
    flex: 1
  },
  title: {
    color: colors.textMuted,
    fontSize: typography.body,
    fontWeight: "900"
  },
  titleEarned: {
    color: colors.text
  },
  description: {
    color: colors.textDim,
    fontSize: typography.small,
    lineHeight: 18,
    marginTop: 2
  }
});
