import { useMemo } from 'react';
import { Info } from 'lucide-react';
import { Hint } from '@/components/hint';

interface ChatExtraProps {
  isDelayed: boolean;
  followersOnly: boolean;
}

export function ChatExtra({ isDelayed, followersOnly }: ChatExtraProps) {
  const label = useMemo(() => {
    let label = '';

    if (followersOnly) {
      label += 'Only followers can chat. ';
    }

    if (isDelayed) {
      label += 'Slow mode active.';
    }

    return label;
  }, [isDelayed, followersOnly]);

  const text = useMemo(() => {
    if (!followersOnly && !isDelayed) {
      return null;
    }

    let text = '';

    if (followersOnly) {
      text += 'Followers only';
    }

    if (isDelayed) {
      text += followersOnly ? ' and s' : 'S';
      text += 'low mode';
    }

    return text;
  }, [isDelayed, followersOnly]);

  if (!text) return null;

  return (
    <Hint label={label} side="top" align="start">
      <div className="p-2 text-muted-foreground bg-white/5 border-white/10 w-[calc(100%-2.75rem)] rounded-t-md flex items-center gap-x-2">
        <Info className="size-4" />
        <p className="font-semibold text-xs">{text}</p>
      </div>
    </Hint>
  );
}
