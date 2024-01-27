import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LiveBadge } from '@/components/live-badge';

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'size-8',
      lg: 'size-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
}

export function UserAvatar({
  username,
  imageUrl,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) {
  const canShowBadge = isLive && showBadge;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive ? 'ring-2 ring-rose-500 border border-background' : '',
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} alt={username} className="object-cover" />
        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export function UserAvatarSkeleton({ size }: UserAvatarSkeletonProps) {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />;
}
