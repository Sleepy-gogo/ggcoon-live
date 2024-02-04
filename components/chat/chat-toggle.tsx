'use client';

import { useChatbox } from '@/store/use-chatbox';

import { ArrowRightFromLine, ArrowLeftFromLine } from 'lucide-react';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatToggleProps {
  className?: string;
}

export function ChatToggle({ className }: ChatToggleProps) {
  const { collapsed, onToggle } = useChatbox();
  const label = collapsed ? 'Expand' : 'Collapse';
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  return (
    <Hint label={label} side="bottom" asChild>
      <Button
        className={cn(
          'bg-transparent p-2 hover:bg-white/10 rounded-lg absolute hidden lg:block',
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
