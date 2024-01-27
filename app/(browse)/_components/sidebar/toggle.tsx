'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';

export function Toggle() {
  const { collapsed, onToggle } = useSidebar((state) => state);

  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>
          <Hint label={label} side="bottom" asChild>
            <Button
              className="h-auto p-2 ml-auto"
              variant="ghost"
              onClick={onToggle}
            >
              <ArrowLeftFromLine className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label={label} side="bottom" asChild>
            <Button className="h-auto p-2" variant="ghost" onClick={onToggle}>
              <ArrowRightFromLine className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
}

export function ToggleSkeleton() {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="size-6" />
    </div>
  );
}
