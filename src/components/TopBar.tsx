import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { profile } from "@/data/profile";
import { tapHaptic } from "@/lib/haptics";
import { useEaster } from "@/theme/EasterContext";
import { useTheme } from "@/theme/ThemeContext";

// «Г» дээр удаан дарахад нууц нээгдэнэ. Вэб, эмуляторын запас арга.
export function TopBar() {
  const { colors, mode, toggle } = useTheme();
  const { open } = useEaster();

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Лого. Удаан дарвал нууц нээгдэнэ."
        testID="logo"
        delayLongPress={450}
        onLongPress={open}
        style={styles.hit}
      >
        <Text style={[styles.mark, { color: colors.accent }]}>{profile.monogram}</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={mode === "dark" ? "Цагаан горим" : "Хар горим"}
        testID="theme-toggle"
        onPress={() => {
          void tapHaptic();
          toggle();
        }}
        style={styles.hit}
      >
        <Ionicons
          name={mode === "dark" ? "sunny-outline" : "moon-outline"}
          size={22}
          color={colors.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  hit: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  mark: {
    fontSize: 28,
    fontWeight: "800",
  },
});
