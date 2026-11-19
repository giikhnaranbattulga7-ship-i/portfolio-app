import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { profile } from "@/data/profile";
import { TopBar } from "@/components/TopBar";
import { radius } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { useLayout } from "@/theme/useLayout";

export default function AboutScreen() {
  const { colors } = useTheme();
  const { pad, titleSize } = useLayout();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={["top"]}>
      <TopBar />
      <ScrollView contentContainerStyle={{ paddingHorizontal: pad, paddingBottom: 32 }}>
        <View style={styles.column}>
          <Text style={[styles.kicker, { color: colors.accent }]}>{profile.course}</Text>
          <Text style={[styles.title, { color: colors.text, fontSize: titleSize }]}>Миний тухай</Text>
          <Text style={[styles.meta, { color: colors.muted }]}>
            {profile.university} · {profile.major} · {profile.year} · {profile.born}
          </Text>

          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.body, { color: colors.text }]}>{profile.bio}</Text>
          </View>

          <Text style={[styles.section, { color: colors.text }]}>Ур чадвар</Text>
          {profile.skills.length === 0 ? (
            <Text style={{ color: colors.muted }}>Ур чадвар оруулаагүй байна.</Text>
          ) : (
            profile.skills.map((skill) => (
              <View
                key={skill.name}
                style={[styles.skill, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <Text style={[styles.skillName, { color: colors.text }]}>{skill.name}</Text>
                <Text style={[styles.skillNote, { color: colors.muted }]}>{skill.note}</Text>
              </View>
            ))
          )}

          <Text style={[styles.footer, { color: colors.muted }]}>
            {profile.universityFull}
          </Text>
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
    maxWidth: 520,
    alignSelf: "center",
    gap: 12,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
  },
  title: {
    fontWeight: "800",
  },
  meta: {
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 16,
    marginTop: 4,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 8,
  },
  skill: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 44,
  },
  skillName: {
    fontSize: 16,
    fontWeight: "700",
  },
  skillNote: {
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    fontSize: 13,
    marginTop: 8,
  },
});
