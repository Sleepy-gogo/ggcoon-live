import Image from 'next/image';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <div className="bg-white text-black rounded-full p-1.5">
        <Image src="/crowned-racc.svg" alt="logo" width={80} height={80} />
      </div>
      <div className={cn('flex flex-col items-center', poppins.className)}>
        <p className="text-xl font-semibold">GGCoon.live</p>
        <p className="text-sm text-muted-foreground">The chat is waiting.</p>
      </div>
    </div>
  );
}
