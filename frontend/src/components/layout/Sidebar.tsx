import { NavLink } from "react-router-dom";

const NAV = [
  { path: "/", label: "Command Center", icon: "🎯" },
  { path: "/nearby", label: "Nearby Wells", icon: "🗺️" },
  { path: "/live", label: "Live Drilling", icon: "📈" },
  { path: "/corridor", label: "Risk Corridor", icon: "⚠️" },
  { path: "/wells", label: "Well Explorer", icon: "🛢️" },
  { path: "/similarity", label: "Similarity", icon: "🔗" },
  { path: "/compare", label: "Compare Wells", icon: "📊" },
  { path: "/memory", label: "Historical Memory", icon: "🧠" },
  { path: "/documents", label: "Documents", icon: "📄" },
  { path: "/risk", label: "Risk Intelligence", icon: "🎲" },
  { path: "/alerts", label: "Alerts", icon: "🔔" },
  { path: "/evidence", label: "Evidence Center", icon: "🔍" },
  { path: "/copilot", label: "AI Copilot", icon: "🤖" },
  { path: "/whatif", label: "What-If", icon: "🔀" },
  { path: "/backtest", label: "Backtest", icon: "⏪" },
  { path: "/analytics", label: "Analytics", icon: "📉" },
];

export default function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <aside className="w-64 h-screen bg-[#14102a] border-r border-[#2d2450] flex flex-col shrink-0">
      <div className="p-4 border-b border-[#2d2450] flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Logo Icon Badge */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%)",
              boxShadow: "0 4px 16px rgba(124, 58, 237, 0.35)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Water droplet + pulse waves */}
              <path d="M12 2.5C12 2.5 5 10 5 15.5a7 7 0 0 0 14 0c0-2-1-4-2.5-6" />
              <path d="M9 15.5c0-1.5 1.5-3.5 3-5" opacity="0.6" />
              <circle cx="12" cy="15" r="1.5" fill="white" stroke="none" />
            </svg>
          </div>

          {/* Logo Text */}
          <div className="leading-tight">
            <h1
              className="text-2xl font-extrabold tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.04em",
              }}
            >
              NWIS
            </h1>
            <p
              className="text-[10px] uppercase tracking-[0.15em] font-semibold mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              Well Intelligence
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="lg:hidden p-1 transition"
          style={{ color: "var(--text-muted)" }}
          aria-label="Close sidebar"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Demo badge */}
      <div className="px-4 pt-3 pb-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider"
          style={{ background: "rgba(251, 146, 60, 0.15)", color: "#fb923c", border: "1px solid rgba(251, 146, 60, 0.3)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
          SYNTHETIC DEMO
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 mt-1">
        {NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md mb-0.5 transition-colors ${
                isActive ? "" : "hover:bg-[#1a2332]"
              }`
            }
            style={({ isActive }) => ({
              fontSize: "15px",
              fontWeight: isActive ? 600 : 500,
              backgroundColor: isActive ? "#7c3aed" : undefined,
              color: isActive ? "#ffffff" : "var(--text-secondary)",
            })}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div
        className="p-3 border-t border-[#2d2450] text-[11px]"
        style={{ color: "var(--text-muted)" }}
      >
        eRTMAC Companion • Not Operational
      </div>
    </aside>
  );
}
