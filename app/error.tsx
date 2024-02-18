'use client';

import { Button } from '@/components/ui/button';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';

function ErrorPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-3xl flex items-center justify-center gap-2">
        <HeartCrack className="size-7" /> Something went wrong...
      </h1>
      <p>Please try again later</p>
      <Button variant="outline">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
