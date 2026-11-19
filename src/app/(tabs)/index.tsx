import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { profile } from "@/data/profile";
import { StoryProgress } from "@/components/StoryProgress";
import { TopBar } from "@/components/TopBar";
import { tapHaptic } from "@/lib/haptics";
import { useEaster } from "@/theme/EasterContext";
import { useTheme } from "@/theme/ThemeContext";
import { useLayout } from "@/theme/useLayout";

const STORY_MS = 7000;

export default function IntroScreen() {
  const { colors } = useTheme();
  const { visible } = useEaster();
  const { titleSize, bodySize, short } = useLayout();
  const stories = profile.stories;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const elapsed = useRef(0);
  const story = stories[index];

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    elapsed.current = 0;
    setProgress(0);
  }, [index]);

  // Story автоматаар урагшилна. Удаан дарахад зогсоно.
  // ready хүртэл хүлээнэ. Ингэснээр анхны зураг сервертэй зөрнө гэж андуурахгүй.
  useEffect(() => {
    if (!ready || paused || visible) {
      return;
    }
    const started = Date.now();
    const base = elapsed.current;
    let frame = 0;
    const tick = () => {
      const next = Math.min(1, (base + Date.now() - started) / STORY_MS);
      setProgress(next);
      if (next >= 1) {
        setIndex((current) => (current + 1) % stories.length);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      elapsed.current = Math.min(STORY_MS, base + Date.now() - started);
      cancelAnimationFrame(frame);
    };
  }, [ready, index, paused, visible, stories.length]);

  const go = (direction: -1 | 1) => {
    void tapHaptic();
    setIndex((current) => (current + direction + stories.length) % stories.length);
  };

  if (!story) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={["top"]}>
      <StoryProgress count={stories.length} index={index} progress={progress} />
      <TopBar />
      <View style={styles.stage}>
        <View style={styles.copy} pointerEvents="none">
          <Text style={[styles.kicker, { color: colors.accent }]}>{story.kicker}</Text>
          <Text style={[styles.title, { color: colors.text, fontSize: titleSize }]}>{story.title}</Text>
          <Text style={[styles.body, { color: colors.muted, fontSize: bodySize }]}>{story.body}</Text>
          <View style={[styles.quote, { borderLeftColor: colors.accent }]}>
            <Text style={[styles.highlight, { color: colors.text, fontSize: short ? 18 : 20 }]}>
              {story.highlight}
            </Text>
          </View>
        </View>
        <Text pointerEvents="none" style={[styles.hint, { color: colors.muted }]}>
          Баруун тийш товшино уу. Зогсоох бол удаан дар. Нууц: лого эсвэл утсаа сэгсэр.
        </Text>
        {/* Баруун тал = дараагийн story, зүүн тал = өмнөх story */}
        <View style={styles.zones}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Өмнөх"
            testID="story-prev"
            style={styles.zone}
            onPress={() => go(-1)}
            onLongPress={() => setPaused(true)}
            onPressOut={() => setPaused(false)}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Дараах"
            testID="story-next"
            style={styles.zone}
            onPress={() => go(1)}
            onLongPress={() => setPaused(true)}
            onPressOut={() => setPaused(false)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  stage: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  copy: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  title: {
    fontWeight: "800",
  },
  body: {
    lineHeight: 26,
  },
  quote: {
    borderLeftWidth: 3,
    paddingLeft: 12,
    marginTop: 8,
  },
  highlight: {
    fontWeight: "700",
    lineHeight: 28,
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    paddingBottom: 8,
  },
  zones: {
    ...StyleSheet.absoluteFill,
    flexDirection: "row",
  },
  zone: {
    flex: 1,
  },
});
