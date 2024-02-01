import { WifiOff } from 'lucide-react';

interface OfflineProps {
  username: string;
}

export function Offline({ username }: OfflineProps) {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center bg-zinc-950/60 rounded-md">
      <WifiOff className="size-10 text-muted-foreground" />
      <p className="text-center text-muted-foreground">
        @{username} is offline.
      </p>
    </div>
  );
}
