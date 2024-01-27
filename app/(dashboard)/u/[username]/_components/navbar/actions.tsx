import { ClerkLoading, UserButton } from '@clerk/nextjs';

import { UserAvatarSkeleton } from '@/components/user-avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export async function Actions() {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        className="text-muted-foreground hover:text-primary"
        variant="ghost"
        asChild
      >
        <Link href="/">
          <LogOut className="size-5" />
          Exit
        </Link>
      </Button>
      <ClerkLoading>
        <UserAvatarSkeleton size="default" />
      </ClerkLoading>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
