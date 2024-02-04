'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Send } from 'lucide-react';
import { Hint } from '../hint';
import { ChatExtra } from './chat-extra';

interface ChatFormProps {
  value: string;
  streamOptions: {
    isChatDelayed: boolean;
    followersOnly: boolean;
  };
  isHidden: boolean;
  isFollowing: boolean;
  onChangeAction: (value: string) => void;
  onSubmitAction: () => void;
}

export function ChatForm({
  value,
  streamOptions,
  isHidden,
  isFollowing,
  onChangeAction,
  onSubmitAction,
}: ChatFormProps) {
  const [delayBlocked, setDelayBlocked] = useState(false);

  const { isChatDelayed, followersOnly } = streamOptions;
  const chatBlocked =
    isHidden || delayBlocked || (followersOnly && !isFollowing);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || chatBlocked) return;

    if (isChatDelayed && !delayBlocked) {
      setDelayBlocked(true);
      setTimeout(() => {
        setDelayBlocked(false);
        onSubmitAction();
      }, 3000);
      return;
    }

    onSubmitAction();
  };

  if (isHidden) return null;

  return (
    <form onSubmit={onSubmit} className="flex flex-col p-3">
      <ChatExtra isDelayed={isChatDelayed} followersOnly={followersOnly} />
      <div className="flex gap-1 items-center w-full">
        <Input
          value={value}
          onChange={(e) => onChangeAction(e.target.value)}
          placeholder="Message"
          disabled={chatBlocked}
          className={cn(
            'border-white/10 h-10',
            followersOnly && 'rounded-t-none border-t-0'
          )}
        />
        <Hint label="Send" side="top" asChild>
          <Button
            className="size-10"
            type="submit"
            variant="primary"
            size="sm"
            disabled={chatBlocked}
          >
            <Send className="size-4 sm:size-6" />
          </Button>
        </Hint>
      </div>
    </form>
  );
}

export function ChatFormSkeleton() {
  return (
    <div className="flex w-full items-center p-3 gap-1">
      <Skeleton className="w-full h-10" />
      <Skeleton className="size-10" />
    </div>
  );
}
