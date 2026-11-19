import { Pressable, StyleSheet, Text, View } from "react-native";

import { profile } from "@/data/profile";
import { tapHaptic } from "@/lib/haptics";
import { radius } from "@/theme/colors";
import { useEaster } from "@/theme/EasterContext";
import { useTheme } from "@/theme/ThemeContext";

export function EasterEggModal() {
  const { visible, close } = useEaster();
  const { colors } = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.backdrop} testID="easter-egg">
      <Pressable style={styles.scrim} onPress={close} accessibilityLabel="Хаах" />
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.kicker, { color: colors.accent }]}>{profile.monogram}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{profile.easterEgg.title}</Text>
        <Text style={[styles.body, { color: colors.muted }]}>{profile.easterEgg.body}</Text>
        <Pressable
          accessibilityRole="button"
          testID="easter-close"
          onPress={() => {
            void tapHaptic();
            close();
          }}
          style={[styles.close, { backgroundColor: colors.button }]}
        >
          <Text style={[styles.closeLabel, { color: colors.buttonText }]}>Хаах</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 24,
  },
  kicker: {
    fontSize: 28,
    fontWeight: "800",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 8,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  close: {
    minHeight: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  closeLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
});
