import { db } from '@/lib/db';
import { getSelf } from './auth-service';

export async function getStreamByUserId(userId: string) {
  return db.stream.findUnique({
    where: {
      userId
    }
  });
}

export async function getStreams() {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocked: {
              some: {
                blockedId: userId
              }
            }
          }
        }
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true
      },
      orderBy: [
        {
          isLive: 'desc'
        },
        {
          updatedAt: 'desc'
        }
      ]
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true
      },
      orderBy: [
        {
          isLive: 'desc'
        },
        {
          updatedAt: 'desc'
        }
      ]
    });
  }
  return streams;
}
