const COLORS: Record<string, string> = {
  INFO: "bg-blue-900/40 text-blue-400 border-blue-700",
  LOW: "bg-green-900/40 text-green-400 border-green-700",
  MEDIUM: "bg-amber-900/40 text-amber-400 border-amber-700",
  HIGH: "bg-orange-900/40 text-orange-400 border-orange-700",
  CRITICAL: "bg-red-900/40 text-red-400 border-red-700",
};

export default function Badge({ level, children }: { level: string; children?: React.ReactNode }) {
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${COLORS[level] || COLORS.INFO}`}>
      {children || level}
    </span>
  );
}
