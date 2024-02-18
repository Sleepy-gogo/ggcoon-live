import { db } from '@/lib/db';

export async function getUserByUsername(username: string) {
  return await db.user.findFirst({
    where: {
      username
    },
    include: {
      stream: true,
      _count: {
        select: {
          followers: true
        }
      }
    }
  });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: {
      id
    },
    include: {
      stream: true
    }
  });
}
