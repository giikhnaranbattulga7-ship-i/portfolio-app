import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import { successHaptic } from "@/lib/haptics";

type EasterValue = {
  visible: boolean;
  open: () => void;
  close: () => void;
};

const EasterContext = createContext<EasterValue | null>(null);

export function EasterProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  const open = useCallback(() => {
    if (visibleRef.current) {
      return;
    }
    visibleRef.current = true;
    setVisible(true);
    void successHaptic();
  }, []);

  const close = useCallback(() => {
    visibleRef.current = false;
    setVisible(false);
  }, []);

  const value = useMemo(() => ({ visible, open, close }), [visible, open, close]);

  return <EasterContext.Provider value={value}>{children}</EasterContext.Provider>;
}

export function useEaster(): EasterValue {
  const value = useContext(EasterContext);
  if (!value) {
    throw new Error("useEaster зөвхөн EasterProvider дотор дуудна.");
  }
  return value;
}
