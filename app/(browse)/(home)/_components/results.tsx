import { getStreams } from '@/lib/stream-service';
import { HeartCrack } from 'lucide-react';
import { ResultCard, ResultCardSkeleton } from './result-card';
import { Skeleton } from '@/components/ui/skeleton';

export async function Results() {
  const streams = await getStreams();
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Streams you may like</h2>
      {streams.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2">
          <HeartCrack className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Couldn&apos;t find any streams right now :(
          </p>
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {streams.map((stream) => (
          <ResultCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-72 mb-4" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
