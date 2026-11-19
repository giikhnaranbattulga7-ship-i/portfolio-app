import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { View } from "react-native";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  name: IconName;
  color: string;
  size?: number;
};

// Ionicons сервер дээр хоосон, хөтөч дээр тэмдэгт болж зурагддаг.
// Эхний зургийг хоёуланд нь хоосон хайрцаг болговол hydration зөрөхгүй.
export function AppIcon({ name, color, size = 22 }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <View style={{ width: size, height: size }} />;
  }

  return <Ionicons name={name} size={size} color={color} />;
}
