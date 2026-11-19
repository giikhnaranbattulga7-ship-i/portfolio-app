import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { profile } from "@/data/profile";
import { ActionButton } from "@/components/ActionButton";
import { TopBar } from "@/components/TopBar";
import { openLink } from "@/lib/openLink";
import { useTheme } from "@/theme/ThemeContext";
import { useLayout } from "@/theme/useLayout";

export default function ContactScreen() {
  const { colors } = useTheme();
  const { pad, titleSize } = useLayout();
  const [error, setError] = useState("");

  const open = async (url: string) => {
    const ok = await openLink(url);
    setError(ok ? "" : "Холбоос нээгдсэнгүй. Дахин оролдоно уу.");
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={["top"]}>
      <TopBar />
      <ScrollView contentContainerStyle={{ paddingHorizontal: pad, paddingBottom: 32 }}>
        <View style={styles.column}>
          <Text style={[styles.title, { color: colors.text, fontSize: titleSize }]}>Холбоо барих</Text>
          <Text style={[styles.lead, { color: colors.muted }]}>
            Товч дарахад имэйл эсвэл GitHub шууд нээгдэнэ.
          </Text>
          <ActionButton
            label="Имэйл"
            detail={profile.email}
            icon="mail-outline"
            testID="contact-email"
            onPress={() => {
              void open(`mailto:${profile.email}`);
            }}
          />
          <ActionButton
            label="GitHub"
            detail={profile.githubLabel}
            icon="logo-github"
            testID="contact-github"
            onPress={() => {
              void open(profile.github);
            }}
          />
          {profile.social.url.length > 0 ? (
            <ActionButton
              label={profile.social.label || "Сошиал"}
              detail={profile.social.url.replace("https://", "")}
              icon="link-outline"
              testID="contact-social"
              onPress={() => {
                void open(profile.social.url);
              }}
            />
          ) : null}
          {error ? <Text style={[styles.error, { color: colors.accent }]}>{error}</Text> : null}
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
  title: {
    fontWeight: "800",
  },
  lead: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  error: {
    fontSize: 14,
  },
});
