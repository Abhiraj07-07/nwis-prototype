import { useState } from "react";
import Card from "../components/common/Card";
import SafetyLabel from "../components/common/SafetyLabel";
import { HISTORICAL_EVENTS } from "../api/mockData";
import type { DrillingEvent } from "../types";

interface Message {
  role: "user" | "ai";
  text?: string;
  evidence?: DrillingEvent[];
  inference?: string;
  review?: string;
  citations?: string[];
  noEvidence?: boolean;
}

const SUGGESTED = [
  "What happened here before at this depth?",
  "Any mud loss history in Barail?",
  "Stuck pipe mitigation in nearby wells?",
  "Kick incidents in Tipam formation?",
];

export default function Copilot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMessages((m) => [...m, { role: "user", text: q }]);

    const lower = q.toLowerCase();
    const relevant = HISTORICAL_EVENTS.filter((e) => {
      if (lower.includes("mud") && e.event_type === "mud_loss") return true;
      if (lower.includes("stuck") && e.event_type === "stuck_pipe") return true;
      if (lower.includes("kick") && e.event_type === "kick") return true;
      if (lower.includes("torque") && e.event_type === "torque_spike") return true;
      if (lower.includes("barail") && e.formation === "Barail") return true;
      if (lower.includes("tipam") && e.formation === "Tipam") return true;
      if (lower.includes("before") || lower.includes("happened")) return true;
      return false;
    }).slice(0, 3);

    if (relevant.length === 0) {
      setMessages((m) => [...m, { role: "ai", noEvidence: true, inference: "No matching historical evidence found.", evidence: [], citations: [] }]);
      return;
    }

    const first = relevant[0];
    setMessages((m) => [...m, {
      role: "ai",
      evidence: relevant,
      inference: "Across " + relevant.length + " historical event(s) in similar wells at comparable depth/formation, a pattern is visible. The case " + first.well_id + " @ " + first.depth_m + "m documents " + first.event_type.replace("_", " ") + " attributed to " + first.cause + ". Documented mitigation was: " + first.mitigation + " with outcome " + first.outcome + ".",
      review: "Recommended: review " + first.well_id + " source document before drilling ahead. Confirm mud weight, LCM availability, and torque/ROP monitoring at current depth.",
      citations: relevant.map((e) => e.source_doc),
    }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Copilot</h1>
          <p className="text-sm text-slate-400 mt-1">Evidence-grounded assistant. Facts, inference, review separated.</p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="space-y-3">
          <Card title="Suggested Questions">
            <div className="space-y-2">
              {SUGGESTED.map((q) => (
                <button key={q} onClick={() => ask(q)} className="w-full text-left text-xs p-2 rounded border border-[#243044] hover:bg-[#1a2332] text-slate-300">
                  {q}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Guardrails">
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>Answers from retrieved evidence only</li>
              <li>No fabricated well IDs or depths</li>
              <li>Every answer cites source docs</li>
              <li>Admits missing evidence</li>
            </ul>
          </Card>
        </div>

        <div className="lg:col-span-3 flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 text-sm mt-12">
                Ask a drilling-history question to begin.
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i}>
                {m.role === "user" && (
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white text-sm px-3 py-2 rounded-lg max-w-xl">{m.text}</div>
                  </div>
                )}
                {m.role === "ai" && (
                  <div className="space-y-2">
                    {m.noEvidence ? (
                      <div className="border border-amber-800 bg-amber-950/20 rounded-lg p-4 text-sm text-amber-300">{m.inference}</div>
                    ) : (
                      <>
                        <div className="border border-[#243044] rounded-lg overflow-hidden">
                          <div className="bg-[#1a2332] px-3 py-1.5 text-[10px] uppercase tracking-wider text-blue-400 font-semibold">Historical Evidence</div>
                          <div className="p-3 space-y-2">
                            {m.evidence?.map((e) => (
                              <div key={e.id} className="text-xs">
                                <p className="text-slate-300"><span className="font-mono text-blue-400">{e.well_id}</span> @ {e.depth_m}m · {e.formation}</p>
                                <p className="text-slate-500 text-[11px]">Cause: {e.cause} · Mitigation: {e.mitigation}</p>
                                <p className="text-[10px] text-slate-600 mt-0.5">{e.source_doc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border border-[#243044] rounded-lg overflow-hidden">
                          <div className="bg-[#1a2332] px-3 py-1.5 text-[10px] uppercase tracking-wider text-purple-400 font-semibold">AI Inference</div>
                          <div className="p-3 text-xs text-slate-300">{m.inference}</div>
                        </div>
                        <div className="border border-[#243044] rounded-lg overflow-hidden">
                          <div className="bg-[#1a2332] px-3 py-1.5 text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Recommended Review</div>
                          <div className="p-3 text-xs text-slate-300">{m.review}</div>
                        </div>
                        {m.citations && m.citations.length > 0 && (
                          <p className="text-[10px] text-slate-500">Citations: {m.citations.join(", ")}</p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { ask(input); setInput(""); } }}
              placeholder="Ask about historical drilling evidence..."
              className="flex-1 bg-[#0a0f1e] border border-[#243044] rounded-md px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-600"
            />
            <button onClick={() => { ask(input); setInput(""); }} className="btn btn-primary text-sm px-4">Ask</button>
          </div>
        </div>
      </div>
    </div>
  );
}
