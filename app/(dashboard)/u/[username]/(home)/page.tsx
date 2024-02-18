import { StreamPlayer } from '@/components/stream-player';
import { getSelfByUsername } from '@/lib/auth-service';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface CreatorPageProps {
  params: {
    username: string;
  };
}

async function CreatorPage({ params: { username } }: CreatorPageProps) {
  const externalUser = await currentUser();
  const user = await getSelfByUsername(username, true);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    redirect('/');
  }

  const streamOptions = {
    thumbnailUrl: user.stream.thumbnailUrl || '',
    streamName: user.stream.name,
    isChatEnabled: user.stream.isChatEnabled,
    isChatDelayed: user.stream.isChatDelayed,
    followersOnly: user.stream.followersOnly
  };

  const userWithoutStream = { ...user, stream: null };

  return (
    <div className="h-full">
      <StreamPlayer
        user={userWithoutStream}
        streamOptions={streamOptions}
        isFollowing
        isBlocked={false}
      />
    </div>
  );
}

export default CreatorPage;
