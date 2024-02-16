'use client';

import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InfoCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string;
}

export function InfoCard({
  hostIdentity,
  viewerIdentity,
  name,
  thumbnailUrl
}: InfoCardProps) {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="bg-indigo-600 p-2 rounded-md">
            <Pencil className="size-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize visibility
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
