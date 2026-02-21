import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className="btn"
      onClick={() =>
        setTheme(theme === "light" ? "dark" : "light")
      }
    >
      Toggle Theme
    </button>
  );
}
