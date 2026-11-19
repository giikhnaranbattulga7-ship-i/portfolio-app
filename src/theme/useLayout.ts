import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

// Утасны өргөнөөс зай, гарчигийн хэмжээг тохируулна.
// Эхний зургийг тогтмол 390x844-өөр гаргана. Ингэснээр вэб дээрх
// серверийн HTML болон утасны хэмжээ зөрнө гэж React андуурахгүй.
export function useLayout() {
  const dims = useWindowDimensions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const width = mounted ? dims.width : 390;
  const height = mounted ? dims.height : 844;
  const narrow = width < 360;
  const short = height < 700;
  const pad = narrow ? 16 : 24;
  const contentWidth = Math.min(width - pad * 2, 480);

  return {
    width,
    height,
    narrow,
    short,
    pad,
    contentWidth,
    titleSize: narrow || short ? 28 : 36,
    bodySize: narrow ? 16 : 18,
  };
}
