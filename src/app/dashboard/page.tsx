import Image from "next/image";
import Link from "next/link";

const QuickStatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
        Last 30 days
      </span>
    </div>
    <p className="text-gray-600 text-sm mb-1">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const SessionCard = ({
  id,
  title,
  progress,
  thumbnail,
  lastAccessed,
}: {
  id: string;
  title: string;
  progress: number;
  thumbnail: string;
  lastAccessed: string;
}) => (
  <Link href={`/dashboard/session/${id}`} className="block">
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <button
            className="bg-white/90 p-3 rounded-full"
            aria-label="View session"
          >
            <svg
              className="w-6 h-6 text-[#8811f0]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold">{title}</h3>
          <span className="text-xs text-gray-500">{lastAccessed}</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8811f0] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const NewSessionCard = () => (
  <Link href="/dashboard/new" className="block">
    <button className="h-full min-h-[280px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 hover:bg-gray-100 transition-colors w-full">
      <div className="w-12 h-12 rounded-full bg-[#8811f0]/10 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-[#8811f0]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <span className="font-medium text-gray-600">Create New Session</span>
    </button>
  </Link>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Welcome back, Alex</h1>
          <p className="text-gray-600">
            Track your learning progress and create new sessions
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QuickStatCard icon="🎟️" title="Tokens Remaining" value="15 tokens" />
          <QuickStatCard icon="📈" title="Completed Sessions" value="24" />
          <QuickStatCard icon="🏆" title="Achievement Score" value="850" />
        </div>

        {/* Progress Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-bold mb-4">Learning Progress</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart component will be implemented here
          </div>
        </div>

        {/* Sessions Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Your Learning Sessions</h2>
            <button className="text-[#8811f0] hover:text-purple-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SessionCard
              id="1"
              title="React Fundamentals"
              progress={65}
              thumbnail="/course-thumbnail.jpg"
              lastAccessed="2h ago"
            />
            <SessionCard
              id="2"
              title="Advanced JavaScript"
              progress={32}
              thumbnail="/course-thumbnail.jpg"
              lastAccessed="1d ago"
            />
            <NewSessionCard />
          </div>
        </div>
      </div>
    </div>
  );
}
