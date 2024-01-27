import { UserAvatar } from '@/components/user-avatar';
import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import { Actions } from './_components/actions';
import { isBlockedByUser, userIsBlockedBy } from '@/lib/block-service';

interface UserPageProps {
  params: {
    username: string;
  };
}

async function UserPage({ params: { username } }: UserPageProps) {
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }
  const pageBlocked = await userIsBlockedBy(user.id);

  if (pageBlocked) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  return (
    <div>
      <h1>{user?.username}</h1>
      <p>{user?.bio}</p>
      <p>Follows: {`${isFollowing}`}</p>
      <UserAvatar
        username={user?.username}
        imageUrl={user?.imageUrl}
        size="lg"
      />
      <Actions
        isFollowing={isFollowing}
        isBlocked={isBlocked}
        userId={user?.id}
      />
    </div>
  );
}

export default UserPage;
