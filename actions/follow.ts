'use server';

import { revalidatePath } from 'next/cache';
import { followUser, unfollowUser } from '@/lib/follow-service';

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);

    revalidatePath(`/`);

    if (followedUser) {
      revalidatePath(`/u/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
}

export async function onUnfollow(id: string) {
  try {
    const unfollowedUser = await unfollowUser(id);
    revalidatePath(`/`);

    if (unfollowedUser) {
      revalidatePath(`/u/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
}
