'use client';

import { FollowButton } from '@/components/follow-button';
import { Skeleton } from '@/components/ui/skeleton';

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export function Actions({ hostIdentity, isFollowing, isHost }: ActionsProps) {
  return (
    <FollowButton
      isFollowing={isFollowing}
      userId={hostIdentity}
      isHost={isHost}
    />
  );
}

export function ActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-32" />;
}
