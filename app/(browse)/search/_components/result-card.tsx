import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail';
import { Skeleton } from '@/components/ui/skeleton';
import { VerifiedMark } from '@/components/verified-mark';
import { User } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface ResultCardProps {
  data: {
    id: string;
    name: string;
    user: User;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
  };
}

export function ResultCard({ data }: ResultCardProps) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full flex flex-col sm:flex-row gap-x-4 gap-y-2 group">
        <div className="relative h-36 w-64">
          <Thumbnail
            src={data.thumbnailUrl || ''}
            fallback={data.user.imageUrl}
            username={data.user.username}
            isLive={data.isLive}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg group-hover:text-indigo-400 transition">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function ResultCardSkeleton() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-x-4 gap-y-2">
      <div className="relative h-36 w-64">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="size-6 rounded-full" />
        </div>
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
