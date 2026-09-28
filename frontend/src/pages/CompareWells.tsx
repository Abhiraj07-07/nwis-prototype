import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";
import { ACTIVE_WELL, OFFSET_WELLS, HISTORICAL_EVENTS, SIMILARITIES } from "../api/mockData";

const CURRENT_DEPTH = 2800;

// Synthetic curve for each well (depth vs ROP)
const makeCurve = (wellId: string, maxDepth: number) => {
  const points = [];
  for (let d = 2400; d <= maxDepth; d += 50) {
    const base = 20;
    const dip = d > 2780 && d < 2860 ? -10 : 0;
    const noise = (Math.sin(d / 100 + wellId.length) * 3) + Math.cos(d / 70) * 2;
    points.push({ depth: d, rop: Math.max(4, base + dip + noise) });
  }
  return points;
};

export default function CompareWells() {
  const [selectedWell, setSelectedWell] = useState(OFFSET_WELLS[0].well_id);

  const offset = OFFSET_WELLS.find((w) => w.well_id === selectedWell)!;
  const sim = SIMILARITIES.find((s) => s.well_id === selectedWell);

  const activeCurve = makeCurve(ACTIVE_WELL.well_id, 3000);
  const offsetCurve = makeCurve(offset.well_id, offset.depth_m);

  // Merge curves by depth
  const merged = activeCurve.map((a) => {
    const o = offsetCurve.find((x) => x.depth === a.depth);
    return { depth: a.depth, active: a.rop, offset: o?.rop };
  });

  const offsetEvents = HISTORICAL_EVENTS.filter((e) => e.well_id === selectedWell);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Compare Wells</h1>
          <p className="text-sm text-slate-400 mt-1">
            Synchronized depth curves and events: current well vs selected offset well.
          </p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Well selector */}
        <div className="space-y-2">
          <Card title="Select Offset Well">
            <div className="space-y-2">
              {OFFSET_WELLS.map((w) => {
                const s = SIMILARITIES.find((x) => x.well_id === w.well_id);
                return (
                  <button
                    key={w.well_id}
                    onClick={() => setSelectedWell(w.well_id)}
                    className={`w-full text-left p-2 rounded border transition ${
                      selectedWell === w.well_id
                        ? "bg-blue-950/40 border-blue-700"
                        : "border-[#243044] bg-[#0a0f1e] hover:bg-[#1a2332]"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-mono text-sm text-white">{w.well_id}</span>
                      <span className={`font-mono text-xs ${s && s.score > 80 ? "text-green-400" : s && s.score > 60 ? "text-amber-400" : "text-slate-400"}`}>
                        {s?.score}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {w.formation} · {w.depth_m}m
                    </p>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Comparison area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Header */}
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Comparing</p>
                <p className="text-sm text-white font-mono mt-1">
                  <span className="text-blue-400">{ACTIVE_WELL.well_id}</span>
                  <span className="text-slate-500 mx-2">vs</span>
                  <span className="text-amber-400">{selectedWell}</span>
                </p>
              </div>
              <div className="text-right">
                <Badge level={sim && sim.score > 80 ? "LOW" : sim && sim.score > 60 ? "MEDIUM" : "INFO"}>
                  {sim?.score}% similar
                </Badge>
                <p className="text-[10px] text-slate-500 mt-1">Weighted score</p>
              </div>
            </div>
          </Card>

          {/* Chart */}
          <Card title="Synchronized ROP Curve — Depth Aligned">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={merged}>
                <CartesianGrid strokeDasharray="3 3" stroke="#243044" />
                <XAxis dataKey="depth" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v}m`} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a2332", border: "1px solid #243044", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <ReferenceLine
                  x={CURRENT_DEPTH}
                  stroke="#3b82f6"
                  strokeDasharray="4 4"
                  label={{ value: "Current", fill: "#3b82f6", fontSize: 10, position: "top" }}
                />
                <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} dot={false} name="Active OIL-A01" />
                <Line type="monotone" dataKey="offset" stroke="#f59e0b" strokeWidth={2} dot={false} name={selectedWell} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Offset well events */}
          <Card title={`Historical Events — ${selectedWell}`}>
            {offsetEvents.length === 0 ? (
              <p className="text-xs text-slate-500">No events recorded for this well.</p>
            ) : (
              <div className="space-y-2">
                {offsetEvents.map((e) => (
                  <div key={e.id} className="flex items-start gap-3 p-3 bg-[#0a0f1e] rounded border border-[#243044]">
                    <span className="text-lg">
                      {e.event_type === "mud_loss" ? "💧" : e.event_type === "kick" ? "🔥" : e.event_type === "stuck_pipe" ? "🔧" : "⚡"}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold text-white capitalize">
                          {e.event_type.replace("_", " ")}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{e.depth_m}m</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{e.formation}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        <b className="text-slate-400">Mitigation:</b> {e.mitigation}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-1">Source: {e.source_doc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
