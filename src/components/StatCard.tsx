import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "../constants/theme";
import { AppCard } from "./AppCard";

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon: ReactNode;
};

export function StatCard({ label, value, helper, icon }: StatCardProps) {
  return (
    <AppCard style={styles.card} contentStyle={styles.content}>
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 145
  },
  content: {
    minHeight: 132
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceGlass,
    marginBottom: spacing.md
  },
  value: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.small,
    marginTop: spacing.xs
  },
  helper: {
    color: colors.textDim,
    fontSize: typography.tiny,
    marginTop: spacing.xs
  }
});
