import { Tabs } from "expo-router";
import { BarChart3, CircleUserRound, ClipboardCheck, Compass, Map, Trophy } from "lucide-react-native";
import { colors, radii, spacing, typography } from "../../src/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.cyan,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          height: 72,
          paddingTop: spacing.xs,
          paddingBottom: spacing.sm,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.backgroundSoft
        },
        tabBarItemStyle: {
          borderRadius: radii.md
        },
        tabBarLabelStyle: {
          fontSize: typography.tiny,
          fontWeight: "800"
        }
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="roadmap"
        options={{
          title: "Roadmap",
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          title: "Quests",
          tabBarIcon: ({ color, size }) => <ClipboardCheck color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <CircleUserRound color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
