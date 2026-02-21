import { useEffect } from "react";
import useStore from "./ZustandState";

export default function ThemeSync() {
  const Mode = useStore((s) => s.Mode);
  const hydrated = useStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hydrated) return; 

    document.documentElement.classList.toggle("dark", !Mode);
  }, [Mode, hydrated]);

  return null;
}