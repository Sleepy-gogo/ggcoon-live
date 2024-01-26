import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export function Logo() {
  return (
    <Link href="/" className="shrink-0">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full px-1.5 py-3">
          <Image src="/RaccoonIcon.svg" alt="logo" width={45} height={45} />
        </div>
        <div className={cn('text-white hidden lg:block', poppins.className)}>
          <p className="text-lg font-semibold">GGCoon.TV</p>
          <p className="text-xs text-muted-foreground">The chat is waiting</p>
        </div>
      </div>
    </Link>
  );
}
