import { Button } from '@/components/ui/button';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';

function NotFoundPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl flex items-center justify-center gap-2">
        <HeartCrack className="size-8" /> 404
      </h1>
      <p>Couldn&apos;t find the page you were looking for :(</p>
      <Button variant="outline">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}

export default NotFoundPage;
