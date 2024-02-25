import { getResults } from '@/lib/search-service';
import { HeartCrack } from 'lucide-react';
import { ResultCard, ResultCardSkeleton } from './result-card';
import { Skeleton } from '@/components/ui/skeleton';

interface ResultsProps {
  term?: string;
}

export async function Results({ term }: ResultsProps) {
  const streams = await getResults(term);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Showing results for &quot;{term}&quot;
      </h2>
      {streams.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2">
          <HeartCrack className="size-8 text-muted-foreground" />
          <p className="text-md text-muted-foreground font-semibold">
            Couldn&apos;t find any results :(
          </p>
          <p className="text-sm text-muted-foreground">
            Please check your spelling and try again
          </p>
        </div>
      )}
      <div className="flex flex-col gap-y-4">
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
      <div className="flex flex-col gap-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
