import { db } from '@/lib/db';

export async function getUserByUsername(username: string) {
  return await db.user.findFirst({
    where: {
      username,
    },
  });
}
