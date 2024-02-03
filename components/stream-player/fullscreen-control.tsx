'use client';

import { useState } from 'react';
import { Maximize2, Minimize } from 'lucide-react';
import { Hint } from '@/components/hint';
import { useEventListener } from 'usehooks-ts';

interface FullscreenControlProps {
  wrapperRef: React.RefObject<HTMLDivElement>;
}

export function FullscreenControl({ wrapperRef }: FullscreenControlProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const Icon = isFullscreen ? Minimize : Maximize2;
  const label = isFullscreen ? 'Minimize' : 'Fullscreen';

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      wrapperRef.current?.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const fullscreenActive = document.fullscreenElement !== null;
    setIsFullscreen(fullscreenActive);
  };

  useEventListener('fullscreenchange', handleFullscreenChange, wrapperRef);

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} side="top" asChild>
        <button
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
          onClick={toggleFullscreen}
        >
          <Icon className="size-5" />
        </button>
      </Hint>
    </div>
  );
}
