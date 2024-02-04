import { Skeleton } from '@/components/ui/skeleton';
import { ChatToggle } from './chat-toggle';

export function ChatHeader() {
  return (
    <div className="relative p-3 border-b">
      <ChatToggle className="left-2 top-1/2 -translate-y-1/2" />
      <p className="font-semibold text-primary text-center">Stream Chat</p>
    </div>
  );
}

export function ChatHeaderSkeleton() {
  return (
    <div className="p-4 border-b hidden md:block">
      <Skeleton className="h-7 w-28 mx-auto border-b" />
    </div>
  );
}
