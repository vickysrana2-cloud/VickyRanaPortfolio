'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CommandMenu } from './command-menu';
import { BackToTop } from './back-to-top';
import { cn } from '@/lib/utils';

// Inner component that uses usePathname — must be wrapped in <Suspense>
// by the parent so Next.js can prerender the shell without blocking.
function LayoutShellInner({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isPreview = pathname?.startsWith('/templates/preview');

  if (isPreview) {
    return (
      <main className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
        {children}
      </main>
    );
  }

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

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    }>
      <LayoutShellInner>{children}</LayoutShellInner>
    </React.Suspense>
  );
}

