import { Skeleton } from '@/components/ui/skeleton';

interface CardProps {
  label: string;
  children: React.ReactNode;
}

export function Card({ label, children }: CardProps) {
  return (
    <div className="rounded-xl bg-muted p-6 max-w-5xl mr-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-y-2">
        <p className="font-semibold text-center sm:text-left shrink-0 min-w-0 text-balance">
          {label}
        </p>
        <div className="w-full sm:w-1/2">{children}</div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return <Skeleton className="p-9 w-full rounded-md max-w-5xl mr-auto" />;
}
