import { Linking } from "react-native";

// Имэйл, https холбоосыг шууд нээнэ. Өөр схем зөвшөөрөхгүй.
export async function openLink(url: string): Promise<boolean> {
  const allowed = url.startsWith("https://") || url.startsWith("mailto:");
  if (!allowed) {
    return false;
  }

  try {
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}
