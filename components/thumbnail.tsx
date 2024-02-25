import Image from 'next/image';
import { UserAvatar } from '@/components/user-avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface ThumbnailProps {
  src: string;
  fallback: string;
  username: string;
  isLive: boolean;
}

export function Thumbnail({ src, fallback, username, isLive }: ThumbnailProps) {
  let content;

  if (!src) {
    content = (
      <div className="relative bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md overflow-hidden">
        <Image
          src={fallback}
          alt={username}
          fill
          className="absolute h-full w-full top-0 left-0 object-cover blur-md opacity-70"
        />
        <UserAvatar
          size="lg"
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        alt={username}
        fill
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md"
      />
    );
  }

  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"></div>
      {content}
    </div>
  );
}

export function ThumbnailSkeleton() {
  return (
    <div className="aspect-video rounded-xl ">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
