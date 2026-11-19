import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme/ThemeContext";

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Хуудас олдсонгүй</Text>
      <Link href="/" style={[styles.link, { color: colors.accent }]}>
        Танилцуулга руу буцах
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
  },
  link: {
    fontSize: 16,
    fontWeight: "700",
    minHeight: 44,
    textAlignVertical: "center",
  },
});
