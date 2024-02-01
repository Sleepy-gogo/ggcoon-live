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
  const user = await getSelfByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    redirect('/');
  }

  return (
    <div className="md:p-6 h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
}

export default CreatorPage;
