'use client';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

export function Toggle() {
  const { collapsed, onToggle } = useDashboardSidebar();

  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
          <p className="font-semibold text-primary">Dashboard</p>
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
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} side="bottom" asChild>
            <Button onClick={onToggle} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
}
