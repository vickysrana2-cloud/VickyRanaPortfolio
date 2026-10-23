'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CommandMenu } from './command-menu';
import { BackToTop } from './back-to-top';
import { cn } from '@/lib/utils';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <main className={cn('flex-1 flex flex-col', !isHome && 'pt-16 sm:pt-20')}>
        {children}
      </main>
      <Footer />
      <CommandMenu isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      <BackToTop />
    </>
  );
}

