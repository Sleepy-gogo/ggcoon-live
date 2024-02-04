import { ReceivedChatMessage } from '@livekit/components-react';

import { MessageSquareOff, MessageSquareHeart } from 'lucide-react';
import { ChatMessage } from './chat-message';

interface MessageListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export function MessageList({ messages, isHidden }: MessageListProps) {
  if (isHidden || !messages || !messages.length) {
    const Icon = isHidden ? MessageSquareOff : MessageSquareHeart;
    return (
      <div className="flex flex-1 items-center gap-2 justify-center bg-zinc-950/10 text-muted-foreground">
        <p className="text-sm font-semibold">
          {isHidden ? 'Chat is disabled.' : 'Welcome to the chat!'}
        </p>
        <Icon className="size-4" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse gap-y-1 overflow-y-auto p-3">
      {messages.map((message) => (
        <ChatMessage
          key={`message-${message.from}-${message.timestamp}`}
          message={message}
        />
      ))}
    </div>
  );
}
