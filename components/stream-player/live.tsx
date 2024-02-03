'use client';

import { TrackReference } from '@livekit/components-react';
import { useRef } from 'react';
import { Controls } from './controls';

interface LiveProps {
  tracks: TrackReference[];
}

export function Live({ tracks }: LiveProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  tracks.forEach((track) => {
    if (videoRef.current) {
      track.publication.track?.attach(videoRef.current);
    }
  });

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" autoPlay />

      <Controls wrapperRef={wrapperRef} videoRef={videoRef} />
    </div>
  );
}
