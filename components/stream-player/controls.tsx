import { useState } from 'react';
import { FullscreenControl } from './fullscreen-control';
import { useEventListener } from 'usehooks-ts';

interface ControlsProps {
  wrapperRef: React.RefObject<HTMLDivElement>;
}

export function Controls({ wrapperRef }: ControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 transition-all">
      <div className="absolute bottom-0 flex h-12 w-full items-center justify-between bg-gradient-to-t from-gray-950/50 from-10% px-4">
        <div></div>
        <FullscreenControl
          isFullscreen={isFullscreen}
          onToggle={toggleFullscreen}
        />
      </div>
    </div>
  );
}
