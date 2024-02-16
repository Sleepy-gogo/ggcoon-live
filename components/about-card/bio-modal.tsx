'use client';

import { useState, useTransition, useRef, ElementRef, useEffect } from 'react';
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
import { updateUser } from '@/actions/user';
import { Textarea } from '@/components/ui/textarea';

interface BioModalProps {
  initialValue: string;
}

export function BioModal({ initialValue }: BioModalProps) {
  const [isPending, startTransition] = useTransition();
  const [bio, setBio] = useState(initialValue);
  const closeRef = useRef<ElementRef<'button'>>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio })
        .then(() => {
          toast.success('Bio updated successfully!');
        })
        .catch(() => {
          toast.error('Failed to update bio. Try again later.');
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
          <DialogTitle>Edit your biography</DialogTitle>
        </DialogHeader>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="bio">New Bio</Label>
            <Textarea
              id="bio"
              placeholder="Describe yourself to the public!"
              onChange={(e) => {
                setBio(e.target.value);
              }}
              value={bio}
              disabled={false}
              className="resize-none"
            />
          </div>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button
                ref={closeRef}
                type="button"
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
