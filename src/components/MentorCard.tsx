import { Bot, Sparkles } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors, gradients, radii, spacing, typography } from "../constants/theme";
import { AppCard } from "./AppCard";

type MentorCardProps = {
  advice: string;
};

export function MentorCard({ advice }: MentorCardProps) {
  return (
    <AppCard contentStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Bot color={colors.cyan} size={20} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>Mentor signal</Text>
          <Text style={styles.title}>Orbit AI Coach</Text>
        </View>
        <Sparkles color={colors.yellow} size={18} />
      </View>
      <View style={styles.glow} />
      <Text style={styles.advice}>{advice}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "relative",
    overflow: "hidden",
    padding: spacing.lg
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderRadius: radii.pill,
    backgroundColor: "rgba(56,213,245,0.13)",
    borderWidth: 1,
    borderColor: "rgba(56,213,245,0.28)"
  },
  titleBlock: {
    flex: 1
  },
  eyebrow: {
    color: colors.textDim,
    fontSize: typography.tiny,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "900"
  },
  advice: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 23
  },
  glow: {
    position: "absolute",
    top: -70,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: gradients.mentor[0]
  }
});
