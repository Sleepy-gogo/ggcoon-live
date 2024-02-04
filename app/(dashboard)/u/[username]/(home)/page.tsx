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
    isChatEnabled: user.stream.isChatEnabled,
    isChatDelayed: user.stream.isChatDelayed,
    followersOnly: user.stream.followersOnly,
  };

  return (
    <div className="h-full">
      <StreamPlayer user={user} streamOptions={streamOptions} isFollowing />
    </div>
  );
}

export default CreatorPage;