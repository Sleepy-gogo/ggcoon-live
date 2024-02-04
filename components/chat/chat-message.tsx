import { format } from 'date-fns';
import { stringToColor } from '@/lib/utils';
import { ReceivedChatMessage } from '@livekit/components-react';

interface ChatMessageProps {
  message: ReceivedChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const color = stringToColor(message.from?.name || '');
  return (
    <div className="flex gap-2 p-1 rounded-md hover:bg-white/5">
      <p className="text-sm text-white/40">
        {format(message.timestamp, 'HH:MM')}
      </p>
      <p className="text-sm grow">
        <span
          className="truncate font-semibold whitespace-nowrap"
          style={{ color }}
        >
          {message.from?.name}
        </span>
        <span className="text-sm break-all">: {message.message}</span>
      </p>
    </div>
  );
}
