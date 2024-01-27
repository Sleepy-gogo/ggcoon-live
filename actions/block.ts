'use server';

import { blockUser, unblockUser } from '@/lib/block-service';
import { revalidatePath } from 'next/cache';

export async function onBlock(id: string) {
  try {
    const blockedUser = await blockUser(id);

    revalidatePath(`/`);

    if (blockedUser) {
      revalidatePath(`/u/${blockedUser.blocked.username}`);
    }

    return blockedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
}

export async function onUnblock(id: string) {
  try {
    const unblockedUser = await unblockUser(id);

    revalidatePath(`/`);

    if (unblockedUser) {
      revalidatePath(`/u/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
}
