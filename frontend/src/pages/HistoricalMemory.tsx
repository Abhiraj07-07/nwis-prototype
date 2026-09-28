import { useState } from "react";
import Card from "../components/common/Card";
import SafetyLabel from "../components/common/SafetyLabel";
import { HISTORICAL_EVENTS } from "../api/mockData";

const LESSONS = [
  {
    id: 1,
    well_id: "OIL-A03",
    depth_m: 2820,
    formation: "Barail",
    lesson: "LCM pill + MW reduction to 1.28 controlled loss in 6 hrs. Early detection via torque+ROP pattern gave ~40 min lead time.",
    reviewed_by: "Dr. R. Sharma",
    date: "2024-08-12",
  },
  {
    id: 2,
    well_id: "OIL-A07",
    depth_m: 2890,
    formation: "Barail",
    lesson: "Differential sticking avoided by maintaining low ECD and continuous reaming. Jar + wash-over freed pipe when occurred.",
    reviewed_by: "S. Patel",
    date: "2024-05-03",
  },
  {
    id: 3,
    well_id: "OIL-A05",
    depth_m: 2650,
    formation: "Tipam",
    lesson: "Kick controlled via BOP shut-in + MW increase to 1.35. Flow check on every connection critical in this zone.",
    reviewed_by: "A. Kumar",
    date: "2024-02-18",
  },
];

export default function HistoricalMemory() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = HISTORICAL_EVENTS.filter((e) => {
    if (filter !== "all" && e.event_type !== filter) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      e.well_id.toLowerCase().includes(q) ||
      e.formation.toLowerCase().includes(q) ||
      e.event_type.includes(q) ||
      e.cause.toLowerCase().includes(q) ||
      e.mitigation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Historical Memory</h1>
          <p className="text-sm text-slate-400 mt-1">
            Institutional knowledge — searchable events, mitigations, and reviewed lessons.
          </p>
        </div>
        <SafetyLabel />
      </div>

      {/* Search + filter */}
      <Card>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by well, formation, event, cause, or mitigation..."
            className="flex-1 bg-[#0a0f1e] border border-[#243044] rounded-md px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-600"
          />
          <div className="flex gap-2 flex-wrap">
            {["all", "mud_loss", "kick", "stuck_pipe", "torque_spike"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded border capitalize transition ${
                  filter === f
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-[#0a0f1e] border-[#243044] text-slate-300 hover:bg-[#1a2332]"
                }`}
              >
                {f.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          {filteredEvents.length} event(s) matching
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Events list */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Searchable Historical Events
          </h2>
          {filteredEvents.map((e) => (
            <Card key={e.id}>
              <div className="flex items-start gap-3">
                <span className="text-lg">
                  {e.event_type === "mud_loss" ? "💧" : e.event_type === "kick" ? "🔥" : e.event_type === "stuck_pipe" ? "🔧" : "⚡"}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-mono text-sm text-blue-400">{e.well_id}</span>
                      <span className="text-xs text-slate-500 mx-2">·</span>
                      <span className="text-xs text-white capitalize">
                        {e.event_type.replace("_", " ")}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{e.depth_m}m</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {e.formation} · {e.cause}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#243044]">
                    <p className="text-xs text-slate-300">
                      <b className="text-green-400">Mitigation:</b> {e.mitigation}
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      <b className="text-blue-400">Outcome:</b> {e.outcome}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-2">📄 {e.source_doc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lessons Learned */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Lessons Learned
          </h2>
          <p className="text-[11px] text-slate-500 -mt-2">
            Reviewed mitigations — institutional memory that persists beyond individuals.
          </p>
          {LESSONS.map((l) => (
            <Card key={l.id} className="border-green-900/50 bg-green-950/10">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-xs text-blue-400">{l.well_id}</span>
                <span className="text-[10px] text-slate-500">{l.date}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{l.lesson}</p>
              <div className="flex justify-between mt-3 pt-2 border-t border-green-900/30">
                <span className="text-[10px] text-slate-500">
                  Reviewed by {l.reviewed_by}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{l.depth_m}m</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
