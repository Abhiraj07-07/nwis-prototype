import type { Well, DrillingEvent, Similarity, LiveSignal } from "../types";

export const ACTIVE_WELL = {
  well_id: "OIL-A01",
  name: "OIL-A01 (Active)",
  lat: 27.52,
  lon: 95.31,
  formation: "Barail",
  depth_m: 2800,
  reservoir: "Tipam Sand",
  mw: 1.32,
  status: "ACTIVE" as const,
};

export const OFFSET_WELLS: Well[] = [
  { id: 2, well_id: "OIL-A03", name: "OIL-A03", lat: 27.55, lon: 95.34, formation: "Barail", depth_m: 2850, reservoir: "Tipam Sand", mw: 1.34, incident_count: 5, status: "HISTORICAL" },
  { id: 3, well_id: "OIL-A05", name: "OIL-A05", lat: 27.49, lon: 95.28, formation: "Tipam", depth_m: 2650, reservoir: "Tipam Sand", mw: 1.28, incident_count: 3, status: "HISTORICAL" },
  { id: 4, well_id: "OIL-A07", name: "OIL-A07", lat: 27.58, lon: 95.37, formation: "Barail", depth_m: 2900, reservoir: "Barail Sand", mw: 1.36, incident_count: 6, status: "HISTORICAL" },
  { id: 5, well_id: "OIL-B02", name: "OIL-B02", lat: 27.45, lon: 95.25, formation: "Girujan", depth_m: 2400, reservoir: "Tipam Sand", mw: 1.22, incident_count: 2, status: "HISTORICAL" },
  { id: 6, well_id: "OIL-B04", name: "OIL-B04", lat: 27.62, lon: 95.42, formation: "Namsang", depth_m: 3100, reservoir: "Namsang", mw: 1.40, incident_count: 4, status: "HISTORICAL" },
];

export const HISTORICAL_EVENTS: DrillingEvent[] = [
  { id: 1, well_id: "OIL-A03", depth_m: 2820, formation: "Barail", event_type: "mud_loss", severity: "HIGH", cause: "Loss zone in Barail sandstone", mitigation: "LCM pill + reduce MW to 1.28", outcome: "Loss controlled in 6 hrs", source_doc: "WCR_OIL-A03_p23.pdf" },
  { id: 2, well_id: "OIL-A03", depth_m: 2760, formation: "Barail", event_type: "torque_spike", severity: "MEDIUM", cause: "Shale swelling", mitigation: "Increase MW, reduce ROP", outcome: "Stabilized", source_doc: "WCR_OIL-A03_p19.pdf" },
  { id: 3, well_id: "OIL-A05", depth_m: 2650, formation: "Tipam", event_type: "kick", severity: "HIGH", cause: "Overpressured sand", mitigation: "Increase MW to 1.35, BOP shut-in", outcome: "Well controlled", source_doc: "DDR_OIL-A05_p41.pdf" },
  { id: 4, well_id: "OIL-A07", depth_m: 2890, formation: "Barail", event_type: "stuck_pipe", severity: "HIGH", cause: "Differential sticking", mitigation: "Jar + wash over", outcome: "Freed after 12 hrs", source_doc: "WCR_OIL-A07_p33.pdf" },
  { id: 5, well_id: "OIL-A07", depth_m: 2830, formation: "Barail", event_type: "mud_loss", severity: "MEDIUM", cause: "Natural fracture", mitigation: "LCM + cement plug", outcome: "Partial loss", source_doc: "WCR_OIL-A07_p28.pdf" },
  { id: 6, well_id: "OIL-A05", depth_m: 2600, formation: "Tipam", event_type: "torque_spike", severity: "LOW", cause: "Bit balling", mitigation: "Reduce WOB", outcome: "Normal", source_doc: "WCR_OIL-A05_p15.pdf" },
  { id: 7, well_id: "OIL-B04", depth_m: 3080, formation: "Namsang", event_type: "mud_loss", severity: "HIGH", cause: "Depleted zone", mitigation: "Seepage loss treated", outcome: "Controlled", source_doc: "WCR_OIL-B04_p22.pdf" },
];

export const SIMILARITIES: Similarity[] = [
  { well_id: "OIL-A03", score: 87, breakdown: { geographic: 0.92, formation: 1.0, depth: 0.95, reservoir: 1.0, mud_weight: 0.98, rop_wob_rpm: 0.82, torque_pressure: 0.78, temperature: 0.90, incidents: 1.0 } },
  { well_id: "OIL-A07", score: 79, breakdown: { geographic: 0.85, formation: 1.0, depth: 0.90, reservoir: 0.4, mud_weight: 0.94, rop_wob_rpm: 0.75, torque_pressure: 0.70, temperature: 0.88, incidents: 1.0 } },
  { well_id: "OIL-A05", score: 68, breakdown: { geographic: 0.88, formation: 0.2, depth: 0.85, reservoir: 1.0, mud_weight: 0.96, rop_wob_rpm: 0.70, torque_pressure: 0.72, temperature: 0.85, incidents: 0.6 } },
  { well_id: "OIL-B04", score: 54, breakdown: { geographic: 0.72, formation: 0.2, depth: 0.70, reservoir: 0.3, mud_weight: 0.92, rop_wob_rpm: 0.65, torque_pressure: 0.60, temperature: 0.80, incidents: 0.8 } },
  { well_id: "OIL-B02", score: 42, breakdown: { geographic: 0.65, formation: 0.2, depth: 0.60, reservoir: 1.0, mud_weight: 0.90, rop_wob_rpm: 0.55, torque_pressure: 0.50, temperature: 0.75, incidents: 0.4 } },
];

export const generateLiveSignal = (tick: number, anomaly: boolean): LiveSignal => {
  const noise = () => (Math.random() - 0.5) * 2;
  const factor = anomaly ? Math.min(tick / 30, 1) : 0;
  return {
    timestamp: Date.now(),
    depth_m: 2800 + tick * 0.5,
    torque: 12 + factor * 18 + noise(),
    rop: 18 - factor * 12 + noise(),
    spp: 2800 - factor * 250 + noise() * 20,
    flow: 1200 - factor * 150 + noise() * 10,
    mw: 1.32 + noise() * 0.02,
  };
};
