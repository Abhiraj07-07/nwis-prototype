export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-14 bg-[#14102a] border-b border-[#2d2450] flex items-center justify-between px-3 lg:px-6 shrink-0">
      {/* Left: Hamburger + Active Well */}
      <div className="flex items-center gap-3 lg:gap-4 min-w-0">
        {/* Hamburger - mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-300 hover:text-white p-1 shrink-0"
          aria-label="Open sidebar"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <span className="hidden sm:inline text-xs text-slate-400 uppercase tracking-wider">Well:</span>
        <span className="text-sm font-mono text-white font-semibold truncate">OIL-A01</span>
        <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 bg-green-900/40 text-green-400 rounded border border-green-700 whitespace-nowrap">
          ● DRILLING
        </span>
      </div>

      {/* Right: Params */}
      <div className="flex items-center gap-3 lg:gap-5 text-xs shrink-0">
        <span className="hidden md:inline text-slate-400">
          Depth: <span className="font-mono text-white">2800 m</span>
        </span>
        <span className="hidden lg:inline text-slate-400">
          Formation: <span className="text-white">Barail</span>
        </span>
        <span className="px-2 py-1 bg-orange-900/40 text-orange-400 rounded text-[10px] border border-orange-800 whitespace-nowrap">
          SIMULATED
        </span>
      </div>
    </header>
  );
}
