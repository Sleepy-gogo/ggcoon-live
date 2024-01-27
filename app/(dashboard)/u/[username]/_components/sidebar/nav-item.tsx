import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface NavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  active: boolean;
}

export function NavItem({ label, href, icon: Icon, active }: NavItemProps) {
  const { collapsed } = useDashboardSidebar((state) => state);
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full h-12 text-sm',
        collapsed ? 'justify-center' : 'justify-start',
        active && 'bg-accent text-primary'
      )}
      asChild
    >
      <Link href={href}>
        <Icon className="size-4" />
        {!collapsed && <p>{label}</p>}
      </Link>
    </Button>
  );
}

export function NavItemSkeleton() {
  return (
    <li className="flex items-center px-2 py-1">
      <Skeleton className="h-12 w-full rounded-md" />
    </li>
  );
}
