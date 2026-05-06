import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, type DimensionValue } from "react-native";
import { colors, gradients, radii } from "../constants/theme";

type ProgressBarProps = {
  value: number;
  height?: number;
};

export function ProgressBar({ value, height = 9 }: ProgressBarProps) {
  const width = `${Math.max(0, Math.min(100, value))}%` as DimensionValue;

  return (
    <View style={[styles.track, { height }]}>
      <LinearGradient colors={gradients.primary} style={[styles.fill, { width }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
    borderRadius: radii.pill,
    backgroundColor: "rgba(255,255,255,0.09)"
  },
  fill: {
    height: "100%",
    borderRadius: radii.pill,
    borderRightWidth: 1,
    borderRightColor: colors.white
  }
});
