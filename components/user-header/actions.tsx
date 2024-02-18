'use client';

import { FollowButton } from '@/components/follow-button';
import { Skeleton } from '@/components/ui/skeleton';
import { BlockButton } from '../block-button';

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isBlocked: boolean;
  isHost: boolean;
}

export function Actions({
  hostIdentity,
  isFollowing,
  isBlocked,
  isHost
}: ActionsProps) {
  return (
    <div className="flex flex-col justify-end items-center lg:flex-row gap-2 w-full">
      <FollowButton
        isFollowing={isFollowing}
        userId={hostIdentity}
        isHost={isHost}
      />
      <BlockButton
        isBlocked={isBlocked}
        userId={hostIdentity}
        isHost={isHost}
      />
    </div>
  );
}

export function ActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-32" />;
}
