'use client';

import { Button } from '@/components/ui/button';
import { onFollow, onUnfollow } from '@/actions/follow';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Heart, HeartCrack } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export function Actions({ isFollowing, userId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(async () => {
      onFollow(userId)
        .then((data) => {
          toast.success(`Followed @${data.following.username}`);
        })
        .catch(() => {
          toast.error('Failed to follow user');
        });
    });
  };

  const handleUnfollow = () => {
    startTransition(async () => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`Unfollowed @${data.following.username}`);
        })
        .catch(() => {
          toast.error('Failed to unfollow user');
        });
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="primary"
      className={cn(
        'group gap-x-2',
        isFollowing && 'bg-rose-500 hover:bg-rose-600'
      )}
    >
      {isFollowing ? (
        <>
          <HeartCrack className="size-4 group-hover:scale-110 transition" />
          <p>Unfollow</p>
        </>
      ) : (
        <>
          <Heart className="size-4 group-hover:[fill:white] group-hover:scale-110 transition" />
          <p>Follow</p>
        </>
      )}
    </Button>
  );
}
