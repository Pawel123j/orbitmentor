import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { colors } from "../src/constants/theme";
import { useAppStore } from "../src/store/useAppStore";

export default function RootLayout() {
  const storageError = useAppStore((state) => state.storageError);
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const isRestoring = useAppStore((state) => state.isRestoring);
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
      <Modal visible={!hasHydrated || isRestoring} transparent onRequestClose={() => {}}>
        <View accessibilityViewIsModal style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.85)", padding: 24 }}>
          <ActivityIndicator size="large" color={colors.text} />
          <Text accessibilityRole="alert" style={{ color: colors.text, padding: 16, textAlign: "center" }}>
            {isRestoring ? "Restoring progress. Please wait before continuing." : "Loading saved progress…"}
          </Text>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
}
