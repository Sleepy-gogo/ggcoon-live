'use client';

import { FollowButton } from '@/components/follow-button';
import { BlockButton } from '@/components/block-button';

interface ActionsProps {
  isFollowing: boolean;
  isBlocked: boolean;
  userId: string;
}

export function Actions({ isFollowing, isBlocked, userId }: ActionsProps) {
  return (
    <>
      <FollowButton isFollowing={isFollowing} userId={userId} />
      <BlockButton isBlocked={isBlocked} userId={userId} />
    </>
  );
}
