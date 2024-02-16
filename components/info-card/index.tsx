'use client';

import { Pencil } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { InfoField } from './info-field';
import Image from 'next/image';
import { InfoModal } from './info-modal';

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
          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <InfoField title="Name">
            <p className="text-sm font-semibold">{name}</p>
          </InfoField>
          <InfoField title="Thumbnail">
            {!!thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image
                  src={thumbnailUrl}
                  alt={`${name} thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </InfoField>
        </div>
      </div>
    </div>
  );
}
