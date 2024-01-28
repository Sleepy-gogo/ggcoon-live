import { getSelf } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';
import { notFound } from 'next/navigation';
import { ToggleCard } from './_components/toggle-card';

async function ChatPage() {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="followersOnly"
          label="Only followers can chat"
          value={stream.followersOnly}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat messages"
          value={stream.isChatDelayed}
        />
      </div>
    </div>
  );
}

export default ChatPage;
