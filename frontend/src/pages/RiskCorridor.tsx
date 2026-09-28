import Card from "../components/common/Card";
import SafetyLabel from "../components/common/SafetyLabel";
import { HISTORICAL_EVENTS } from "../api/mockData";

const CURRENT_DEPTH = 2800;

const ZONES = [
  { from: 2700, to: 2760, level: "SAFE", label: "Stable shale", color: "green" },
  { from: 2760, to: 2790, level: "WATCH", label: "Approaching Barail top", color: "amber" },
  { from: 2790, to: 2840, level: "RISK", label: "Historical mud loss zone (OIL-A03)", color: "orange" },
  { from: 2840, to: 2900, level: "RISK", label: "Stuck pipe history (OIL-A07)", color: "red" },
  { from: 2900, to: 2980, level: "WATCH", label: "Tipam sand transition", color: "amber" },
];

const COLOR_MAP: Record<string, string> = {
  green: "bg-green-900/40 border-green-700 text-green-400",
  amber: "bg-amber-900/40 border-amber-700 text-amber-400",
  orange: "bg-orange-900/40 border-orange-700 text-orange-400",
  red: "bg-red-900/40 border-red-700 text-red-400",
};

export default function RiskCorridor() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Risk Corridor</h1>
          <p className="text-sm text-slate-400 mt-1">Look-ahead depth/formation risk — historically sensitive zones.</p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Depth Corridor — Current: 2800 m" className="lg:col-span-2">
          <div className="space-y-2">
            {ZONES.map((z, i) => {
              const active = CURRENT_DEPTH >= z.from && CURRENT_DEPTH < z.to;
              return (
                <div key={i} className={`flex items-center justify-between p-4 rounded border ${COLOR_MAP[z.color]} ${active ? "ring-2 ring-blue-500" : ""}`}>
                  <div className="flex items-center gap-3">
                    {active && <span className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded">YOU ARE HERE</span>}
                    <div>
                      <p className="text-xs font-bold tracking-wider">{z.level}</p>
                      <p className="text-[11px] opacity-80 mt-0.5">{z.label}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs">{z.from}-{z.to} m</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Historical Events at Corridor Depths">
          <div className="space-y-2">
            {HISTORICAL_EVENTS.filter((e) => e.depth_m >= 2760 && e.depth_m <= 2980).map((e) => (
              <div key={e.id} className="p-2 rounded border border-[#243044] bg-[#0a0f1e]">
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-blue-400">{e.well_id}</span>
                  <span className="font-mono text-xs text-slate-400">{e.depth_m}m</span>
                </div>
                <p className="text-xs text-white capitalize mt-0.5">{e.event_type.replace("_", " ")}</p>
                <p className="text-[10px] text-slate-500 mt-1">{e.mitigation}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
