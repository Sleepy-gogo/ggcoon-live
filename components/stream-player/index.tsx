'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';
import { Video } from './video';
import { Loading } from './loading';

interface StreamPlayerProps {
  stream: Stream;
  user: User & {
    stream: Stream | null;
  };
  isFollowing: boolean;
}

export function StreamPlayer({ stream, user, isFollowing }: StreamPlayerProps) {
  const { name, identity, token } = useViewerToken(user.id);

  if (!token || !name || !identity)
    return (
      <div className="aspect-video border-b">
        <Loading />
      </div>
    );

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full"
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  );
}
