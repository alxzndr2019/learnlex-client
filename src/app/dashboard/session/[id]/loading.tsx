export default function SessionDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8 animate-pulse">
      {/* Video Metadata Skeleton */}
      <div className="aspect-video bg-white/10 rounded-xl mb-8"></div>
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-white/10 rounded-lg"></div>
        <div className="h-4 w-1/2 bg-white/10 rounded-lg"></div>
      </div>

      {/* Summary Section Skeleton */}
      <div className="bg-white/5 rounded-xl p-6">
        <div className="h-6 w-32 bg-white/10 rounded-lg mb-4"></div>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-white/10 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Key Points Section Skeleton */}
      <div className="bg-white/5 rounded-xl p-6">
        <div className="h-6 w-40 bg-white/10 rounded-lg mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white/10"></div>
              <div className="h-4 flex-1 bg-white/10 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Section Skeleton */}
      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-white/10 rounded-lg"></div>
          <div className="h-10 w-32 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
