import { getBlockedUsers } from '@/lib/block-service';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { formatDistanceToNow } from 'date-fns';

async function CommunityPage() {
  const data = await getBlockedUsers();

  const formattedData = data.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    blockedAt: formatDistanceToNow(new Date(block.createdAt), {
      addSuffix: true
    })
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}

export default CommunityPage;
