'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { SLUG_TO_TEMPLATE_COMPONENT } from '@/components/templates/TemplateRegistry';

export function TemplatePreviewClient() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const LiveComponent = SLUG_TO_TEMPLATE_COMPONENT[slug];

  if (!LiveComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center bg-background text-foreground font-sans">
        <div className="max-w-md space-y-2 p-6 rounded-2xl border border-border bg-card/50">
          <h2 className="text-lg font-bold">Template Component Not Found</h2>
          <p className="text-xs text-muted-foreground">
            No live interactive component is registered for template slug:{' '}
            <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">{slug}</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground selection:bg-indigo-500/20 selection:text-indigo-500">
      <LiveComponent />
    </div>
  );
}

