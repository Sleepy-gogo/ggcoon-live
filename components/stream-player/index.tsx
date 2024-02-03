'use client';

import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { useChat } from '@/store/use-chat';
import { cn } from '@/lib/utils';

import { Video } from './video';
import { Loading } from './loading';
import { Chat } from '@/components/chat';

interface StreamPlayerProps {
  stream: Stream;
  user: User & {
    stream: Stream | null;
  };
  isFollowing: boolean;
}

export function StreamPlayer({ stream, user, isFollowing }: StreamPlayerProps) {
  const { name, identity, token } = useViewerToken(user.id);
  const { collapsed } = useChat((state) => state);

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
        className={cn(
          'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full',
          collapsed && 'lg:grid-cols-2'
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat />
        </div>
      </LiveKitRoom>
    </>
  );
}
