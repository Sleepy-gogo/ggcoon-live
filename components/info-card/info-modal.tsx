'use client';

import { useState, useTransition, useRef, ElementRef, useEffect } from 'react';
import { updateStream } from '@/actions/stream';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UploadDropzone } from '@/lib/uploadthing';
import { Hint } from '../hint';
import { Trash } from 'lucide-react';
import Image from 'next/image';

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string;
}

export function InfoModal({
  initialName,
  initialThumbnailUrl
}: InfoModalProps) {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name, thumbnailUrl })
        .then(() => {
          toast.success('Stream updated!');
        })
        .catch(() => {
          toast.error('Failed to update stream. Try again later.');
        });
    });
  };

  useEffect(() => {
    if (!isPending) {
      closeRef.current?.click();
    }
  }, [isPending]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your stream information</DialogTitle>
        </DialogHeader>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Stream name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              disabled={false}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl">Thumbnail</Label>
            {!!thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" side="left" asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={isPending}
                      onClick={() => {
                        setThumbnailUrl('');
                        router.refresh();
                      }}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="size-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnailUrl}
                  alt="Stream thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <UploadDropzone
                endpoint="thumbnailUploader"
                appearance={{
                  label: {
                    color: '#FFF'
                  },
                  allowedContent: {
                    color: '#FFF'
                  }
                }}
                onClientUploadComplete={(res) => {
                  setThumbnailUrl(res?.[0]?.url);
                  router.refresh();
                }}
              />
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button
                type="button"
                ref={closeRef}
                variant="outline"
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
