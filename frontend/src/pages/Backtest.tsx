import { useState } from "react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";

const CASES = [
  { well: "OIL-A03", event: "Mud Loss", eventDepth: 2820, alertDepth: 2790, leadMeters: 30, leadMinutes: 42, level: "HIGH" },
  { well: "OIL-A07", event: "Stuck Pipe", eventDepth: 2890, alertDepth: 2830, leadMeters: 60, leadMinutes: 88, level: "HIGH" },
  { well: "OIL-A05", event: "Kick", eventDepth: 2650, alertDepth: 2620, leadMeters: 30, leadMinutes: 35, level: "MEDIUM" },
  { well: "OIL-B04", event: "Mud Loss", eventDepth: 3080, alertDepth: 3020, leadMeters: 60, leadMinutes: 55, level: "MEDIUM" },
];

export default function Backtest() {
  const [selected, setSelected] = useState(0);
  const c = CASES[selected];

  const minDepth = 2500;
  const maxDepth = 3200;
  const pos = (d: number) => ((d - minDepth) / (maxDepth - minDepth)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Backtest / Replay</h1>
          <p className="text-sm text-slate-400 mt-1">Replay historical wells and measure when the prototype would have alerted.</p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Historical Cases</h2>
          {CASES.map((x, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`w-full text-left p-3 rounded border transition ${selected === i ? "bg-blue-950/40 border-blue-700" : "border-[#243044] bg-[#0a0f1e] hover:bg-[#1a2332]"}`}>
              <div className="flex justify-between">
                <span className="font-mono text-xs text-blue-400">{x.well}</span>
                <span className="text-[10px] text-slate-500 font-mono">{x.eventDepth}m</span>
              </div>
              <p className="text-xs text-white mt-1">{x.event}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-4">
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 uppercase">Replaying</p>
                <p className="text-lg font-mono text-white mt-1">
                  <span className="text-blue-400">{c.well}</span> · {c.event}
                </p>
              </div>
              <Badge level={c.level}>{c.level}</Badge>
            </div>
          </Card>

          <Card title="Depth Timeline">
            <div className="relative h-48 bg-[#0a0f1e] rounded border border-[#243044]">
              {/* Base track */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-[#1a2332] rounded" />

              {/* Highlight span between alert and event */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded"
                style={{
                  left: `calc(2rem + ${pos(c.alertDepth)}% * 0.88)`,
                  width: `calc(${pos(c.eventDepth) - pos(c.alertDepth)}% * 0.88)`,
                }}
              />

              {/* ALERT marker — label ABOVE the line */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `calc(2rem + ${pos(c.alertDepth)}% * 0.88)`,
                  top: "50%",
                  transform: "translate(-50%, 0)",
                }}
              >
                <div
                  className="flex flex-col items-center"
                  style={{ transform: "translateY(-100%)", marginTop: "-8px" }}
                >
                  <p className="text-[10px] text-blue-400 font-mono whitespace-nowrap mb-1">
                    ALERT {c.alertDepth}m
                  </p>
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0a0f1e]" />
                </div>
              </div>

              {/* EVENT marker — label BELOW the line */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `calc(2rem + ${pos(c.eventDepth)}% * 0.88)`,
                  top: "50%",
                  transform: "translate(-50%, 0)",
                }}
              >
                <div
                  className="flex flex-col items-center"
                  style={{ transform: "translateY(0)", marginTop: "8px" }}
                >
                  <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-[#0a0f1e]" />
                  <p className="text-[10px] text-red-400 font-mono whitespace-nowrap mt-1">
                    EVENT {c.eventDepth}m
                  </p>
                </div>
              </div>

              {/* Lead indicator bottom center */}
              <div
                className="absolute bottom-3 text-[10px] text-green-400 font-mono whitespace-nowrap"
                style={{
                  left: `calc(2rem + ${(pos(c.alertDepth) + pos(c.eventDepth)) / 2}% * 0.88)`,
                  transform: "translateX(-50%)",
                }}
              >
                ← {c.leadMeters}m lead →
              </div>

              {/* Depth axis hints */}
              <div className="absolute bottom-1 left-8 text-[9px] text-slate-600 font-mono">{minDepth}m</div>
              <div className="absolute bottom-1 right-8 text-[9px] text-slate-600 font-mono">{maxDepth}m</div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card title="Lead Time (Computed)">
              <p className="text-3xl font-mono font-bold text-green-400">{c.leadMinutes} min</p>
              <p className="text-[10px] text-slate-500 mt-1">Alert → Event</p>
            </Card>
            <Card title="Lead Depth">
              <p className="text-3xl font-mono font-bold text-blue-400">{c.leadMeters} m</p>
              <p className="text-[10px] text-slate-500 mt-1">Historical record</p>
            </Card>
          </div>

          <Card title="Note">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Only computed lead-time values from synthetic test data are shown. No accuracy claim is made without a validated test set.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
