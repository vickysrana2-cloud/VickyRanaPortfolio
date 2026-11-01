import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Code2 } from 'lucide-react';
import { ProjectsClient } from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Featured Projects & Production Architecture',
  description: 'Explore full-stack web applications, scalable REST APIs, system designs, and microservices built with Next.js, TypeScript, NestJS, Spring Boot, MongoDB Atlas, and MySQL.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner - Server Rendered for SEO & instant static paint */}
      <ScrollReveal direction="down" duration={0.8}>
        <div className="relative mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-indigo-500 dark:text-indigo-400 text-xs font-semibold mb-4">
            <Code2 className="w-4 h-4" />
            <span>Production Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Featured Projects & Architecture
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Real full-stack applications, scalable APIs, and system designs built with Next.js, TypeScript, NestJS, Spring Boot, MongoDB Atlas, and MySQL.
          </p>
        </div>
      </ScrollReveal>

      {/* Interactive Client Component for Filtering, Search, and Sort */}
      <ProjectsClient />
    </div>
  );
}
