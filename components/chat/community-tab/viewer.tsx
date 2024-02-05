'use client';

import { toast } from 'sonner';
import { useTransition } from 'react';
import { onBlock } from '@/actions/block';
import { cn, stringToColor } from '@/lib/utils';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Crown, MinusCircle, UserRound } from 'lucide-react';

interface ViewerProps {
  hostName: string;
  viewerName: string;
  participantName: string | undefined;
  participantIdentity: string;
}

export function Viewer({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: ViewerProps) {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || '');
  const isSelf = participantName === viewerName;
  const isHost = hostName === viewerName;

  const handleBlock = () => {
    if (!participantName || isSelf || isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success('User blocked'))
        .catch(() => toast.error('Failed to block user'));
    });
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
        isPending && 'animate-pulse pointer-events-none'
      )}
    >
      <div className="flex items-center gap-2">
        {isHost ? (
          <Crown className="size-4 text-amber-400 fill-amber-400" />
        ) : (
          <UserRound className="size-4 text-primary-400 fill-primary-400" />
        )}
        <p style={{ color }}>{participantName}</p>
      </div>
      {isHost && !isSelf && (
        <Hint label="Block" side="top" asChild>
          <Button
            onClick={handleBlock}
            variant="ghost"
            disabled={isPending}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="size-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
}
