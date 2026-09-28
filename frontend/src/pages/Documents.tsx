import { useState } from "react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SafetyLabel from "../components/common/SafetyLabel";

interface DocItem {
  id: string;
  name: string;
  type: "WCR" | "DDR" | "MudLog";
  well_id: string;
  size: string;
  status: "QUEUED" | "OCR" | "EXTRACTED" | "REVIEW";
  entities: number;
}

const INITIAL_DOCS: DocItem[] = [
  { id: "1", name: "WCR_OIL-A03_p23.pdf", type: "WCR", well_id: "OIL-A03", size: "2.4 MB", status: "EXTRACTED", entities: 18 },
  { id: "2", name: "DDR_OIL-A05_p41.pdf", type: "DDR", well_id: "OIL-A05", size: "1.8 MB", status: "EXTRACTED", entities: 12 },
  { id: "3", name: "WCR_OIL-A07_p33.pdf", type: "WCR", well_id: "OIL-A07", size: "3.1 MB", status: "OCR", entities: 0 },
  { id: "4", name: "MudLog_OIL-B04.xlsx", type: "MudLog", well_id: "OIL-B04", size: "890 KB", status: "REVIEW", entities: 24 },
  { id: "5", name: "WCR_OIL-A01_draft.pdf", type: "WCR", well_id: "OIL-A01", size: "2.2 MB", status: "QUEUED", entities: 0 },
];

const STATUS_COLORS: Record<string, "INFO" | "MEDIUM" | "LOW" | "HIGH"> = {
  QUEUED: "INFO",
  OCR: "MEDIUM",
  EXTRACTED: "LOW",
  REVIEW: "HIGH",
};

export default function Documents() {
  const [docs, setDocs] = useState(INITIAL_DOCS);
  const [dragOver, setDragOver] = useState(false);

  const simulateUpload = () => {
    const newDoc: DocItem = {
      id: Date.now().toString(),
      name: `Uploaded_Doc_${docs.length + 1}.pdf`,
      type: "WCR",
      well_id: "OIL-A01",
      size: "1.5 MB",
      status: "QUEUED",
      entities: 0,
    };
    setDocs((d) => [newDoc, ...d]);
    setTimeout(() => {
      setDocs((d) =>
        d.map((x) => (x.id === newDoc.id ? { ...x, status: "OCR" } : x))
      );
    }, 1500);
    setTimeout(() => {
      setDocs((d) =>
        d.map((x) =>
          x.id === newDoc.id ? { ...x, status: "EXTRACTED", entities: 15 } : x
        )
      );
    }, 3500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-sm text-slate-400 mt-1">
            Upload, OCR, extract entities, and validate documents into structured knowledge.
          </p>
        </div>
        <SafetyLabel />
      </div>

      {/* Upload zone */}
      <Card>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            simulateUpload();
          }}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
            dragOver
              ? "border-blue-500 bg-blue-950/20"
              : "border-[#243044] bg-[#0a0f1e]"
          }`}
        >
          <p className="text-3xl mb-2">📄</p>
          <p className="text-sm text-slate-300">
            Drag & drop PDF / TXT / CSV files here
          </p>
          <p className="text-xs text-slate-500 mt-1">
            OCR supported for scanned documents
          </p>
          <button
            onClick={simulateUpload}
            className="btn btn-primary text-xs mt-3 px-4 py-2"
          >
            Or click to simulate upload
          </button>
        </div>
      </Card>

      {/* Pipeline info */}
      <Card title="Processing Pipeline">
        <div className="flex flex-wrap items-center gap-2 text-[10px]">
          {[
            "Upload",
            "Extract Text",
            "OCR",
            "Classify",
            "NER Extract",
            "Human Review",
            "Structured Events",
            "Embeddings",
            "Searchable KB",
          ].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="px-2 py-1 bg-[#1a2332] border border-[#243044] rounded text-slate-300">
                {step}
              </span>
              {i < arr.length - 1 && <span className="text-slate-600">→</span>}
            </div>
          ))}
        </div>
      </Card>

      {/* Documents table */}
      <Card title="Document Queue">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-500 border-b border-[#243044]">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Well</th>
                <th className="py-2 pr-4">Size</th>
                <th className="py-2 pr-4">Entities</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-[#1a2332] hover:bg-[#1a2332]/40"
                >
                  <td className="py-2 pr-4 font-mono text-slate-200">{d.name}</td>
                  <td className="py-2 pr-4">
                    <span className="px-1.5 py-0.5 bg-[#1a2332] rounded text-slate-400 text-[10px]">
                      {d.type}
                    </span>
                  </td>
                  <td className="py-2 pr-4 font-mono text-blue-400">{d.well_id}</td>
                  <td className="py-2 pr-4 text-slate-400">{d.size}</td>
                  <td className="py-2 pr-4 text-slate-400">
                    {d.entities > 0 ? d.entities : "—"}
                  </td>
                  <td className="py-2 pr-4">
                    <Badge level={STATUS_COLORS[d.status]}>{d.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
