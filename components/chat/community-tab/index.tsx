'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParticipants } from '@livekit/components-react';
import { UserRoundMinus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { Viewer } from './viewer';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';

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

  const participantsFilter = useMemo(() => {
    const unDuped = participants.reduce((acc, participant) => {
      const hostViewerIdentity = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostViewerIdentity)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return unDuped.filter((participant) =>
      participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  }, [participants, debouncedValue]);

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
        {participantsFilter.map((participant) => (
          <Viewer
            key={participant.identity}
            viewerName={viewerName}
            hostName={hostName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
