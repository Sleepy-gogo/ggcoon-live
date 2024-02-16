import { VerifiedMark } from '@/components/verified-mark';
import { BioModal } from './bio-modal';

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string;
  followersCount: number;
}

export function AboutCard({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followersCount
}: AboutCardProps) {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followersLabel = followersCount === 1 ? 'follower' : 'followers';

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </h2>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-white">{followersCount}</span>{' '}
          {followersLabel}
        </div>
        <p className="text-sm">
          {bio ||
            "User prefers to remain silent, we don't know about him/her either!"}
        </p>
      </div>
    </div>
  );
}
