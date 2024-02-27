'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { BlockButton } from '@/components/block-button';
import { UserAvatar } from '@/components/user-avatar';
import { Button } from '@/components/ui/button';

type Block = {
  userId: string;
  imageUrl: string;
  username: string;
  blockedAt: string;
};

export const columns: ColumnDef<Block>[] = [
  {
    header: ' ',
    cell: ({ row: { index } }) => (
      <p className="text-muted-foreground ml-2 text-center">{index + 1}</p>
    )
  },
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({
      row: {
        original: { username, imageUrl }
      }
    }) => (
      <div className="flex items-center gap-x-2">
        <UserAvatar username={username} imageUrl={imageUrl} />
        <p>{username}</p>
      </div>
    )
  },
  {
    accessorKey: 'blockedAt',
    header: 'Blocked'
  },
  {
    id: 'actions',
    cell: ({
      row: {
        original: { userId }
      }
    }) => (
      <div className="w-full text-right pr-4">
        <BlockButton isBlocked userId={userId} />
      </div>
    )
  }
];
