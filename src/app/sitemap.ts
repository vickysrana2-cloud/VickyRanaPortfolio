import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
import { gamesData } from '@/data/games';
import { templatesData } from '@/data/templates';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://portfolio.example.com';

  const staticRoutes = [
    '',
    '/projects',
    '/games',
    '/templates',
    '/experience',
    '/achievements',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const projectRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const gameRoutes = gamesData.map((game) => ({
    url: `${baseUrl}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const templateRoutes = templatesData.map((template) => ({
    url: `${baseUrl}/templates/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...gameRoutes, ...templateRoutes];
}
