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

export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#111827] border-r border-[#243044] h-screen flex flex-col shrink-0">
      <div className="p-4 border-b border-[#243044]">
        <h1 className="text-lg font-bold text-white tracking-wide">NWIS</h1>
        <p className="text-[11px] text-slate-400">Nearby Wells Intelligence</p>
        <p className="text-[10px] text-orange-400 mt-1">⚠ SYNTHETIC DEMO</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-[13px] mb-0.5 transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-[#1a2332]"
              }`
            }
          >
            <span className="text-sm">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-[#243044] text-[10px] text-slate-500">
        eRTMAC Companion • Not Operational
      </div>
    </aside>
  );
}
