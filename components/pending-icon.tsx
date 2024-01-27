import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

interface PendingIconProps {
  children: React.ReactNode;
  isPending: boolean;
  className?: string;
}

export function PendingIcon({
  children,
  isPending,
  className,
}: PendingIconProps) {
  if (!isPending) {
    return <>{children}</>;
  }

  return <Loader className={cn('animate-spin', className)} />;
}
