import { Skeleton } from '@/components/ui/skeleton';
import { ToggleCardSkeleton } from './_components/toggle-card';

function ChatLoading() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <Skeleton className="h-9 w-[200px]" />
      </div>
      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  );
}

export default ChatLoading;
