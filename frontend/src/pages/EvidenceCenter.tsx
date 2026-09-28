import { useState } from "react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";
import { HISTORICAL_EVENTS } from "../api/mockData";

export default function EvidenceCenter() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = HISTORICAL_EVENTS.filter((e) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      e.well_id.toLowerCase().includes(q) ||
      e.formation.toLowerCase().includes(q) ||
      e.event_type.includes(q) ||
      e.source_doc.toLowerCase().includes(q)
    );
  });

  const selectedEvent = HISTORICAL_EVENTS.find((e) => e.id === selected);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Evidence Center</h1>
          <p className="text-sm text-slate-400 mt-1">Source documents, extraction status, and traceability.</p>
        </div>
        <SafetyLabel />
      </div>

      <Card>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search source documents, wells, formations, events..."
          className="w-full bg-[#0a0f1e] border border-[#243044] rounded-md px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-600"
        />
        <p className="text-[11px] text-slate-500 mt-2">{filtered.length} evidence record(s)</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Evidence Records</h2>
          {filtered.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e.id)}
              className={`w-full text-left p-3 rounded border transition ${
                selected === e.id ? "bg-blue-950/40 border-blue-700" : "border-[#243044] bg-[#0a0f1e] hover:bg-[#1a2332]"
              }`}
            >
              <div className="flex justify-between mb-1">
                <span className="font-mono text-xs text-blue-400">{e.well_id}</span>
                <span className="font-mono text-[10px] text-slate-500">{e.depth_m}m</span>
              </div>
              <p className="text-xs text-white capitalize">{e.event_type.replace("_", " ")}</p>
              <p className="text-[10px] text-slate-500 font-mono mt-1 truncate">{e.source_doc}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {!selectedEvent && (
            <Card>
              <p className="text-sm text-slate-400 text-center py-12">Select an evidence record to view traceability.</p>
            </Card>
          )}
          {selectedEvent && (
            <div className="space-y-4">
              <Card title="Source Traceability">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Source Document</p>
                    <p className="text-white font-mono mt-1">{selectedEvent.source_doc}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Extraction Status</p>
                    <div className="mt-1"><Badge level="LOW">OCR VERIFIED</Badge></div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Well</p>
                    <p className="text-blue-400 font-mono mt-1">{selectedEvent.well_id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Depth</p>
                    <p className="text-white font-mono mt-1">{selectedEvent.depth_m} m</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Formation</p>
                    <p className="text-white mt-1">{selectedEvent.formation}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Severity</p>
                    <div className="mt-1"><Badge level={selectedEvent.severity}>{selectedEvent.severity}</Badge></div>
                  </div>
                </div>
              </Card>

              <Card title="Extracted Knowledge">
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1">Event</p>
                    <p className="text-white capitalize">{selectedEvent.event_type.replace("_", " ")}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1">Cause</p>
                    <p className="text-slate-300">{selectedEvent.cause}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1">Mitigation</p>
                    <p className="text-slate-300">{selectedEvent.mitigation}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1">Outcome</p>
                    <p className="text-slate-300">{selectedEvent.outcome}</p>
                  </div>
                </div>
              </Card>

              <Card title="Human Review Status">
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-green-400">Reviewed by Engineer</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-500">2024-08-15</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
