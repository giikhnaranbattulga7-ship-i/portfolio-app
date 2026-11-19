import { StyleSheet, View } from "react-native";

import { useTheme } from "@/theme/ThemeContext";

type Props = {
  count: number;
  index: number;
  progress: number;
};

export function StoryProgress({ count, index, progress }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      {Array.from({ length: count }, (_, bar) => {
        const fill = bar < index ? 1 : bar === index ? progress : 0;
        return (
          <View key={bar} style={[styles.track, { backgroundColor: colors.track }]}>
            <View
              style={[
                styles.fill,
                { width: `${Math.max(0, Math.min(1, fill)) * 100}%`, backgroundColor: colors.accent },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  track: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
