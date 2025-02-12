import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface SessionCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  progress: number;
  lastAccessed: string;
}

export default function SessionCard({
  id,
  title,
  thumbnailUrl,
  progress,
  lastAccessed,
}: SessionCardProps) {
  return (
    <Link
      href={`/dashboard/session/${id}`}
      className="block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
    >
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div
              className="h-full bg-[#ff6b00]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-white/70">
          Last accessed {formatDistanceToNow(new Date(lastAccessed))} ago
        </p>
      </div>
    </Link>
  );
}
