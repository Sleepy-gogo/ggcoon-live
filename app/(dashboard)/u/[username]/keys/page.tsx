import { UrlCard } from './components/url-card';
import { getSelf } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';
import { notFound } from 'next/navigation';
import { KeyCard } from './components/key-card';
import { GenerateModal } from './components/generate-modal';

async function KeysPage() {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    return notFound();
  }

  return (
    <div className="p-6 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <GenerateModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
}

export default KeysPage;
