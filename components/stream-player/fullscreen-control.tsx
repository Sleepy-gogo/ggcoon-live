'use client';

import { Maximize2, Minimize } from 'lucide-react';
import { Hint } from '@/components/hint';

interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenControl({
  isFullscreen,
  onToggle,
}: FullscreenControlProps) {
  const Icon = isFullscreen ? Minimize : Maximize2;
  const label = isFullscreen ? 'Minimize' : 'Fullscreen';

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} side="top" asChild>
        <button
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
          onClick={onToggle}
        >
          <Icon className="size-5" />
        </button>
      </Hint>
    </div>
  );
}
