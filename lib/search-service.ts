import { db } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';

export async function getResults(term?: string) {
  let userId;

  try {
    userId = (await getSelf()).id;
  } catch {
    userId = '';
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
        },
        OR: [
          {
            name: {
              contains: term,
              mode: 'insensitive'
            }
          },
          {
            user: {
              username: {
                contains: term,
                mode: 'insensitive'
              }
            }
          }
        ]
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true
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
      where: {
        OR: [
          {
            name: {
              contains: term,
              mode: 'insensitive'
            }
          },
          {
            user: {
              username: {
                contains: term,
                mode: 'insensitive'
              }
            }
          }
        ]
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true
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
