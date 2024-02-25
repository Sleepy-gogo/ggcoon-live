import Link from 'next/link';
import { User } from '@prisma/client';

import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';
import { LiveBadge } from '@/components/live-badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ResultCardProps {
  data: {
    name: string;
    user: User;
    thumbnailUrl: string | null;
    isLive: boolean;
  };
}

export async function ResultCard({ data }: ResultCardProps) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4 group">
        <Thumbnail
          src={data.thumbnailUrl || ''}
          fallback={data.user.imageUrl}
          username={data.user.username}
          isLive={data.isLive}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col text-sm overflow-hidden">
              <p className="truncate font-semibold group-hover:text-indigo-400 transition">
                {data.name}
              </p>
              <p className="truncate text-muted-foreground">
                {data.user.username}
              </p>
            </div>
            {data.isLive && <LiveBadge />}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ResultCardSkeleton() {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    </div>
  );
}
