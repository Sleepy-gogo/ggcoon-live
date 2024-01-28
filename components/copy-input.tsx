'use client';

import { useState } from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { CopyButton } from '@/components/copy-button';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface CopyInputProps {
  value: string | null;
  type?: InputProps['type'];
}

export function CopyInput({ value, type = 'text' }: CopyInputProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full flex items-center gap-x-2">
      <div className="relative">
        <Input
          value={value ?? ''}
          type={type === 'password' && show ? 'text' : type}
          disabled
          placeholder="Not generated"
        />
        {type === 'password' && !!value && (
          <Button
            variant="ghost"
            disabled={!value}
            className="absolute text-white/50 right-1 top-1/2 -translate-y-1/2"
            size="sm"
            onClick={() => setShow(!show)}
          >
            {!show ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </Button>
        )}
      </div>
      <CopyButton value={value ?? ''} />
    </div>
  );
}
