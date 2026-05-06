import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "../constants/theme";
import { AppCard } from "./AppCard";

type EmptyStateProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <AppCard contentStyle={styles.content}>
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    paddingVertical: spacing.xl
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 58,
    height: 58,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceGlass,
    marginBottom: spacing.md
  },
  title: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "900",
    textAlign: "center"
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: "center"
  }
});
