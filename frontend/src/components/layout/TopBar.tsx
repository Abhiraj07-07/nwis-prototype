import { useEffect, useState } from "react";

export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("nwis-theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nwis-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <header className="h-14 bg-[#14102a] border-b border-[#2d2450] flex items-center justify-between px-3 lg:px-6 shrink-0">
      <div className="flex items-center gap-3 lg:gap-4 min-w-0">
        {/* Hamburger — always visible */}
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-md transition shrink-0 hover:bg-[#2d2450]"
          style={{ color: "var(--text-secondary)" }}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <span className="hidden sm:inline text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Well:</span>
        <span className="text-sm font-mono font-semibold truncate" style={{ color: "var(--text-primary)" }}>OIL-A01</span>
        <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full border font-semibold tracking-wider"
          style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e", borderColor: "rgba(34, 197, 94, 0.3)" }}
        >
          ● DRILLING
        </span>
      </div>

      <div className="flex items-center gap-3 lg:gap-5 text-xs shrink-0">
        <button
          onClick={toggleTheme}
          className="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 shrink-0"
          style={{ background: theme === "dark" ? "#0ea5e9" : "#94a3b8" }}
          aria-label="Toggle theme"
        >
          <span
            className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
            style={{ transform: theme === "dark" ? "translateX(22px)" : "translateX(2px)" }}
          >
            {theme === "dark" ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f1115" strokeWidth="2.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            )}
          </span>
        </button>

        <span className="hidden md:inline" style={{ color: "var(--text-muted)" }}>
          Depth: <span className="font-mono" style={{ color: "var(--text-primary)" }}>2800 m</span>
        </span>
        <span className="hidden lg:inline" style={{ color: "var(--text-muted)" }}>
          Formation: <span style={{ color: "var(--text-primary)" }}>Barail</span>
        </span>
        <span className="px-2 py-1 rounded text-[10px] border whitespace-nowrap"
          style={{ background: "rgba(251, 146, 60, 0.15)", color: "#fb923c", borderColor: "rgba(251, 146, 60, 0.3)" }}
        >
          SIMULATED
        </span>
      </div>
    </header>
  );
}
