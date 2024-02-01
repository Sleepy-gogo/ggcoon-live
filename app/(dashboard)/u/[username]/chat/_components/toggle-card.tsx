'use client';

import { Card } from '@/components/card';
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
    <Card label={label}>
      <Switch disabled={isPending} onCheckedChange={onChange} checked={value} />
    </Card>
  );
}
