import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { profile } from "@/data/profile";
import type { Work, WorkId } from "@/data/profile";
import { ActionButton } from "@/components/ActionButton";
import { tapHaptic } from "@/lib/haptics";
import { openLink } from "@/lib/openLink";
import { radius } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";

type Props = {
  width: number;
};

function artFor(id: WorkId) {
  switch (id) {
    case "z-money":
      return require("../../assets/works/z-money.png");
    case "studymate":
      return require("../../assets/works/studymate.png");
    case "shopmn":
      return require("../../assets/works/shopmn.png");
    default: {
      const neverId: never = id;
      return neverId;
    }
  }
}

export function WorkPager({ width }: Props) {
  const { colors } = useTheme();
  const works = profile.works;
  const [index, setIndex] = useState(0);
  const [linkError, setLinkError] = useState("");
  const x = useSharedValue(0);
  const dragX = useSharedValue(0);
  const indexSv = useSharedValue(0);
  const widthSv = useSharedValue(width);

  useEffect(() => {
    widthSv.value = width;
    x.value = -indexSv.value * width;
  }, [width, widthSv, x, indexSv]);

  const show = (next: number) => {
    const clamped = Math.max(0, Math.min(works.length - 1, next));
    if (clamped !== index) {
      void tapHaptic();
    }
    indexSv.value = clamped;
    x.value = withTiming(-clamped * width, { duration: 240 });
    setIndex(clamped);
    setLinkError("");
  };

  // Хуруугаараа зүүн/баруун шургуулахад карт солигдоно.
  const pan = usePanGesture({
    activeOffsetX: [-18, 18],
    failOffsetY: [-16, 16],
    onUpdate: (event) => {
      dragX.value = event.translationX;
      x.value = -indexSv.value * widthSv.value + event.translationX;
    },
    onFinalize: () => {
      const card = widthSv.value;
      const current = indexSv.value;
      const moved = dragX.value;
      dragX.value = 0;
      let next = current;
      if (moved < -card * 0.22 && current < works.length - 1) {
        next = current + 1;
      } else if (moved > card * 0.22 && current > 0) {
        next = current - 1;
      }
      indexSv.value = next;
      x.value = withTiming(-next * card, { duration: 240 });
      if (next !== current) {
        runOnJS(setIndex)(next);
        runOnJS(tapHaptic)();
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const open = async (url: string) => {
    const ok = await openLink(url);
    setLinkError(ok ? "" : "Холбоос нээгдсэнгүй. Дахин оролдоно уу.");
  };

  return (
    <View>
      <View style={styles.nav}>
        <Pressable
          accessibilityRole="button"
          testID="work-prev"
          disabled={index === 0}
          onPress={() => show(index - 1)}
          style={[styles.navButton, { borderColor: colors.border, opacity: index === 0 ? 0.4 : 1 }]}
        >
          <Text style={[styles.navLabel, { color: colors.text }]}>Өмнөх</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          testID="work-next"
          disabled={index === works.length - 1}
          onPress={() => show(index + 1)}
          style={[
            styles.navButton,
            { borderColor: colors.border, opacity: index === works.length - 1 ? 0.4 : 1 },
          ]}
        >
          <Text style={[styles.navLabel, { color: colors.text }]}>Дараах</Text>
        </Pressable>
      </View>
      <View style={styles.dots}>
        {works.map((work, dot) => (
          <View
            key={work.id}
            style={[
              styles.dot,
              { backgroundColor: dot === index ? colors.accent : colors.track },
            ]}
          />
        ))}
      </View>

      <GestureDetector gesture={pan}>
        <View style={{ width, overflow: "hidden" }}>
          <Animated.View style={[{ width: width * works.length, flexDirection: "row" }, animatedStyle]}>
            {works.map((work) => (
              <View key={work.id} style={{ width }}>
                <WorkCard
                  work={work}
                  onOpen={(url) => {
                    void open(url);
                  }}
                />
              </View>
            ))}
          </Animated.View>
        </View>
      </GestureDetector>

      {linkError ? <Text style={[styles.error, { color: colors.accent }]}>{linkError}</Text> : null}
    </View>
  );
}

function WorkCard({ work, onOpen }: { work: Work; onOpen: (url: string) => void }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Image
        source={artFor(work.id)}
        style={styles.image}
        contentFit="cover"
        contentPosition="top"
        accessibilityLabel={work.title}
      />
      <View style={styles.body}>
        <Text style={[styles.note, { color: colors.muted }]}>{work.imageNote}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{work.title}</Text>
        <Text style={[styles.subtitle, { color: colors.accent }]}>{work.subtitle}</Text>
        <Text style={[styles.description, { color: colors.muted }]}>{work.description}</Text>
        <View style={styles.tags}>
          {work.tags.map((tag) => (
            <View key={tag} style={[styles.tag, { borderColor: colors.border }]}>
              <Text style={[styles.tagText, { color: colors.text }]}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.links}>
          {work.links.map((link) => (
            <ActionButton
              key={link.url}
              label={link.label}
              detail={link.url.replace("https://", "")}
              icon={link.label === "Код" || link.label === "GitHub" ? "logo-github" : "open-outline"}
              testID={`work-link-${work.id}-${link.label}`}
              onPress={() => onOpen(link.url)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 176,
    backgroundColor: "#101412",
  },
  body: {
    padding: 16,
    gap: 8,
  },
  note: {
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minHeight: 32,
    justifyContent: "center",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  links: {
    gap: 8,
    marginTop: 8,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  error: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
  nav: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  navButton: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
});
