import { ReceivedChatMessage } from '@livekit/components-react';

interface MessageListProps {
  messages: ReceivedChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  return <div>MessageList</div>;
}
