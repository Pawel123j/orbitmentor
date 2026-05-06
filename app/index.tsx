import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../src/constants/theme";
import { useAppStore } from "../src/store/useAppStore";

export default function IndexRoute() {
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);

  if (!hasHydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.cyan} size="large" />
        <Text style={styles.loadingText}>Preparing your orbit...</Text>
      </View>
    );
  }

  return <Redirect href={onboardingCompleted ? "/dashboard" : "/onboarding"} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    backgroundColor: colors.background
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: typography.body,
    fontWeight: "700"
  }
});
