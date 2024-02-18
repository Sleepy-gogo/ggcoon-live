import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';

export async function getSelf() {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("You're not logged in");
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function getSelfByUsername(
  username: string,
  includeStream: boolean
) {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("You're not logged in");
  }

  const user = await db.user.findUnique({
    where: {
      username
    },
    include: {
      stream: includeStream,
      _count: {
        select: {
          followers: true
        }
      }
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.externalUserId !== self.id) {
    throw new Error('Not authorized');
  }

  return user;
}
