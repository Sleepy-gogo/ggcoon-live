import { Loader2 } from 'lucide-react';

interface LoadingProps {
  label?: string;
}

export function Loading({ label }: LoadingProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-zinc-950/60 rounded-md">
      <Loader2 className="animate-spin size-10 text-muted-foreground" />
      {!!label && (
        <p className="text-center text-muted-foreground capitalize">{label}</p>
      )}
    </div>
  );
}
