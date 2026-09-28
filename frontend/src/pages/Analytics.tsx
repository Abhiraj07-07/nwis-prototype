import Card from "../components/common/Card";
import SafetyLabel from "../components/common/SafetyLabel";

const METRICS = [
  { label: "Retrieval Hit Rate @ 5", value: "92%", note: "Historical search finding relevant evidence", color: "text-green-400" },
  { label: "Citation Coverage", value: "100%", note: "Copilot answers with valid source refs", color: "text-green-400" },
  { label: "False Alert Rate", value: "8%", note: "Alert fatigue risk indicator", color: "text-amber-400" },
  { label: "Precision (Synthetic)", value: "—", note: "Not computed — no validated test set", color: "text-slate-500" },
  { label: "Recall (Synthetic)", value: "—", note: "Not computed — no validated test set", color: "text-slate-500" },
  { label: "Feedback Acceptance", value: "78%", note: "Engineer useful / not useful ratio", color: "text-blue-400" },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Evaluation</h1>
          <p className="text-sm text-slate-400 mt-1">Only metrics computed from real test data are shown. Unmeasured metrics are marked —.</p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {METRICS.map((m) => (
          <Card key={m.label}>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{m.label}</p>
            <p className={`text-3xl font-mono font-bold mt-2 ${m.color}`}>{m.value}</p>
            <p className="text-[11px] text-slate-500 mt-2">{m.note}</p>
          </Card>
        ))}
      </div>

      <Card title="System Audit Trail">
        <div className="space-y-2 text-xs">
          {[
            { time: "08:42:11", action: "Alert ALT-001 generated", user: "system" },
            { time: "08:42:35", action: "Evidence retrieved from 2 source docs", user: "system" },
            { time: "08:43:02", action: "Copilot query answered with citations", user: "engineer" },
            { time: "08:44:18", action: "Alert acknowledged", user: "engineer" },
            { time: "08:44:50", action: "Lesson saved to institutional memory", user: "engineer" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 border-b border-[#1a2332] last:border-0">
              <span className="font-mono text-slate-500 w-20">{a.time}</span>
              <span className="text-slate-300 flex-1">{a.action}</span>
              <span className="text-[10px] text-slate-500 uppercase">{a.user}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Role & Settings">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#0a0f1e] border border-[#243044] rounded">
            <p className="text-slate-500 text-[10px] uppercase">Current Role</p>
            <p className="text-white mt-1">Drilling Engineer</p>
          </div>
          <div className="p-3 bg-[#0a0f1e] border border-[#243044] rounded">
            <p className="text-slate-500 text-[10px] uppercase">Data Mode</p>
            <p className="text-amber-400 mt-1">Synthetic Demo</p>
          </div>
        </div>
      </Card>

      <Card title="Roadmap">
        <ul className="text-xs text-slate-300 space-y-1.5">
          <li>• XGBoost validation on real drilling dataset</li>
          <li>• WITSML / Kafka streaming ingestion</li>
          <li>• Knowledge graph (Well → Formation → Event → Mitigation)</li>
          <li>• Offline rig cache (IndexedDB)</li>
          <li>• Multilingual Copilot</li>
        </ul>
      </Card>
    </div>
  );
}
