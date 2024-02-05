'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParticipants } from '@livekit/components-react';
import { UserRoundMinus } from 'lucide-react';
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';

interface CommunityTabProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

export function CommunityTab({
  viewerName,
  hostName,
  isHidden,
}: CommunityTabProps) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);
  const participants = useParticipants();

  if (isHidden)
    return (
      <div className="flex flex-1 items-center gap-2 justify-center bg-zinc-950/10 text-muted-foreground">
        <p className="text-sm font-semibold">Community is disabled.</p>
        <UserRoundMinus className="size-4" />
      </div>
    );

  return (
    <div className="p-4">
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Search users"
        className="border-white/10"
      />
      <ScrollArea className="h-full gap-y-2 mt-4">
        <p className="text-center text-muted-foreground text-sm hidden last:block">
          No search results.
        </p>
      </ScrollArea>
    </div>
  );
}
