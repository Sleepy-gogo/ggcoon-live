'use client';

import { ConnectionState, Track } from 'livekit-client';
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks
} from '@livekit/components-react';
import { Offline } from './offline';
import { Loading } from './loading';
import { Live } from './live';

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

export function Video({ hostName, hostIdentity }: VideoProps) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <Offline username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <Loading label={connectionState} />;
  } else {
    content = <Live tracks={tracks} />;
  }

  return (
    <div className="bg-black/40 border-b">
      <div className="aspect-video max-h-[calc(100vh*0.75)] mx-auto">
        {content}
      </div>
    </div>
  );
}

export function VideoSkeleton() {
  return (
    <div className="bg-black/40 border-b">
      <div className="aspect-video mx-auto max-h-[700px] rounded-md">
        <Loading />
      </div>
    </div>
  );
}
