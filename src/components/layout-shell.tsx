'use client';

import * as React from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CommandMenu } from './command-menu';
import { BackToTop } from './back-to-top';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = React.useState(false);

  return (
    <>
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <CommandMenu isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      <BackToTop />
    </>
  );
}
