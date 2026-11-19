import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { EasterEggModal } from "@/components/EasterEggModal";
import { useShake } from "@/hooks/useShake";
import { EasterProvider, useEaster } from "@/theme/EasterContext";
import { ThemeProvider, useTheme } from "@/theme/ThemeContext";

function Shell() {
  const { colors, mode } = useTheme();
  const { open } = useEaster();
  useShake(open);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
      <EasterEggModal />
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <EasterProvider>
          <Shell />
        </EasterProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
