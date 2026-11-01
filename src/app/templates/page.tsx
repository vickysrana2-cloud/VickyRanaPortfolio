import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TemplatesClient } from './TemplatesClient';

export const metadata: Metadata = {
  title: 'Commercial Website Templates & Architectural UI Kits',
  description: 'Explore over 40 production-grade, responsive website templates built with Next.js, React, and TypeScript. Interactive multi-device preview testing for Desktop, Tablet, and Mobile.',
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner - Server-rendered for instant paint & SEO */}
      <ScrollReveal direction="down" duration={0.8}>
        <div className="relative mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
            Commercial Website Templates
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Over 40 production-grade, highly responsive web application templates engineered with Next.js, React, TypeScript, and modern styling. Test live responsive viewports across Desktop, Tablet, and Mobile.
          </p>

          {/* Highlight Stats Bar - Static Server Rendered */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 p-3 rounded-2xl liquid-glass border border-white/10">
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground">40+</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Real Production Templates</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-indigo-400">9</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Industry Sectors</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-purple-400">3</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Interactive Viewports</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Mobile Responsive</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Interactive Templates Client */}
      <TemplatesClient />
    </div>
  );
}
