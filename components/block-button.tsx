import { onBlock, onUnblock } from '@/actions/block';
import {
  HoverableButton,
  HoverableButtonDefault,
  HoverableButtonHover
} from '@/components/hoverable-button';
import { PendingIcon } from '@/components/pending-icon';
import { BadgeHelp, BadgeMinus, Ban } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface BlockButtonProps {
  isBlocked: boolean;
  userId: string;
  isHost: boolean;
}

export function BlockButton({
  isBlocked,
  userId,
  isHost = false
}: BlockButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleBlock = () => {
    startTransition(async () => {
      onBlock(userId)
        .then((data) => {
          toast.success(`Blocked @${data?.blocked.username || 'guest'}`);
        })
        .catch(() => {
          toast.error('Failed to block user');
        });
    });
  };

  const handleUnblock = () => {
    startTransition(async () => {
      onUnblock(userId)
        .then((data) => {
          toast.success(`Unblocked @${data.blocked.username}`);
        })
        .catch(() => {
          toast.error('Failed to unblock user');
        });
    });
  };

  const blockButton = () => {
    if (isHost) {
      return toast.info('Cannot unfollow yourself');
    }
    if (isBlocked) {
      handleUnblock();
    } else {
      handleBlock();
    }
  };

  return (
    <HoverableButton
      variant="destructive-outline"
      className="group w-full lg:w-28"
      disabled={isPending || isHost}
      onClick={blockButton}
    >
      {isBlocked ? (
        <>
          <HoverableButtonHover>
            <BadgeHelp className="size-4 [fill:none] scale-110 group-hover:animate-in transition" />
            <p>Unblock</p>
          </HoverableButtonHover>
          <HoverableButtonDefault>
            <PendingIcon isPending={isPending} className="size-4">
              <Ban className="size-4 animate-scale-down" />
            </PendingIcon>
            <p>Blocked</p>
          </HoverableButtonDefault>
        </>
      ) : (
        <>
          <PendingIcon isPending={isPending} className="size-4">
            <BadgeMinus className="size-4 group-hover:scale-110 transition" />
          </PendingIcon>
          <p>Block</p>
        </>
      )}
    </HoverableButton>
  );
}
