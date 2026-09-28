import { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";
import { generateLiveSignal } from "../api/mockData";
import type { LiveSignal } from "../types";

export default function LiveDrilling() {
  const [signals, setSignals] = useState<LiveSignal[]>([]);
  const [running, setRunning] = useState(true);
  const [anomaly, setAnomaly] = useState(false);
  const tickRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      tickRef.current += 1;
      const s = generateLiveSignal(tickRef.current, anomaly);
      setSignals((prev) => [...prev.slice(-80), s]);
    }, 800);
    return () => clearInterval(interval);
  }, [running, anomaly]);

  const latest = signals[signals.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Drilling</h1>
          <p className="text-sm text-slate-400 mt-1">Simulated real-time telemetry.</p>
        </div>
        <SafetyLabel />
      </div>

      <div className="flex gap-2">
        <button onClick={() => setRunning((r) => !r)} className={`btn text-xs px-3 py-1.5 ${running ? "bg-amber-600 hover:bg-amber-700 text-white" : "btn-primary"}`}>
          {running ? "Pause Simulation" : "Resume Simulation"}
        </button>
        <button onClick={() => { setAnomaly((a) => !a); tickRef.current = 0; }} className={`btn text-xs px-3 py-1.5 ${anomaly ? "bg-red-600 hover:bg-red-700 text-white" : "bg-[#1a2332] border border-[#243044] text-slate-300"}`}>
          {anomaly ? "Anomaly Active - Stop" : "Inject Anomaly Pattern"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Torque", key: "torque", color: "text-orange-400", abnormal: latest && latest.torque > 20 },
          { label: "ROP", key: "rop", color: "text-green-400", abnormal: latest && latest.rop < 10 },
          { label: "SPP", key: "spp", color: "text-blue-400", abnormal: latest && latest.spp < 2650 },
          { label: "Flow", key: "flow", color: "text-cyan-400", abnormal: latest && latest.flow < 1100 },
          { label: "Mud Weight", key: "mw", color: "text-purple-400", abnormal: false },
        ].map(({ label, key, color, abnormal }) => {
          const val = latest ? (latest as any)[key] : 0;
          return (
            <Card key={key}>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
              <p className={`text-2xl font-mono font-bold mt-1 ${abnormal ? "text-red-400" : color}`}>
                {typeof val === "number" ? val.toFixed(2) : val}
              </p>
              {abnormal && <Badge level="HIGH">ABNORMAL</Badge>}
            </Card>
          );
        })}
      </div>

      <Card title="Multi-Signal Trend">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={signals}>
            <CartesianGrid strokeDasharray="3 3" stroke="#243044" />
            <XAxis dataKey="depth_m" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v.toFixed(0)}m`} />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={11} />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} />
            <Tooltip contentStyle={{ background: "#1a2332", border: "1px solid #243044", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line yAxisId="left" type="monotone" dataKey="torque" stroke="#f97316" strokeWidth={2} dot={false} name="Torque" />
            <Line yAxisId="left" type="monotone" dataKey="rop" stroke="#22c55e" strokeWidth={2} dot={false} name="ROP" />
            <Line yAxisId="right" type="monotone" dataKey="spp" stroke="#3b82f6" strokeWidth={2} dot={false} name="SPP" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {anomaly && (
        <Card className="border-red-800 bg-red-950/20">
          <p className="text-sm font-semibold text-red-400">Multi-Signal Anomaly Detected</p>
          <p className="text-xs text-slate-300 mt-1">Torque up + ROP down + SPP deviation — matches historical mud-loss signatures.</p>
        </Card>
      )}
    </div>
  );
}
