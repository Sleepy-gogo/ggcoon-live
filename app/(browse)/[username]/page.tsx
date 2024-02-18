import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import { isBlockedByUser, userIsBlockedBy } from '@/lib/block-service';
import { StreamPlayer } from '@/components/stream-player';

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

  const streamOptions = {
    thumbnailUrl: user.stream?.thumbnailUrl || '',
    streamName: user.stream?.name || '',
    isChatEnabled: user.stream?.isChatEnabled || false,
    isChatDelayed: user.stream?.isChatDelayed || false,
    followersOnly: user.stream?.followersOnly || false
  };

  const userWithoutStream = {
    ...user,
    stream: null
  };

  return (
    <StreamPlayer
      user={userWithoutStream}
      isFollowing={isFollowing}
      isBlocked={isBlocked}
      streamOptions={streamOptions}
    />
  );
}

export default UserPage;
