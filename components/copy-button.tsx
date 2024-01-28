'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  value: string;
}

export function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const Icon = isCopied ? Check : Copy;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onCopy}
      disabled={!value || isCopied}
    >
      <Icon className="size-4" />
    </Button>
  );
}
