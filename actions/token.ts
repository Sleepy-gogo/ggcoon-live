'use server';

import { v4 } from 'uuid';
import { AccessToken } from 'livekit-server-sdk';

import { getSelf } from '@/lib/auth-service';
import { getUserById } from '@/lib/user-service';
import { userIsBlockedBy } from '@/lib/block-service';

export async function createViewerToken(hostId: string) {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const username = `guest-${Math.floor(Math.random() * 1000)}`;
    self = {
      id,
      username,
    };
  }

  const host = await getUserById(hostId);

  if (!host) {
    throw new Error('Host not found');
  }

  const isBlocked = await userIsBlockedBy(hostId);

  if (isBlocked) {
    throw new Error('User is blocked');
  }

  const isHost = host.id === self.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : `viewer-${self.id}`,
      name: self.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: false,
  });

  return await Promise.resolve(token.toJwt());
}
