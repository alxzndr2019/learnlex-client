interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 hover:bg-black/40 transition-colors">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <span className="text-xl md:text-2xl">{icon}</span>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs md:text-sm ${
              trend.isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      <p className="text-white/70 text-xs md:text-sm mb-1">{title}</p>
      <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
