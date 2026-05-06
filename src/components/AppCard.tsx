import { LinearGradient } from "expo-linear-gradient";
import type { PropsWithChildren } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle
} from "react-native";
import { colors, gradients, radii, spacing } from "../constants/theme";

type AppCardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}>;

export function AppCard({ children, style, contentStyle, onPress }: AppCardProps) {
  const body = (
    <LinearGradient colors={gradients.card} style={[styles.gradient, contentStyle]}>
      {children}
    </LinearGradient>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
      >
        {body}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{body}</View>;
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  gradient: {
    padding: spacing.md
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }]
  }
});
