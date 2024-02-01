import { Skeleton } from '@/components/ui/skeleton';
import { CardSkeleton } from '@/components/card';

function KeysLoading() {
  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <Skeleton className="h-9 w-[200px]" />
        <Skeleton className="h-9 w-[100px]" />
      </div>
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

export default KeysLoading;
