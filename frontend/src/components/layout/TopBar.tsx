export default function TopBar() {
  return (
    <header className="h-14 bg-[#111827] border-b border-[#243044] flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 uppercase tracking-wider">Active Well:</span>
        <span className="text-sm font-mono text-white font-semibold">OIL-A01</span>
        <span className="text-[10px] px-2 py-0.5 bg-green-900/40 text-green-400 rounded border border-green-700">
          ● DRILLING
        </span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <span className="text-slate-400">
          Depth: <span className="font-mono text-white">2800 m</span>
        </span>
        <span className="text-slate-400">
          Formation: <span className="text-white">Barail</span>
        </span>
        <span className="px-2 py-1 bg-orange-900/40 text-orange-400 rounded text-[10px] border border-orange-800">
          SIMULATED
        </span>
      </div>
    </header>
  );
}
