'use client';

import { useChatbox, ChatVariant } from '@/store/use-chatbox';

import { Users, MessageSquareText } from 'lucide-react';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CommunityToggleProps {
  className?: string;
}

export function CommunityToggle({ className }: CommunityToggleProps) {
  const { variant, setVariant } = useChatbox();

  const isChat = variant === ChatVariant.CHAT;

  const label = isChat ? 'Community' : 'Chat';
  const Icon = isChat ? Users : MessageSquareText;

  const onToggle = () => {
    setVariant(isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT);
  };

  return (
    <Hint label={label} side="bottom" asChild>
      <Button
        className={cn(
          'bg-transparent p-2 hover:bg-white/10 rounded-lg',
          className
        )}
        onClick={onToggle}
        variant="ghost"
      >
        <Icon className="size-4" />
      </Button>
    </Hint>
  );
}
