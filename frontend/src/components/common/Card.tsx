export default function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h3 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
