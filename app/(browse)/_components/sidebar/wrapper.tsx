'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { useState, useEffect } from 'react';
import { ToggleSkeleton } from './toggle';
import { RecommendedSkeleton } from './recommended';
import { FollowingSkeleton } from './following';

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const { collapsed } = useSidebar((state) => state);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient)
    return (
      <aside className="fixed left-0 h-full w-[70px] lg:w-60 flex flex-col bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        'fixed left-0 h-full w-[70px] lg:w-60 flex flex-col bg-background border-r border-[#2D2E35] z-50',
        collapsed && 'lg:w-[70px]'
      )}
    >
      {children}
    </aside>
  );
}
