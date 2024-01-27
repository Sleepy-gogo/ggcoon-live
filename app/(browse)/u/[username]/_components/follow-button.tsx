import { onFollow, onUnfollow } from '@/actions/follow';
import {
  HoverableButton,
  HoverableButtonDefault,
  HoverableButtonHover,
} from '@/components/hoverable-button';
import { PendingIcon } from '@/components/pending-icon';
import { Heart, HeartCrack } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface FollowButtonProps {
  isFollowing: boolean;
  userId: string;
}

export function FollowButton({ isFollowing, userId }: FollowButtonProps) {
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

  const followButton = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <HoverableButton
      variant={isFollowing ? 'bipolar' : 'primary'}
      className="group w-32"
      disabled={isPending}
      onClick={followButton}
    >
      {isFollowing ? (
        <>
          <HoverableButtonHover>
            <HeartCrack className="size-4 [fill:none] scale-110 group-hover:animate-in transition" />
            <p>Unfollow</p>
          </HoverableButtonHover>
          <HoverableButtonDefault>
            <PendingIcon isPending={isPending} className="size-4">
              <Heart className="size-4 [fill:white] animate-scale-down" />
            </PendingIcon>
            <p>Following</p>
          </HoverableButtonDefault>
        </>
      ) : (
        <>
          <PendingIcon isPending={isPending} className="size-4">
            <Heart className="size-4 group-hover:[fill:white] group-hover:scale-110 transition" />
          </PendingIcon>
          <p>Follow</p>
        </>
      )}
    </HoverableButton>
  );
}
