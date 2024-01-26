import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';

export async function getSelf() {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error('Not logged in');
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
