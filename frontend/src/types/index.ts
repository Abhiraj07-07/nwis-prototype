export interface Well {
  id: number;
  well_id: string;
  name: string;
  lat: number;
  lon: number;
  formation: string;
  depth_m: number;
  reservoir: string;
  mw: number;
  incident_count: number;
  status: "ACTIVE" | "OFFSET" | "HISTORICAL";
}

export type EventType = "mud_loss" | "kick" | "stuck_pipe" | "torque_spike" | "cementing";

export interface DrillingEvent {
  id: number;
  well_id: string;
  depth_m: number;
  formation: string;
  event_type: EventType;
  severity: "LOW" | "MEDIUM" | "HIGH";
  cause: string;
  mitigation: string;
  outcome: string;
  source_doc: string;
}

export type RiskLevel = "INFO" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface RiskScore {
  score: number;
  level: RiskLevel;
  contributors: { factor: string; value: number; weight: number }[];
}

export interface Alert {
  id: string;
  type: string;
  level: RiskLevel;
  depth_m: number;
  message: string;
  evidence: { well_id: string; event_type: string; source_doc: string }[];
  timestamp: string;
}

export interface Similarity {
  well_id: string;
  score: number;
  breakdown: Record<string, number>;
}

export interface LiveSignal {
  timestamp: number;
  depth_m: number;
  torque: number;
  rop: number;
  spp: number;
  flow: number;
  mw: number;
}
