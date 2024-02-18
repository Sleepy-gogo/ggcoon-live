'use server';

import { revalidatePath } from 'next/cache';
import { followUser, unfollowUser } from '@/lib/follow-service';

export async function onFollow(id: string) {
  const followedUser = await followUser(id);

  revalidatePath(`/`);

  if (followedUser) {
    revalidatePath(`/u/${followedUser.following.username}`);
  }

  return followedUser;
}

export async function onUnfollow(id: string) {
  const unfollowedUser = await unfollowUser(id);
  revalidatePath(`/`);

  if (unfollowedUser) {
    revalidatePath(`/u/${unfollowedUser.following.username}`);
  }

  return unfollowedUser;
}
