'use client';

import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  const { collapsed, setCollapsed } = useSidebar((state) => state);
  const matches = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    setCollapsed(!matches);
  }, [matches, setCollapsed]);

  return (
    <div className={cn('flex-1 ml-[70px]', !collapsed && 'lg:ml-60')}>
      {children}
    </div>
  );
}

export default Container;
