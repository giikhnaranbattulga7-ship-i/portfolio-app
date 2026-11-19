import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { profile } from "@/data/profile";
import { TopBar } from "@/components/TopBar";
import { WorkPager } from "@/components/WorkPager";
import { useTheme } from "@/theme/ThemeContext";
import { useLayout } from "@/theme/useLayout";

export default function WorksScreen() {
  const { colors } = useTheme();
  const { pad, titleSize, contentWidth } = useLayout();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={["top"]}>
      <TopBar />
      <ScrollView contentContainerStyle={{ paddingHorizontal: pad, paddingBottom: 32 }}>
        <View style={[styles.column, { maxWidth: contentWidth }]}>
          <Text style={[styles.title, { color: colors.text, fontSize: titleSize }]}>Бүтээлүүд</Text>
          <Text style={[styles.hint, { color: colors.muted }]}>
            Картыг зүүн, баруун тийш шудрана уу. Товчоор ч сольж болно.
          </Text>
          {profile.works.length === 0 ? (
            <Text style={{ color: colors.muted }}>Бүтээл оруулаагүй байна.</Text>
          ) : (
            <WorkPager width={contentWidth} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  column: {
    width: "100%",
    alignSelf: "center",
    gap: 8,
  },
  title: {
    fontWeight: "800",
  },
  hint: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
});
