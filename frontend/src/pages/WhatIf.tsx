import { useState } from "react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";

export default function WhatIf() {
  const [mw, setMw] = useState(1.32);
  const [rop, setRop] = useState(18);
  const [rpm, setRpm] = useState(80);

  const baseRisk = 72;
  const mwEffect = (mw - 1.32) * -30;
  const ropEffect = (rop - 18) * -0.8;
  const rpmEffect = (rpm - 80) * 0.15;

  const newRisk = Math.max(0, Math.min(100, baseRisk + mwEffect + ropEffect + rpmEffect));
  const delta = newRisk - baseRisk;

  const level = (s: number) =>
    s >= 90 ? "CRITICAL" : s >= 75 ? "HIGH" : s >= 60 ? "MEDIUM" : s >= 40 ? "LOW" : "INFO";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">What-If Analysis</h1>
          <p className="text-sm text-slate-400 mt-1">Estimate how parameter changes affect risk assessment. Counterfactual only.</p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card title="Parameter Controls">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300">Mud Weight (sg)</span>
                  <span className="font-mono text-blue-400">{mw.toFixed(2)}</span>
                </div>
                <input type="range" min="1.10" max="1.50" step="0.01" value={mw}
                  onChange={(e) => setMw(parseFloat(e.target.value))}
                  className="w-full accent-blue-500" />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1.10 (lower)</span><span>1.50 (higher)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300">ROP (m/hr)</span>
                  <span className="font-mono text-green-400">{rop}</span>
                </div>
                <input type="range" min="5" max="30" step="1" value={rop}
                  onChange={(e) => setRop(parseInt(e.target.value))}
                  className="w-full accent-green-500" />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>5 (slow)</span><span>30 (fast)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300">RPM</span>
                  <span className="font-mono text-orange-400">{rpm}</span>
                </div>
                <input type="range" min="40" max="120" step="5" value={rpm}
                  onChange={(e) => setRpm(parseInt(e.target.value))}
                  className="w-full accent-orange-500" />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>40</span><span>120</span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Risk Impact Visualization">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Current Risk</span>
                  <span className="font-mono text-white">{baseRisk}</span>
                </div>
                <div className="h-3 bg-[#1a2332] rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500" style={{ width: `${baseRisk}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">What-If Risk</span>
                  <span className={`font-mono ${delta < 0 ? "text-green-400" : delta > 0 ? "text-red-400" : "text-slate-300"}`}>
                    {newRisk.toFixed(0)} ({delta > 0 ? "+" : ""}{delta.toFixed(1)})
                  </span>
                </div>
                <div className="h-3 bg-[#1a2332] rounded-full overflow-hidden">
                  <div className={`h-full ${delta < 0 ? "bg-green-500" : delta > 0 ? "bg-red-500" : "bg-slate-500"}`}
                    style={{ width: `${newRisk}%` }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="What-If Risk Score" className="text-center">
            <div className="py-4">
              <p className={`text-6xl font-bold font-mono ${newRisk >= 75 ? "text-orange-400" : newRisk >= 60 ? "text-amber-400" : "text-green-400"}`}>
                {newRisk.toFixed(0)}
              </p>
              <div className="mt-3"><Badge level={level(newRisk)} /></div>
              <p className="text-[10px] text-slate-500 mt-3">Counterfactual estimate</p>
            </div>
          </Card>

          <Card title="Interpretation">
            <p className="text-xs text-slate-300 leading-relaxed">
              {delta < -5 && "Reducing risk significantly. Increasing MW and moderating ROP shows the largest protective effect in this model."}
              {delta >= -5 && delta <= 5 && "Parameter changes have minimal impact on model risk. Consider other factors."}
              {delta > 5 && "Risk increases with these settings. Consider lowering ROP or adjusting MW."}
            </p>
          </Card>

          <Card title="Guardrail">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              This is a counterfactual model estimate, not a validated prediction. Real decisions require engineer review and eRTMAC-confirmed data.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
