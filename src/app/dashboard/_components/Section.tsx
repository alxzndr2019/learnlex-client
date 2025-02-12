interface SectionProps {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function Section({
  title,
  children,
  action,
  className = "",
}: SectionProps) {
  return (
    <div
      className={`bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}
    >
      {(title || action) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-bold text-white">{title}</h2>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
