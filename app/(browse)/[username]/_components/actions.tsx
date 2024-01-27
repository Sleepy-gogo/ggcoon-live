'use client';

import { FollowButton } from './follow-button';
import { BlockButton } from './block-button';

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
