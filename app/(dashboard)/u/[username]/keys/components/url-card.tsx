import { Card } from '@/components/card';
import { CopyInput } from '@/components/copy-input';

interface UrlCardProps {
  value: string | null;
}

export function UrlCard({ value }: UrlCardProps) {
  return (
    <Card label="Server URL">
      <CopyInput value={value} />
    </Card>
  );
}
