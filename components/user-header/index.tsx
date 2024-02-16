'use client';

import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';
import { VerifiedMark } from '@/components/verified-mark';
import {
  useParticipants,
  useRemoteParticipant
} from '@livekit/components-react';
import { ViewerCount } from './viewer-count';
import { Actions, ActionsSkeleton } from './actions';
import { Skeleton } from '@/components/ui/skeleton';

interface UserHeaderProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
}

export function UserHeader({
  hostName,
  hostIdentity,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name
}: UserHeaderProps) {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const viewerCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          <ViewerCount isLive={isLive} viewerCount={viewerCount} />
        </div>
      </div>
      <Actions
        isHost={isHost}
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
      />
    </div>
  );
}

export function UserHeaderSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
}
