import { Accelerometer } from "expo-sensors";
import { useEffect, useRef } from "react";

// Утсаа сэгсрэхэд onShake дуудна. Вэб дээр мэдрэгч байхгүй.
export function useShake(onShake: () => void) {
  const onShakeRef = useRef(onShake);
  onShakeRef.current = onShake;

  useEffect(() => {
    let remove: (() => void) | null = null;
    let alive = true;
    const last = { x: 0, y: 0, z: 0, at: 0, ready: false };

    Accelerometer.isAvailableAsync()
      .then((available) => {
        if (!available || !alive) {
          return;
        }
        Accelerometer.setUpdateInterval(100);
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
          // Эхний уншилт нь 0-оос таталцал руу үсэрдэг тул алгасна.
          if (!last.ready) {
            last.ready = true;
            last.x = x;
            last.y = y;
            last.z = z;
            return;
          }
          const delta = Math.hypot(x - last.x, y - last.y, z - last.z);
          last.x = x;
          last.y = y;
          last.z = z;
          const now = Date.now();
          if (delta > 1.7 && now - last.at > 2500) {
            last.at = now;
            onShakeRef.current();
          }
        });
        remove = () => subscription.remove();
      })
      .catch(() => {
        // Мэдрэгчгүй орчинд апп үргэлжлэн ажиллана.
      });

    return () => {
      alive = false;
      remove?.();
    };
  }, []);
}
