import { UserRound, UserRoundX } from 'lucide-react';
import { Hint } from '@/components/hint';
import { cn } from '@/lib/utils';

interface ViewerCountProps {
  isLive: boolean;
  viewerCount: number;
}

export function ViewerCount({ isLive, viewerCount }: ViewerCountProps) {
  const label = isLive ? 'Viewers' : 'Stream is offline';
  const Icon = isLive ? UserRound : UserRoundX;

  return (
    <Hint label={label} side="top" asChild>
      <div
        className={cn(
          'font-semibold inline-flex gap-x-1 items-center text-xs text-muted-foreground',
          isLive && 'text-rose-500'
        )}
      >
        <Icon className="size-5" />
        <p className="pointer-events-none">
          {isLive ? viewerCount : 'Offline'}
        </p>
      </div>
    </Hint>
  );
}
