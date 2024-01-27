'use client';

import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const { collapsed, setCollapsed } = useDashboardSidebar((state) => state);
  const matches = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    setCollapsed(matches);
  }, [setCollapsed, matches]);

  return (
    <div
      className={cn('flex-1 ml-[70px] lg:ml-60', collapsed && 'lg:ml-[70px]')}
    >
      {children}
    </div>
  );
}
