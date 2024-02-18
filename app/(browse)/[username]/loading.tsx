import { StreamPlayerSkeleton } from '@/components/stream-player';

function LoadingPage() {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
}

export default LoadingPage;
