import { useState } from "react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";
import { ACTIVE_WELL, OFFSET_WELLS, HISTORICAL_EVENTS } from "../api/mockData";

export default function WellExplorer() {
  const allWells = [ACTIVE_WELL, ...OFFSET_WELLS];
  const [selected, setSelected] = useState<string>(ACTIVE_WELL.well_id);
  const [tab, setTab] = useState<"overview" | "events" | "documents">("overview");

  const well = allWells.find((w) => w.well_id === selected)!;
  const events = HISTORICAL_EVENTS.filter((e) => e.well_id === selected);
  const isActive = selected === ACTIVE_WELL.well_id;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Well Explorer</h1>
          <p className="text-sm text-slate-400 mt-1">
            Well profile, trajectory context, events, and documents.
          </p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Well list */}
        <Card title="Wells">
          <div className="space-y-1">
            {allWells.map((w) => (
              <button
                key={w.well_id}
                onClick={() => setSelected(w.well_id)}
                className={`w-full text-left p-2 rounded text-xs transition ${
                  selected === w.well_id
                    ? "bg-blue-950/40 border border-blue-700"
                    : "hover:bg-[#1a2332] border border-transparent"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-white">{w.well_id}</span>
                  {w.well_id === ACTIVE_WELL.well_id && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-green-900/40 text-green-400 rounded">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {"formation" in w ? w.formation : ""}
                </p>
              </button>
            ))}
          </div>
        </Card>

        {/* Well detail */}
        <div className="lg:col-span-3 space-y-4">
          {/* Header */}
          <Card>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white font-mono">{well.well_id}</h2>
                  {isActive && <Badge level="LOW">ACTIVE DRILLING</Badge>}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {"formation" in well ? well.formation : ""} · Reservoir:{" "}
                  {"reservoir" in well ? well.reservoir : "—"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase">Depth</p>
                <p className="text-2xl font-mono font-bold text-white">
                  {"depth_m" in well ? well.depth_m : 0}
                </p>
                <p className="text-[10px] text-slate-500">meters MD</p>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-[#243044]">
            {(["overview", "events", "documents"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-xs px-3 py-2 capitalize border-b-2 -mb-px transition ${
                  tab === t
                    ? "border-blue-500 text-white"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {t} {t === "events" && `(${events.length})`}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Card title="Location">
                <p className="text-xs text-slate-300 font-mono">
                  {well.lat.toFixed(3)}° N
                </p>
                <p className="text-xs text-slate-300 font-mono">
                  {well.lon.toFixed(3)}° E
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Assam Basin, India</p>
              </Card>
              <Card title="Mud Weight">
                <p className="text-2xl font-mono text-white">
                  {"mw" in well ? well.mw : "—"}
                </p>
                <p className="text-[10px] text-slate-500">sg</p>
              </Card>
              <Card title="Incidents">
                <p className="text-2xl font-mono text-orange-400">
                  {"incident_count" in well ? well.incident_count : 0}
                </p>
                <p className="text-[10px] text-slate-500">recorded events</p>
              </Card>
              <Card title="Trajectory">
                <p className="text-xs text-slate-300">Vertical section</p>
                <p className="text-[10px] text-slate-500 mt-1">
                  MD {well.depth_m}m · TVD ~{Math.round(well.depth_m * 0.94)}m
                </p>
              </Card>
              <Card title="Casing / Cementing">
                <p className="text-xs text-slate-300">13⅜" @ 800m</p>
                <p className="text-xs text-slate-300">9⅝" @ 2200m</p>
                <p className="text-[10px] text-slate-500 mt-1">Reviewed from WCR</p>
              </Card>
              <Card title="Status">
                <Badge level={isActive ? "LOW" : "INFO"}>
                  {isActive ? "Drilling" : "Completed"}
                </Badge>
              </Card>
            </div>
          )}

          {tab === "events" && (
            <div className="space-y-2">
              {events.length === 0 && (
                <p className="text-xs text-slate-500 p-4">No events recorded.</p>
              )}
              {events.map((e) => (
                <Card key={e.id}>
                  <div className="flex justify-between">
                    <div>
                      <span className="text-sm font-semibold text-white capitalize">
                        {e.event_type.replace("_", " ")}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        {e.formation}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {e.depth_m}m
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    <b className="text-slate-300">Cause:</b> {e.cause}
                  </p>
                  <p className="text-xs text-slate-400">
                    <b className="text-slate-300">Mitigation:</b> {e.mitigation}
                  </p>
                  <p className="text-xs text-slate-400">
                    <b className="text-slate-300">Outcome:</b> {e.outcome}
                  </p>
                </Card>
              ))}
            </div>
          )}

          {tab === "documents" && (
            <div className="space-y-2">
              <Card>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📄</span>
                    <div>
                      <p className="text-sm text-white font-mono">
                        WCR_{selected}_full.pdf
                      </p>
                      <p className="text-[10px] text-slate-500">Weekly Completion Report</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-green-900/40 text-green-400 rounded">
                    OCR DONE
                  </span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📄</span>
                    <div>
                      <p className="text-sm text-white font-mono">
                        DDR_{selected}.pdf
                      </p>
                      <p className="text-[10px] text-slate-500">Daily Drilling Report</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-green-900/40 text-green-400 rounded">
                    OCR DONE
                  </span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📄</span>
                    <div>
                      <p className="text-sm text-white font-mono">
                        MudLog_{selected}.xlsx
                      </p>
                      <p className="text-[10px] text-slate-500">Mud Log Data</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-amber-900/40 text-amber-400 rounded">
                    EXTRACTED
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
