'use client';

import { FullscreenControl } from './fullscreen-control';
import { VolumeControl } from './volume-control';
import { PlayPauseButton } from './play-pause-control';
import { ChatToggleButton } from './chat-toggle-control';
import { useMediaQuery } from 'usehooks-ts';

interface ControlsProps {
  wrapperRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function Controls({ wrapperRef, videoRef }: ControlsProps) {
  const matches = useMediaQuery('(max-width: 1024px)');
  return (
    <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 transition-all">
      <div className="absolute bottom-0 flex h-12 w-full items-center justify-between bg-gradient-to-t from-gray-950/50 from-10% px-4">
        <div className="flex items-center gap-2">
          <PlayPauseButton videoRef={videoRef} />
          <VolumeControl videoRef={videoRef} />
        </div>
        <div className="flex items-center gap-2">
          {!matches && <ChatToggleButton />}
          <FullscreenControl wrapperRef={wrapperRef} />
        </div>
      </div>
    </div>
  );
}
