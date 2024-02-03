import { useState } from 'react';

import { Play, Pause } from 'lucide-react';
import { Hint } from '@/components/hint';

interface PlayPauseControlProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function PlayPauseButton({ videoRef }: PlayPauseControlProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const Icon = isPlaying ? Pause : Play;
  const label = isPlaying ? 'Pause' : 'Play';

  const togglePlay = () => {
    if (videoRef.current) {
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        return videoRef.current.pause();
      }
      videoRef.current.play();
    }
  };

  return (
    <Hint label={label} side="top" asChild>
      <button
        className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        onClick={togglePlay}
      >
        <Icon className="size-5 fill-white" />
      </button>
    </Hint>
  );
}
