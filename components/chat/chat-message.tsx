import { format } from 'date-fns';
import { cn, stringToColor } from '@/lib/utils';
import { ReceivedChatMessage } from '@livekit/components-react';

interface ChatMessageProps {
  message: ReceivedChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const color = stringToColor(message.from?.name || '');
  const isGuest = message.from?.name?.startsWith('guest');
  return (
    <div className="flex gap-2 p-1 rounded-md hover:bg-white/5">
      <p className="text-sm text-white/40">
        {format(message.timestamp, 'HH:MM')}
      </p>
      <p className="text-sm grow">
        <a
          href={isGuest ? '#' : `/${message.from?.name}`}
          className={cn(
            'truncate font-semibold whitespace-nowrap',
            !isGuest && 'cursor-pointer'
          )}
          style={{ color }}
        >
          {message.from?.name}
        </a>
        <span className="text-sm break-words">: {message.message}</span>
      </p>
    </div>
  );
}
