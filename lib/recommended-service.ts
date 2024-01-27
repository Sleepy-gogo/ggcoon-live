import { db } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';

export async function getRecommended() {
  let userId;

  try {
    userId = (await getSelf()).id;
  } catch (error) {
    userId = '';
  }

  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      AND: [
        {
          NOT: {
            id: userId,
          },
        },
        {
          NOT: {
            followers: {
              some: {
                followerId: userId,
              },
            },
          },
        },
        {
          NOT: {
            blocked: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      ],
    },
  });

  return users;
}
