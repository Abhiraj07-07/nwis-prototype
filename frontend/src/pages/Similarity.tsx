import Card from "../components/common/Card";
import SafetyLabel from "../components/common/SafetyLabel";
import { OFFSET_WELLS, SIMILARITIES } from "../api/mockData";

const WEIGHTS: Record<string, number> = {
  geographic: 15,
  formation: 20,
  depth: 15,
  reservoir: 10,
  mud_weight: 10,
  rop_wob_rpm: 13,
  torque_pressure: 8,
  temperature: 2,
  incidents: 7,
};

export default function Similarity() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Similarity Engine</h1>
          <p className="text-sm text-slate-400 mt-1">
            Weighted comparison across geography, formation, depth, reservoir, and drilling parameters.
          </p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {SIMILARITIES.map((s) => {
          const well = OFFSET_WELLS.find((w) => w.well_id === s.well_id);
          return (
            <Card key={s.well_id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-lg text-white font-semibold">{s.well_id}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {well?.formation} • {well?.depth_m}m
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-3xl font-bold font-mono ${
                      s.score > 80
                        ? "text-green-400"
                        : s.score > 60
                        ? "text-amber-400"
                        : "text-slate-400"
                    }`}
                  >
                    {s.score}%
                  </p>
                  <p className="text-[10px] text-slate-500">overall</p>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                WHY {s.score}%? — Factor breakdown
              </p>
              <div className="space-y-2">
                {Object.entries(s.breakdown).map(([key, val]) => {
                  const pct = Math.round(val * 100);
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400 capitalize">
                          {key.replace(/_/g, " ")}
                          <span className="text-slate-600 ml-1">({WEIGHTS[key]}%)</span>
                        </span>
                        <span className="font-mono text-slate-300">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-[#1a2332] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            pct > 80
                              ? "bg-green-500"
                              : pct > 50
                              ? "bg-amber-500"
                              : "bg-slate-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
