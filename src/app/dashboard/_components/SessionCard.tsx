"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    setFormattedDate(
      formatDistanceToNow(new Date(lastAccessed), { addSuffix: true })
    );
  }, [lastAccessed]);

  if (!mounted) {
    return null;
  }

  return (
    <Link
      href={`/dashboard/session/${id}`}
      className="block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
    >
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={title}
          width={640}
          height={360}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHSIeHx8dIigjJCUmJSQkIiYoLTEwLS4xKSEoMC0vMSw5OTk5OTk5OTk5OTn/2wBDARUXFyAeIB4gHh4gIiAoJCAoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <progress
              value={progress}
              max={100}
              className="w-full h-1 [&::-webkit-progress-bar]:bg-black/20 [&::-webkit-progress-value]:bg-[#ff6b00] [&::-moz-progress-bar]:bg-[#ff6b00]"
            />
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-medium text-white mb-1 md:mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-white/70">
          Last accessed {formattedDate}
        </p>
      </div>
    </Link>
  );
}
