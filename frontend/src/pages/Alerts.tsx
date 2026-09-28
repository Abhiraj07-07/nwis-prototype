import { useState } from "react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";
import { HISTORICAL_EVENTS } from "../api/mockData";

interface AlertItem {
  id: string;
  type: string;
  level: "HIGH" | "MEDIUM" | "CRITICAL";
  depth_m: number;
  message: string;
  contributors: { factor: string; value: number }[];
  eventIds: number[];
  time: string;
}

const ALERTS: AlertItem[] = [
  {
    id: "ALT-001",
    type: "Mud Loss Risk",
    level: "HIGH",
    depth_m: 2820,
    message: "Torque spike + ROP drop + SPP deviation match historical mud-loss signature at comparable depth.",
    contributors: [
      { factor: "Historical mud-loss events", value: 45 },
      { factor: "Torque anomaly (current)", value: 25 },
      { factor: "ROP decline pattern", value: 18 },
      { factor: "Formation (Barail)", value: 12 },
    ],
    eventIds: [1, 5],
    time: "2 min ago",
  },
  {
    id: "ALT-002",
    type: "Stuck Pipe Risk",
    level: "MEDIUM",
    depth_m: 2890,
    message: "Historical stuck-pipe interval detected in offset well at similar depth and trajectory.",
    contributors: [
      { factor: "Similar well OIL-A07 stuck-pipe", value: 50 },
      { factor: "Differential pressure risk", value: 30 },
      { factor: "Depth alignment", value: 20 },
    ],
    eventIds: [4],
    time: "8 min ago",
  },
  {
    id: "ALT-003",
    type: "Kick / Influx Watch",
    level: "MEDIUM",
    depth_m: 2650,
    message: "Historical kick event in Tipam formation at OIL-A05 — monitor flow/pressure deviation.",
    contributors: [
      { factor: "Similar formation kick", value: 55 },
      { factor: "Flow deviation signal", value: 25 },
      { factor: "Offset well similarity", value: 20 },
    ],
    eventIds: [3],
    time: "15 min ago",
  },
];

export default function Alerts() {
  const [selected, setSelected] = useState<AlertItem | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Alerts</h1>
          <p className="text-sm text-slate-400 mt-1">
            Active alert queue with deduplication and evidence traceability.
          </p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Alert list */}
        <div className="lg:col-span-1 space-y-3">
          <Card title="Active Alerts">
            <div className="space-y-2">
              {ALERTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelected(a)}
                  className={`w-full text-left p-3 rounded border transition ${
                    selected?.id === a.id
                      ? "bg-blue-950/40 border-blue-700"
                      : "border-[#243044] bg-[#0a0f1e] hover:bg-[#1a2332]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <Badge level={a.level} />
                    <span className="text-[10px] text-slate-500 font-mono">{a.time}</span>
                  </div>
                  <p className="text-sm font-semibold text-white mt-1">{a.type}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{a.depth_m}m</p>
                </button>
              ))}
            </div>
          </Card>

          <Card title="Deduplication">
            <p className="text-[11px] text-slate-400">
              3 raw signals grouped into 1 active Mud Loss alert. Prevents alert fatigue.
            </p>
          </Card>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {!selected && (
            <Card>
              <p className="text-sm text-slate-400 text-center py-12">
                Select an alert to view evidence.
              </p>
            </Card>
          )}

          {selected && (
            <div className="space-y-4">
              {/* Alert header */}
              <Card>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge level={selected.level} />
                      <span className="text-xs font-mono text-slate-500">{selected.id}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{selected.type}</h2>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      Depth: {selected.depth_m} m
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-300">{selected.message}</p>
              </Card>

              {/* WHY THIS ALERT */}
              <Card title="Why This Alert?">
                <div className="space-y-3">
                  {selected.contributors.map((c, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">{c.factor}</span>
                        <span className="font-mono text-slate-400">{c.value}%</span>
                      </div>
                      <div className="h-2 bg-[#1a2332] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                          style={{ width: `${c.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Evidence */}
              <Card title="Supporting Historical Evidence">
                <div className="space-y-2">
                  {HISTORICAL_EVENTS.filter((e) =>
                    selected.eventIds.includes(e.id)
                  ).map((e) => (
                    <div
                      key={e.id}
                      className="p-3 rounded border border-[#243044] bg-[#0a0f1e]"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-mono text-sm text-blue-400">
                          {e.well_id}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          {e.depth_m} m
                        </span>
                      </div>
                      <p className="text-xs text-white capitalize">
                        {e.event_type.replace("_", " ")} · {e.formation}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        <b className="text-slate-300">Cause:</b> {e.cause}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        <b className="text-slate-300">Mitigation:</b> {e.mitigation}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        <b className="text-slate-300">Outcome:</b> {e.outcome}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-2">
                        Source: {e.source_doc}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="btn btn-primary text-xs px-4 py-2">
                  Acknowledge
                </button>
                <button className="btn bg-[#1a2332] border border-[#243044] text-slate-300 hover:bg-[#243044] text-xs px-4 py-2">
                  Save as Lesson Learned
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
