import { Redirect } from "expo-router";
import { RotateCcw, Sparkles, Trophy } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppCard } from "../../src/components/AppCard";
import { GradientButton } from "../../src/components/GradientButton";
import { ProgressBar } from "../../src/components/ProgressBar";
import { Screen } from "../../src/components/Screen";
import { colors, radii, spacing, typography } from "../../src/constants/theme";
import { getGoal } from "../../src/data/goals";
import { quizzes } from "../../src/data/quizzes";
import { useAppStore } from "../../src/store/useAppStore";

export default function QuizScreen() {
  const profile = useAppStore((state) => state.profile);
  const recordQuizResult = useAppStore((state) => state.recordQuizResult);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  if (!profile) {
    return <Redirect href="/onboarding" />;
  }

  const goal = getGoal(profile.goalId);
  const questions = quizzes[profile.goalId];
  const currentQuestion = questions[currentIndex];
  const progress = Math.round(((currentIndex + (finished ? 1 : 0)) / questions.length) * 100);
  const score = answers.filter((answer, index) => answer === questions[index]?.correctIndex).length;

  const submitAnswer = () => {
    if (selectedOption === null) {
      return;
    }

    const nextAnswers = [...answers, selectedOption];
    const isLast = currentIndex === questions.length - 1;

    if (!isLast) {
      setAnswers(nextAnswers);
      setCurrentIndex((index) => index + 1);
      setSelectedOption(null);
      return;
    }

    const finalScore = nextAnswers.filter((answer, index) => answer === questions[index]?.correctIndex).length;
    const earned = finalScore >= 4 ? 120 : finalScore >= 3 ? 70 : 20;

    setAnswers(nextAnswers);
    setXpEarned(earned);
    setFinished(true);
    recordQuizResult({
      goalId: profile.goalId,
      score: finalScore,
      total: questions.length,
      xpEarned: earned
    });
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setFinished(false);
    setXpEarned(0);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Trophy color={colors.yellow} size={23} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>{goal.shortTitle} knowledge check</Text>
          <Text style={styles.title}>Mini quiz</Text>
        </View>
      </View>

      <AppCard contentStyle={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            {finished ? "Score ready" : `Question ${currentIndex + 1}/${questions.length}`}
          </Text>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
        <ProgressBar value={progress} />
      </AppCard>

      {finished ? (
        <AppCard contentStyle={styles.resultCard}>
          <View style={styles.resultIcon}>
            <Sparkles color={colors.black} size={24} />
          </View>
          <Text style={styles.resultTitle}>{score}/{questions.length} correct</Text>
          <Text style={styles.resultCopy}>
            {score >= 4
              ? "Strong signal. You understand the important patterns well enough to keep building."
              : score >= 3
                ? "Solid pass. Review the missed explanations, then turn the concept into a small build."
                : "Good diagnostic. Treat this as a map of what to revisit before the next quest."}
          </Text>
          <Text style={styles.xpEarned}>+{xpEarned} XP</Text>

          <View style={styles.explanations}>
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const correct = userAnswer === question.correctIndex;

              return (
                <View key={question.id} style={styles.explanationRow}>
                  <Text style={[styles.explanationStatus, correct ? styles.correct : styles.incorrect]}>
                    {correct ? "Correct" : "Review"}
                  </Text>
                  <Text style={styles.explanationQuestion}>{question.question}</Text>
                  <Text style={styles.explanationText}>{question.explanation}</Text>
                </View>
              );
            })}
          </View>

          <GradientButton
            label="Retake quiz"
            onPress={restart}
            variant="warm"
            icon={<RotateCcw color={colors.black} size={18} />}
          />
        </AppCard>
      ) : currentQuestion ? (
        <AppCard contentStyle={styles.questionCard}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          <View style={styles.options}>
            {currentQuestion.options.map((option, index) => {
              const selected = selectedOption === index;

              return (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setSelectedOption(index)}
                  style={[styles.option, selected && styles.optionSelected]}
                >
                  <View style={[styles.optionIndex, selected && styles.optionIndexSelected]}>
                    <Text style={[styles.optionIndexText, selected && styles.optionIndexTextSelected]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
          <GradientButton
            label={currentIndex === questions.length - 1 ? "Finish quiz" : "Next question"}
            onPress={submitAnswer}
            disabled={selectedOption === null}
          />
        </AppCard>
      ) : null}
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
    backgroundColor: "rgba(250,204,21,0.12)",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.28)"
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
  progressCard: {
    marginTop: spacing.lg
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm
  },
  progressText: {
    color: colors.textMuted,
    fontSize: typography.small,
    fontWeight: "900"
  },
  questionCard: {
    gap: spacing.lg,
    marginTop: spacing.md
  },
  question: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900",
    lineHeight: 29
  },
  options: {
    gap: spacing.sm
  },
  option: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.055)",
    padding: spacing.md
  },
  optionSelected: {
    borderColor: colors.cyan,
    backgroundColor: "rgba(56,213,245,0.1)"
  },
  optionIndex: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceGlass
  },
  optionIndexSelected: {
    backgroundColor: colors.cyan
  },
  optionIndexText: {
    color: colors.textMuted,
    fontSize: typography.small,
    fontWeight: "900"
  },
  optionIndexTextSelected: {
    color: colors.black
  },
  optionText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "800",
    lineHeight: 21
  },
  resultCard: {
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.md
  },
  resultIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: radii.pill,
    backgroundColor: colors.yellow
  },
  resultTitle: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: "900",
    textAlign: "center"
  },
  resultCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    textAlign: "center"
  },
  xpEarned: {
    color: colors.yellow,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  explanations: {
    alignSelf: "stretch",
    gap: spacing.sm
  },
  explanationRow: {
    borderRadius: radii.md,
    backgroundColor: "rgba(255,255,255,0.055)",
    padding: spacing.md
  },
  explanationStatus: {
    fontSize: typography.tiny,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  correct: {
    color: colors.green
  },
  incorrect: {
    color: colors.orange
  },
  explanationQuestion: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  explanationText: {
    color: colors.textMuted,
    fontSize: typography.small,
    lineHeight: 19,
    marginTop: spacing.xs
  }
});
