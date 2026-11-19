export type ThemeMode = "dark" | "light";

export type ThemeColors = {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  button: string;
  buttonText: string;
  border: string;
  track: string;
};

// Хар, цагаан, ногоон. Хоёр горимд ижил ногоон товч.
export const themes: Record<ThemeMode, ThemeColors> = {
  dark: {
    bg: "#0C0F0D",
    surface: "#161B18",
    text: "#F4F7F5",
    muted: "#B7C2BB",
    accent: "#3DDC84",
    button: "#1F9D55",
    buttonText: "#FFFFFF",
    border: "#2A3330",
    track: "#2A3330",
  },
  light: {
    bg: "#F3F6F4",
    surface: "#FFFFFF",
    text: "#121614",
    muted: "#3E4943",
    accent: "#157A42",
    button: "#157A42",
    buttonText: "#FFFFFF",
    border: "#D5E0D9",
    track: "#D5DED8",
  },
};

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  md: 14,
  lg: 20,
} as const;
