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
      <div className="group flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1.5 group-hover:scale-105 transition">
          <Image src="/crowned-racc.svg" alt="logo" width={45} height={45} />
        </div>
        <div className={cn('text-white hidden lg:block', poppins.className)}>
          <p className="text-lg font-semibold">GGCoon.live</p>
          <p className="text-xs text-muted-foreground">Creator tools</p>
        </div>
      </div>
    </Link>
  );
}
