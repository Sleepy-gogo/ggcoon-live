import { db } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';

export async function getFollowedUsers() {
  try {
    const self = await getSelf();
    return await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocked: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });
  } catch {
    return [];
  }
}

export async function isFollowingUser(id: string) {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error('User not found');
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: self.id,
          followingId: id,
        },
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
}

export async function followUser(id: string) {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot follow yourself');
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: self.id,
        followingId: id,
      },
    },
  });

  if (existingFollow) {
    throw new Error('Already following');
  }

  return await db.follow.create({
    data: {
      followerId: self.id,
      followingId: id,
    },
    include: {
      follower: true,
      following: true,
    },
  });
}

export async function unfollowUser(id: string) {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot unfollow yourself');
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: self.id,
        followingId: id,
      },
    },
  });

  if (!existingFollow) {
    throw new Error('Non existing follow');
  }

  return await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });
}
