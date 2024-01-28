'use client';

import { toast } from 'sonner';
import { useTransition } from 'react';

import { updateStream } from '@/actions/stream';

import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';

type FieldTypes = 'isChatEnabled' | 'followersOnly' | 'isChatDelayed';

interface ToggleCardProps {
  field: FieldTypes;
  value: boolean;
  label: string;
}

export function ToggleCard({ field, value, label }: ToggleCardProps) {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success('Chat settings updated'))
        .catch(() => toast.error('Something went wrong. Try again later'));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6 max-w-5xl mr-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-y-2">
        <p className="font-semibold text-center sm:text-left shrink-0 min-w-0 text-balance">
          {label}
        </p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            onCheckedChange={onChange}
            checked={value}
          />
        </div>
      </div>
    </div>
  );
}

export function ToggleCardSkeleton() {
  return (
    <Skeleton className="p-9 rounnded-xl w-full rounded-md max-w-5xl mr-auto" />
  );
}
