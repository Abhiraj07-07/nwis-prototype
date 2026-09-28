import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CommandCenter from "./pages/CommandCenter";
import NearbyWells from "./pages/NearbyWells";
import Similarity from "./pages/Similarity";
import LiveDrilling from "./pages/LiveDrilling";
import RiskCorridor from "./pages/RiskCorridor";
import Copilot from "./pages/Copilot";
import Alerts from "./pages/Alerts";
import CompareWells from "./pages/CompareWells";
import HistoricalMemory from "./pages/HistoricalMemory";
import WellExplorer from "./pages/WellExplorer";
import Documents from "./pages/Documents";
import RiskIntelligence from "./pages/RiskIntelligence";
import EvidenceCenter from "./pages/EvidenceCenter";
import WhatIf from "./pages/WhatIf";
import Backtest from "./pages/Backtest";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CommandCenter />} />
          <Route path="/nearby" element={<NearbyWells />} />
          <Route path="/similarity" element={<Similarity />} />
          <Route path="/live" element={<LiveDrilling />} />
          <Route path="/corridor" element={<RiskCorridor />} />
          <Route path="/wells" element={<WellExplorer />} />
          <Route path="/compare" element={<CompareWells />} />
          <Route path="/memory" element={<HistoricalMemory />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/risk" element={<RiskIntelligence />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/evidence" element={<EvidenceCenter />} />
          <Route path="/copilot" element={<Copilot />} />
          <Route path="/whatif" element={<WhatIf />} />
          <Route path="/backtest" element={<Backtest />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
