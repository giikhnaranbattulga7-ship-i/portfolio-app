import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

// Вэб дээр чичиргээ байхгүй тул дуудлагыг алгасна.
async function buzz(run: () => Promise<void>) {
  if (Platform.OS === "web") {
    return;
  }
  try {
    await run();
  } catch {
    // Эмулятор дээр чичиргээний мотор байхгүй байж болно.
  }
}

export function tapHaptic() {
  return buzz(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
}

export function successHaptic() {
  return buzz(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
}
