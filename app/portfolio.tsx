import { router } from "expo-router";
import { ArrowLeft, CheckCircle2, GitBranch, Lightbulb } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppCard } from "../src/components/AppCard";
import { GradientButton } from "../src/components/GradientButton";
import { Screen } from "../src/components/Screen";
import { colors, radii, spacing, typography } from "../src/constants/theme";
import { getGoal } from "../src/data/goals";
import { portfolioIdeas } from "../src/data/portfolioIdeas";
import { useAppStore } from "../src/store/useAppStore";

export default function PortfolioScreen() {
  const profile = useAppStore((state) => state.profile);
  const explored = useAppStore((state) => state.exploredPortfolioIdeas);
  const markPortfolioExplored = useAppStore((state) => state.markPortfolioExplored);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!profile) {
    router.replace("/onboarding");
    return null;
  }

  const goal = getGoal(profile.goalId);
  const ideas = portfolioIdeas[profile.goalId];

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={22} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>{goal.shortTitle} portfolio lab</Text>
          <Text style={styles.title}>Project ideas</Text>
        </View>
      </View>

      <AppCard contentStyle={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Lightbulb color={colors.black} size={24} />
        </View>
        <Text style={styles.heroTitle}>Build proof, not just progress.</Text>
        <Text style={styles.heroCopy}>
          Pick one idea, keep the scope sharp, and write the README as if a hiring manager has 90 seconds.
        </Text>
      </AppCard>

      <View style={styles.list}>
        {ideas.map((idea) => {
          const expanded = expandedId === idea.id;
          const isExplored = explored.includes(idea.id);

          return (
            <AppCard key={idea.id} contentStyle={styles.ideaCard}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                onPress={() => setExpandedId((current) => (current === idea.id ? null : idea.id))}
              >
                <View style={styles.ideaHeader}>
                  <View style={styles.ideaIcon}>
                    {isExplored ? (
                      <CheckCircle2 color={colors.green} size={20} />
                    ) : (
                      <GitBranch color={colors.cyan} size={20} />
                    )}
                  </View>
                  <View style={styles.ideaTitleBlock}>
                    <Text style={styles.ideaDifficulty}>{idea.difficulty}</Text>
                    <Text style={styles.ideaTitle}>{idea.title}</Text>
                  </View>
                </View>
                <Text style={styles.ideaDescription}>{idea.description}</Text>
              </Pressable>

              <View style={styles.skills}>
                {idea.skills.map((skill) => (
                  <View key={skill} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>

              {expanded ? (
                <View style={styles.expanded}>
                  <Text style={styles.readmeLabel}>README summary</Text>
                  <View style={styles.readmeBox}>
                    <Text style={styles.readmeTitle}># {idea.title}</Text>
                    <Text style={styles.readmeText}>{idea.readmeSummary}</Text>
                    <Text style={styles.readmeText}>
                      Key proof: problem framing, architecture notes, screenshots, setup instructions, and tradeoffs.
                    </Text>
                  </View>
                  <GradientButton
                    label={isExplored ? "Marked explored" : "Mark explored"}
                    onPress={() => markPortfolioExplored(idea.id)}
                    disabled={isExplored}
                    variant="success"
                  />
                </View>
              ) : null}
            </AppCard>
          );
        })}
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
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceGlass,
    borderWidth: 1,
    borderColor: colors.border
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
  heroCard: {
    alignItems: "flex-start",
    marginTop: spacing.lg
  },
  heroIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderRadius: radii.lg,
    backgroundColor: colors.yellow,
    marginBottom: spacing.md
  },
  heroTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  heroCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.sm
  },
  list: {
    gap: spacing.md,
    marginTop: spacing.md
  },
  ideaCard: {
    gap: spacing.md
  },
  ideaHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md
  },
  ideaIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceGlass
  },
  ideaTitleBlock: {
    flex: 1
  },
  ideaDifficulty: {
    color: colors.cyan,
    fontSize: typography.tiny,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  ideaTitle: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "900",
    marginTop: 2
  },
  ideaDescription: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.md
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  skillChip: {
    borderRadius: radii.pill,
    backgroundColor: "rgba(56,213,245,0.11)",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  skillText: {
    color: colors.cyan,
    fontSize: typography.tiny,
    fontWeight: "900"
  },
  expanded: {
    gap: spacing.md
  },
  readmeLabel: {
    color: colors.textDim,
    fontSize: typography.tiny,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  readmeBox: {
    borderRadius: radii.md,
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm
  },
  readmeTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
    fontFamily: "monospace"
  },
  readmeText: {
    color: colors.textMuted,
    fontSize: typography.small,
    lineHeight: 20,
    fontFamily: "monospace"
  }
});
