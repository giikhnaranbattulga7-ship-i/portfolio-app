import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { tapHaptic } from "@/lib/haptics";
import { radius } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";

type IconName = "mail-outline" | "logo-github" | "link-outline" | "open-outline";

type Props = {
  label: string;
  detail?: string;
  icon?: IconName;
  testID?: string;
  onPress: () => void;
};

export function ActionButton({ label, detail, icon = "open-outline", testID, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      testID={testID}
      onPress={() => {
        void tapHaptic();
        onPress();
      }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.button, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <Ionicons name={icon} size={20} color={colors.buttonText} />
      <View style={styles.text}>
        <Text style={[styles.label, { color: colors.buttonText }]}>{label}</Text>
        {detail ? (
          <Text style={[styles.detail, { color: colors.buttonText }]} numberOfLines={1}>
            {detail}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  text: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
  detail: {
    fontSize: 13,
    opacity: 0.9,
    marginTop: 2,
  },
});
