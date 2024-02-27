import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { resetIngresses } from '@/actions/ingress';

export async function POST(req: Request) {
  const WEBHOOK_SECTET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECTET) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestap = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestap || !svix_signature) {
    return new Response('Missing headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const webhook = new Webhook(WEBHOOK_SECTET);

  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestap,
      'svix-signature': svix_signature
    }) as WebhookEvent;
  } catch (error) {
    console.error('Error verifying webhook: ', error);
    return new Response('Invalid signature', { status: 400 });
  }

  const eventType = event.type;

  switch (eventType) {
    case 'user.created':
      try {
        await db.user.create({
          data: {
            externalUserId: payload.data.id,
            username: payload.data.username,
            imageUrl: payload.data.image_url,
            stream: {
              create: {
                name: `@${payload.data.username}'s Livestream`
              }
            }
          }
        });
      } catch {
        return new Response('User already exists', { status: 400 });
      }
      break;
    case 'user.deleted':
      try {
        await db.user.delete({
          where: {
            externalUserId: payload.data.id
          }
        });
      } catch {
        return new Response('User not found', { status: 404 });
      }
      break;
    case 'user.updated':
      try {
        await resetIngresses(payload.data.id);

        await db.user.update({
          where: {
            externalUserId: payload.data.id
          },
          data: {
            username: payload.data.username,
            imageUrl: payload.data.image_url
          }
        });
      } catch {
        return new Response('User not found', { status: 404 });
      }
    default:
      break;
  }

  return new Response('OK', { status: 200 });
}
