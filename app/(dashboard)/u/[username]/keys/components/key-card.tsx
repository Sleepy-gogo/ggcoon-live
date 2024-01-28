'use client';

import { Card } from '@/components/card';
import { CopyInput } from '@/components/copy-input';

interface KeyCardProps {
  value: string | null;
}

export function KeyCard({ value }: KeyCardProps) {
  return (
    <Card label="Stream Key">
      <CopyInput type="password" value={value} />
    </Card>
  );
}
