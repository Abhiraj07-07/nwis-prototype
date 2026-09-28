import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";

const RISKS = [
  { name: "Mud Loss", level: "HIGH", score: 78, evidence: "Historical loss events + flow/pressure deviation",
    contributors: [
      { factor: "Historical mud-loss events", weight: 45 },
      { factor: "Torque/ROP anomaly", weight: 25 },
      { factor: "Formation sensitivity", weight: 18 },
      { factor: "Similar well alignment", weight: 12 },
    ] },
  { name: "Stuck Pipe", level: "MEDIUM", score: 64, evidence: "Torque increase + ROP decrease + historical intervals",
    contributors: [
      { factor: "OIL-A07 stuck-pipe history", weight: 50 },
      { factor: "Differential pressure risk", weight: 30 },
      { factor: "Depth alignment", weight: 20 },
    ] },
  { name: "Kick / Influx", level: "MEDIUM", score: 58, evidence: "Pressure/flow deviation + historical events",
    contributors: [
      { factor: "Historical kick in Tipam", weight: 55 },
      { factor: "Flow deviation signal", weight: 25 },
      { factor: "Offset well similarity", weight: 20 },
    ] },
  { name: "Wellbore Instability", level: "LOW", score: 42, evidence: "Formation context + parameter drift",
    contributors: [
      { factor: "Shale formation context", weight: 40 },
      { factor: "Parameter drift", weight: 35 },
      { factor: "Historical event density", weight: 25 },
    ] },
];

const HEATMAP = [
  { formation: "Barail", depth: 2800, risk: 85 },
  { formation: "Barail", depth: 2900, risk: 72 },
  { formation: "Tipam", depth: 2650, risk: 65 },
  { formation: "Tipam", depth: 2500, risk: 40 },
  { formation: "Girujan", depth: 2400, risk: 30 },
  { formation: "Namsang", depth: 3080, risk: 78 },
];

const HEAT_COLOR = (r: number) => {
  if (r >= 75) return "bg-red-600";
  if (r >= 60) return "bg-orange-500";
  if (r >= 45) return "bg-amber-500";
  return "bg-green-600";
};

export default function RiskIntelligence() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Risk Intelligence</h1>
          <p className="text-sm text-slate-400 mt-1">Risk types, evidence fusion, contributor breakdown, and formation heatmap.</p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RISKS.map((r) => (
          <Card key={r.name}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-base font-semibold text-white">{r.name}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{r.evidence}</p>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-mono font-bold ${r.level === "HIGH" ? "text-orange-400" : r.level === "MEDIUM" ? "text-amber-400" : "text-green-400"}`}>{r.score}</p>
                <Badge level={r.level} />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Contributors</p>
            <div className="space-y-2">
              {r.contributors.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300">{c.factor}</span>
                    <span className="font-mono text-slate-400">{c.weight}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1a2332] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: `${c.weight}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card title="Formation Risk Heatmap — Event Density by Depth">
        <div className="space-y-2">
          {HEATMAP.slice().sort((a, b) => a.depth - b.depth).map((h, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-24 text-xs text-slate-400 font-mono">{h.depth}m</div>
              <div className="w-24 text-xs text-slate-300">{h.formation}</div>
              <div className="flex-1 h-6 bg-[#1a2332] rounded overflow-hidden">
                <div className={`h-full ${HEAT_COLOR(h.risk)} flex items-center justify-end pr-2`} style={{ width: `${h.risk}%` }}>
                  <span className="text-[10px] text-white font-mono">{h.risk}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 mt-3">Composite event density from nearby wells normalized by depth window.</p>
      </Card>

      <Card title="Confidence Decomposition">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Data Quality", value: 92, color: "text-green-400" },
            { label: "Historical Evidence", value: 88, color: "text-blue-400" },
            { label: "Similarity Confidence", value: 81, color: "text-purple-400" },
            { label: "Current Signal Confidence", value: 76, color: "text-amber-400" },
          ].map((c) => (
            <div key={c.label} className="p-3 bg-[#0a0f1e] border border-[#243044] rounded text-center">
              <p className={`text-2xl font-mono font-bold ${c.color}`}>{c.value}%</p>
              <p className="text-[10px] text-slate-500 mt-1">{c.label}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 mt-3">Confidence is not the same as event probability. Model estimate only.</p>
      </Card>
    </div>
  );
}
