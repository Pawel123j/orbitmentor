import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, gradients, radii, spacing, typography } from "../constants/theme";

type GradientButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "success" | "warm";
  icon?: ReactNode;
};

export function GradientButton({
  label,
  onPress,
  disabled = false,
  variant = "primary",
  icon
}: GradientButtonProps) {
  const gradient =
    variant === "success" ? gradients.success : variant === "warm" ? gradients.warm : gradients.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.wrapper, pressed && !disabled && styles.pressed]}
    >
      <LinearGradient
        colors={disabled ? ["#273149", "#1E263B"] : gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <View style={styles.content}>
          {icon}
          <Text style={[styles.label, disabled && styles.disabledLabel]}>{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radii.pill
  },
  button: {
    minHeight: 52,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  label: {
    color: colors.black,
    fontSize: typography.body,
    fontWeight: "800"
  },
  disabledLabel: {
    color: colors.textDim
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }]
  }
});
