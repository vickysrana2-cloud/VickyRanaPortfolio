import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
import { gamesData } from '@/data/games';
import { templatesData } from '@/data/templates';

// ⚠️ IMPORTANT: Set NEXT_PUBLIC_SITE_URL in your .env.local (and Vercel env vars)
// e.g. NEXT_PUBLIC_SITE_URL=https://vickyrana.vercel.app
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://portfolio.example.com';

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // ─── 1. Static / navigation pages ────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                         priority: 1.0, changeFrequency: 'weekly'  as const },
    { url: `${BASE_URL}/projects`,           priority: 0.9, changeFrequency: 'weekly'  as const },
    { url: `${BASE_URL}/experience`,         priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/games`,              priority: 0.8, changeFrequency: 'weekly'  as const },
    { url: `${BASE_URL}/templates`,          priority: 0.8, changeFrequency: 'weekly'  as const },
    { url: `${BASE_URL}/achievements`,       priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/contact`,            priority: 0.7, changeFrequency: 'yearly'  as const },
  ].map((r) => ({ ...r, lastModified: now }));

  // ─── 2. Project detail pages ──────────────────────────────────────────────
  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: project.publishedAt ? new Date(project.publishedAt) : now,
    changeFrequency: 'monthly',
    priority: project.featured ? 0.85 : 0.7,
  }));

  // ─── 3. Game detail pages ─────────────────────────────────────────────────
  const gameRoutes: MetadataRoute.Sitemap = gamesData.map((game) => ({
    url: `${BASE_URL}/games/${game.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  // ─── 4. Template detail pages ─────────────────────────────────────────────
  const templateRoutes: MetadataRoute.Sitemap = templatesData.map((template) => ({
    url: `${BASE_URL}/templates/${template.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...gameRoutes,
    ...templateRoutes,
  ];
}
