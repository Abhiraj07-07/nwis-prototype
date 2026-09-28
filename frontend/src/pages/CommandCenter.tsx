import { useEffect, useState } from "react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";
import { OFFSET_WELLS, HISTORICAL_EVENTS, SIMILARITIES } from "../api/mockData";

export default function CommandCenter() {
  const [risk, setRisk] = useState({ score: 72, level: "MEDIUM" as any });

  useEffect(() => {
    const i = setInterval(() => {
      setRisk((r) => {
        const next = Math.max(40, Math.min(95, r.score + (Math.random() - 0.4) * 4));
        const level =
          next >= 90 ? "CRITICAL" : next >= 75 ? "HIGH" : next >= 60 ? "MEDIUM" : next >= 40 ? "LOW" : "INFO";
        return { score: Math.round(next), level };
      });
    }, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Command Center</h1>
          <p className="text-sm text-slate-400 mt-1">
            Active well context, live signals, risk intelligence, and nearby-well evidence.
          </p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Current Depth">
          <p className="text-3xl font-mono font-bold text-white">2800</p>
          <p className="text-xs text-slate-500">meters MD</p>
        </Card>
        <Card title="Formation">
          <p className="text-xl font-semibold text-white">Barail</p>
          <p className="text-xs text-slate-500">Top: 2760 m</p>
        </Card>
        <Card title="Nearby Wells">
          <p className="text-3xl font-mono font-bold text-blue-400">{OFFSET_WELLS.length}</p>
          <p className="text-xs text-slate-500">within 20 km radius</p>
        </Card>
        <Card title="Historical Events">
          <p className="text-3xl font-mono font-bold text-orange-400">{HISTORICAL_EVENTS.length}</p>
          <p className="text-xs text-slate-500">at comparable depth</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Risk Score" className="text-center">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-6xl font-bold text-orange-400 font-mono">{risk.score}</div>
            <div className="mt-3"><Badge level={risk.level} /></div>
            <p className="text-[10px] text-slate-500 mt-3">Model estimate — not validated</p>
          </div>
        </Card>

        <Card title="Top Similar Wells" className="lg:col-span-2">
          <div className="space-y-3">
            {SIMILARITIES.slice(0, 3).map((s) => (
              <div key={s.well_id} className="flex items-center justify-between border-b border-[#243044] pb-2 last:border-0">
                <div>
                  <p className="font-mono text-sm text-white">{s.well_id}</p>
                  <p className="text-xs text-slate-500">{OFFSET_WELLS.find((w) => w.well_id === s.well_id)?.formation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-[#1a2332] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${s.score > 80 ? "bg-green-500" : s.score > 60 ? "bg-amber-500" : "bg-slate-500"}`}
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                  <span className={`font-mono text-sm w-12 text-right ${s.score > 80 ? "text-green-400" : "text-amber-400"}`}>
                    {s.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Recent Historical Events (Nearby Wells)">
        <div className="space-y-2">
          {HISTORICAL_EVENTS.slice(0, 4).map((e) => (
            <div key={e.id} className="flex items-start gap-3 p-3 bg-[#0a0f1e] rounded border border-[#243044]">
              <span className="text-lg">
                {e.event_type === "mud_loss" ? "💧" : e.event_type === "kick" ? "🔥" : e.event_type === "stuck_pipe" ? "🔧" : "⚡"}
              </span>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-white capitalize">
                    {e.event_type.replace("_", " ")}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{e.depth_m} m</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  <span className="font-mono text-blue-400">{e.well_id}</span> · {e.formation}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  <b className="text-slate-400">Mitigation:</b> {e.mitigation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
