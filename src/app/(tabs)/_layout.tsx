import { Tabs } from "expo-router/js-tabs";

import { AppIcon } from "@/components/AppIcon";
import { useTheme } from "@/theme/ThemeContext";
import { useLayout } from "@/theme/useLayout";

export default function TabLayout() {
  const { colors } = useTheme();
  const { narrow } = useLayout();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: narrow ? 9 : 11,
          fontWeight: "600",
        },
        tabBarItemStyle: {
          minHeight: 48,
          paddingHorizontal: 0,
        },
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Танилцуулга",
          tabBarIcon: ({ color, size }) => (
            <AppIcon name="albums-outline" color={typeof color === "string" ? color : colors.muted} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Миний тухай",
          tabBarIcon: ({ color, size }) => (
            <AppIcon name="person-outline" color={typeof color === "string" ? color : colors.muted} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="works"
        options={{
          title: "Бүтээлүүд",
          tabBarIcon: ({ color, size }) => (
            <AppIcon name="grid-outline" color={typeof color === "string" ? color : colors.muted} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Холбоо барих",
          tabBarIcon: ({ color, size }) => (
            <AppIcon name="mail-outline" color={typeof color === "string" ? color : colors.muted} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
