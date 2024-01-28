import { db } from '@/lib/db';

export async function getStreamByUserId(userId: string) {
  return db.stream.findUnique({
    where: {
      userId,
    },
  });
}
