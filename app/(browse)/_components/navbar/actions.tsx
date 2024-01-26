import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export async function Actions() {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex gap-x-4 items-center">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="size-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
        </div>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
