'use client';

import { Volume1, Volume2, VolumeX } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface VolumeControlProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const Icons = {
  muted: VolumeX,
  quiet: Volume1,
  loud: Volume2,
};

export function VolumeControl({ videoRef }: VolumeControlProps) {
  const [volume, setVolume] = useState(50);
  const volumeLevel = volume === 0 ? 'muted' : volume < 50 ? 'quiet' : 'loud';
  const label = volumeLevel === 'muted' ? 'Unmute' : 'Mute';
  const Icon = Icons[volumeLevel];

  const handleChange = (value: number[]) => {
    setVolume(+value[0]);
    if (videoRef.current) {
      videoRef.current.volume = +value[0] / 100;
      videoRef.current.muted = value[0] === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      setVolume(volume === 0 ? 50 : 0);
      videoRef.current.muted = volume !== 0;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} side="top" asChild>
        <button
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
          onClick={toggleMute}
        >
          <Icon className="size-5" />
        </button>
      </Hint>
      <Slider
        className="sm:w-[8rem] cursor-pointer"
        value={[volume]}
        onValueChange={handleChange}
        min={0}
        max={100}
        step={1}
      />
    </div>
  );
}
