'use client';

import { Suspense } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import { User } from '@prisma/client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { useChatbox } from '@/store/use-chatbox';
import { cn } from '@/lib/utils';

import { Video, VideoSkeleton } from './video';
import { Loading } from './loading';
import { Chat, ChatSkeleton } from '@/components/chat';
import { ChatToggle } from '@/components/chat/chat-toggle';

interface StreamPlayerProps {
  user: User;
  streamOptions: {
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    followersOnly: boolean;
  };
  isFollowing: boolean;
}

export function StreamPlayer({
  user,
  streamOptions,
  isFollowing,
}: StreamPlayerProps) {
  const { name, identity, token } = useViewerToken(user.id);
  const { collapsed } = useChatbox((state) => state);

  if (!token || !name || !identity) return <StreamPlayerSkeleton />;

  return (
    <>
      {collapsed && (
        <ChatToggle className="hidden lg:block fixed top-[100px] right-2 z-50 text-muted-foreground/80 hover:text-primary" />
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'grid grid-cols-1 gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full',
          collapsed && 'lg:grid-cols-2'
        )}
      >
        <div className="h-1/2 lg:h-auto col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
        <div className={cn('col-span-1', collapsed && 'lg:hidden')}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            streamOptions={streamOptions}
            isFollowing={isFollowing}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

export function StreamPlayerSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
}
