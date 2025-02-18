export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="h-8 w-48 bg-white/10 rounded-lg mb-2"></div>
          <div className="h-4 w-64 bg-white/10 rounded-lg"></div>
        </div>
        <div className="h-10 w-32 bg-white/10 rounded-lg"></div>
      </div>

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-xl p-6 h-[120px] flex flex-col justify-between"
          >
            <div className="h-4 w-24 bg-white/10 rounded-lg"></div>
            <div className="h-8 w-32 bg-white/10 rounded-lg"></div>
          </div>
        ))}
      </div>

      {/* Activity Chart Skeleton */}
      <div className="bg-white/5 rounded-xl p-6">
        <div className="h-6 w-40 bg-white/10 rounded-lg mb-4"></div>
        <div className="h-64 bg-white/10 rounded-lg"></div>
      </div>

      {/* Recent Sessions Skeleton */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-40 bg-white/10 rounded-lg"></div>
          <div className="h-4 w-20 bg-white/10 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg overflow-hidden">
              <div className="aspect-video bg-white/10"></div>
              <div className="p-4">
                <div className="h-4 w-3/4 bg-white/10 rounded-lg mb-2"></div>
                <div className="h-3 w-1/2 bg-white/10 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
