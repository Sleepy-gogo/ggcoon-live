import { Skeleton } from '@/components/ui/skeleton';
import { CardSkeleton } from '@/components/card';

function ChatLoading() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <Skeleton className="h-9 w-[200px]" />
      </div>
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

export default ChatLoading;
