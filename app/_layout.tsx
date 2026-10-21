import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { colors } from "../src/constants/theme";
import { useAppStore } from "../src/store/useAppStore";

export default function RootLayout() {
  const storageError = useAppStore((state) => state.storageError);
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {storageError && (
        <SafeAreaView edges={["top"]} style={{ backgroundColor: colors.surface }}>
          <Text accessibilityRole="alert" style={{ color: colors.yellow, padding: 12 }}>
            {storageError}
          </Text>
        </SafeAreaView>
      )}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background
          }
        }}
      />
    </SafeAreaProvider>
  );
}
