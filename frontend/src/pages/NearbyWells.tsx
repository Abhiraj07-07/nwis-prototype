import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Card from "../components/common/Card";
import SafetyLabel from "../components/common/SafetyLabel";
import { ACTIVE_WELL, OFFSET_WELLS, SIMILARITIES } from "../api/mockData";

const RADII = [5, 10, 20];

export default function NearbyWells() {
  const [radiusKm, setRadiusKm] = useState(10);
  const center: [number, number] = [ACTIVE_WELL.lat, ACTIVE_WELL.lon];

  const visibleWells = OFFSET_WELLS.filter((w) => {
    const dLat = (w.lat - ACTIVE_WELL.lat) * 111;
    const dLon = (w.lon - ACTIVE_WELL.lon) * 111 * Math.cos((ACTIVE_WELL.lat * Math.PI) / 180);
    const dist = Math.sqrt(dLat * dLat + dLon * dLon);
    return dist <= radiusKm;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Nearby Wells</h1>
          <p className="text-sm text-slate-400 mt-1">
            Offset wells within a spatial radius — click a marker to view its profile.
          </p>
        </div>
        <SafetyLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <Card title="GIS — Active Well + Offset Wells">
            <div className="h-[520px] rounded-md overflow-hidden">
              <MapContainer
                center={center}
                zoom={11}
                className="h-full w-full"
                style={{ background: "#0a0f1e" }}
              >
                <TileLayer
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                <Circle
                  center={center}
                  radius={radiusKm * 1000}
                  pathOptions={{
                    color: "#3b82f6",
                    fillColor: "#3b82f6",
                    fillOpacity: 0.05,
                    dashArray: "6 6",
                  }}
                />

                <CircleMarker
                  center={center}
                  radius={10}
                  pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 1 }}
                >
                  <Popup>
                    <b>{ACTIVE_WELL.well_id}</b>
                    <br />
                    ACTIVE • {ACTIVE_WELL.depth_m}m
                    <br />
                    {ACTIVE_WELL.formation}
                  </Popup>
                </CircleMarker>

                {visibleWells.map((w) => {
                  const sim = SIMILARITIES.find((s) => s.well_id === w.well_id);
                  return (
                    <CircleMarker
                      key={w.id}
                      center={[w.lat, w.lon]}
                      radius={7}
                      pathOptions={{
                        color: "#f59e0b",
                        fillColor: "#f59e0b",
                        fillOpacity: 0.85,
                      }}
                    >
                      <Popup>
                        <b>{w.well_id}</b>
                        <br />
                        Formation: {w.formation}
                        <br />
                        Depth: {w.depth_m}m
                        <br />
                        Incidents: {w.incident_count}
                        {sim && (
                          <>
                            <br />
                            <b>Similarity: {sim.score}%</b>
                          </>
                        )}
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Radius Filter">
            <div className="flex gap-2">
              {RADII.map((r) => (
                <button
                  key={r}
                  onClick={() => setRadiusKm(r)}
                  className={`flex-1 py-2 text-xs rounded border transition ${
                    radiusKm === r
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-[#0a0f1e] border-[#243044] text-slate-300 hover:bg-[#1a2332]"
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              {visibleWells.length} well(s) within {radiusKm} km
            </p>
          </Card>

          <Card title="Wells in Radius">
            <div className="space-y-2">
              {visibleWells.map((w) => {
                const sim = SIMILARITIES.find((s) => s.well_id === w.well_id);
                return (
                  <div
                    key={w.id}
                    className="p-2 rounded border border-[#243044] bg-[#0a0f1e]"
                  >
                    <div className="flex justify-between">
                      <span className="font-mono text-sm text-white">{w.well_id}</span>
                      {sim && (
                        <span
                          className={`font-mono text-xs ${
                            sim.score > 80
                              ? "text-green-400"
                              : sim.score > 60
                              ? "text-amber-400"
                              : "text-slate-400"
                          }`}
                        >
                          {sim.score}%
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {w.formation} • {w.depth_m}m
                    </p>
                  </div>
                );
              })}
              {visibleWells.length === 0 && (
                <p className="text-xs text-slate-500">No wells in this radius.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
