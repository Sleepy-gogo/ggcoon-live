'use server';

import { Stream } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';

export async function updateStream(values: Partial<Stream>) {
  try {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);

    if (!stream) {
      throw new Error('Stream not found');
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      followersOnly: values.followersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const updatedStream = await db.stream.update({
      where: {
        userId: self.id,
      },
      data: validData,
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);
    return updatedStream;
  } catch (error) {
    throw new Error('Internal error');
  }
}
