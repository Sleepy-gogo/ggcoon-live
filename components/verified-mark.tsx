import { Check } from 'lucide-react';
import { Hint } from '@/components/hint';

export function VerifiedMark() {
  return (
    <Hint label="Verified" side="top" asChild>
      <div className="bg-indigo-600 p-0.5 flex items-center justify-center rounded-full size-[18px] border border-indigo-950">
        <Check className="text-white" />
      </div>
    </Hint>
  );
}
