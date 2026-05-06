import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Check, Rocket, Sparkles } from "lucide-react-native";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { AppCard } from "../src/components/AppCard";
import { GradientButton } from "../src/components/GradientButton";
import { Screen } from "../src/components/Screen";
import { colors, gradients, radii, spacing, typography } from "../src/constants/theme";
import { dailyTimes, getGoal, goals, levels } from "../src/data/goals";
import { useAppStore } from "../src/store/useAppStore";
import type { DailyTime, GoalId, Level } from "../src/types";

const goalIds = goals.map((goal) => goal.id);

const onboardingSchema = z.object({
  goalId: z.custom<GoalId>((value) => goalIds.includes(value as GoalId), {
    message: "Choose a learning goal."
  }),
  level: z.enum(["beginner", "intermediate"]),
  dailyTime: z.union([z.literal(15), z.literal(30), z.literal(60)])
});

type OnboardingForm = z.infer<typeof onboardingSchema>;

export default function OnboardingScreen() {
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      goalId: "frontend",
      level: "beginner",
      dailyTime: 30
    }
  });

  const selectedGoalId = watch("goalId");
  const selectedLevel = watch("level");
  const selectedDailyTime = watch("dailyTime");
  const selectedGoal = useMemo(() => getGoal(selectedGoalId), [selectedGoalId]);

  const onSubmit = (values: OnboardingForm) => {
    completeOnboarding(values);
    router.replace("/dashboard");
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.logoRow}>
          <LinearGradient colors={gradients.primary} style={styles.logo}>
            <Rocket color={colors.black} size={24} />
          </LinearGradient>
          <Text style={styles.brand}>OrbitMentor</Text>
        </View>
        <Text style={styles.heroTitle}>Build your developer career one focused mission at a time.</Text>
        <Text style={styles.heroCopy}>
          Choose a path, commit to a daily cadence, and let OrbitMentor turn the next step into XP,
          streaks, quizzes, and portfolio proof.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Career goal</Text>
        <View style={styles.grid}>
          {goals.map((goal) => {
            const selected = goal.id === selectedGoalId;

            return (
              <Pressable
                key={goal.id}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setValue("goalId", goal.id, { shouldValidate: true })}
                style={[styles.goalOption, selected && styles.goalOptionSelected]}
              >
                <LinearGradient colors={goal.gradient} style={styles.goalIcon}>
                  {selected ? <Check color={colors.black} size={18} /> : <Sparkles color={colors.black} size={17} />}
                </LinearGradient>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalDescription}>{goal.signal}</Text>
              </Pressable>
            );
          })}
        </View>
        {errors.goalId ? <Text style={styles.errorText}>{errors.goalId.message}</Text> : null}
      </View>

      <AppCard contentStyle={styles.previewCard}>
        <Text style={styles.previewEyebrow}>Selected path</Text>
        <Text style={styles.previewTitle}>{selectedGoal.title}</Text>
        <Text style={styles.previewCopy}>{selectedGoal.description}</Text>
      </AppCard>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Current level</Text>
        <View style={styles.optionStack}>
          {levels.map((level) => (
            <ChoiceRow
              key={level.id}
              title={level.title}
              description={level.description}
              selected={selectedLevel === level.id}
              onPress={() => setValue("level", level.id as Level, { shouldValidate: true })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Daily focus time</Text>
        <View style={styles.timeRow}>
          {dailyTimes.map((time) => (
            <Pressable
              key={time.value}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedDailyTime === time.value }}
              onPress={() => setValue("dailyTime", time.value as DailyTime, { shouldValidate: true })}
              style={[styles.timeOption, selectedDailyTime === time.value && styles.timeOptionSelected]}
            >
              <Text style={styles.timeTitle}>{time.title}</Text>
              <Text style={styles.timeDescription}>{time.description}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <GradientButton
        label="Start my roadmap"
        onPress={handleSubmit(onSubmit)}
        icon={<Rocket color={colors.black} size={18} />}
      />
    </Screen>
  );
}

function ChoiceRow({
  title,
  description,
  selected,
  onPress
}: {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.choiceRow, selected && styles.choiceRowSelected]}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <Check color={colors.black} size={14} /> : null}
      </View>
      <View style={styles.choiceText}>
        <Text style={styles.choiceTitle}>{title}</Text>
        <Text style={styles.choiceDescription}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.md,
    paddingBottom: spacing.md
  },
  logoRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    height: 46,
    borderRadius: radii.md
  },
  brand: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  heroTitle: {
    color: colors.text,
    fontSize: typography.hero,
    fontWeight: "900",
    lineHeight: 40
  },
  heroCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 23
  },
  section: {
    gap: spacing.md,
    marginTop: spacing.lg
  },
  sectionLabel: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "900"
  },
  grid: {
    gap: spacing.sm
  },
  goalOption: {
    alignSelf: "stretch",
    minHeight: 144,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.055)",
    padding: spacing.md
  },
  goalOptionSelected: {
    borderColor: colors.cyan,
    backgroundColor: "rgba(56,213,245,0.1)"
  },
  goalIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: radii.md,
    marginBottom: spacing.md
  },
  goalTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900"
  },
  goalDescription: {
    color: colors.textMuted,
    fontSize: typography.tiny,
    lineHeight: 16,
    marginTop: spacing.xs
  },
  errorText: {
    color: colors.red,
    fontSize: typography.small,
    fontWeight: "700"
  },
  previewCard: {
    marginTop: spacing.lg
  },
  previewEyebrow: {
    color: colors.cyan,
    fontSize: typography.tiny,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  previewTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  previewCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.sm
  },
  optionStack: {
    gap: spacing.sm
  },
  choiceRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceGlass,
    padding: spacing.md
  },
  choiceRowSelected: {
    borderColor: colors.cyan,
    backgroundColor: "rgba(56,213,245,0.1)"
  },
  radio: {
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.borderStrong
  },
  radioSelected: {
    backgroundColor: colors.cyan,
    borderColor: colors.cyan
  },
  choiceText: {
    flex: 1
  },
  choiceTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900"
  },
  choiceDescription: {
    color: colors.textMuted,
    fontSize: typography.small,
    marginTop: 2
  },
  timeRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  timeOption: {
    flex: 1,
    minHeight: 92,
    justifyContent: "center",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceGlass,
    padding: spacing.sm
  },
  timeOptionSelected: {
    borderColor: colors.cyan,
    backgroundColor: "rgba(56,213,245,0.1)"
  },
  timeTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "900",
    textAlign: "center"
  },
  timeDescription: {
    color: colors.textMuted,
    fontSize: typography.tiny,
    lineHeight: 15,
    marginTop: spacing.xs,
    textAlign: "center"
  }
});
