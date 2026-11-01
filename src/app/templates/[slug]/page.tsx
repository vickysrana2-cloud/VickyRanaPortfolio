import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { templatesData } from '@/data/templates';
import { TemplateDevicePreview } from '@/components/templates/template-device-preview';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';
import { Github } from '@/components/icons';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TechBadge } from '@/components/ui/tech-icon';

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return templatesData.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = templatesData.find((t) => t.slug === slug);
  if (!template) return { title: 'Template Not Found | VickyRanaDev' };

  return {
    title: `${template.title} | Website Template Details | VickyRanaDev`,
    description: template.description,
  };
}

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = templatesData.find((t) => t.slug === slug);

  if (!template) {
    notFound();
  }

  // Find related templates in same category or adjacent
  const relatedTemplates = templatesData
    .filter((t) => t.slug !== template.slug && (t.category === template.category || t.featured))
    .slice(0, 3);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Back button */}
      <ScrollReveal direction="down" duration={0.6}>
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-btn-secondary text-sm font-medium text-muted-foreground hover:text-foreground transition-all group border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All 40+ Templates</span>
          </Link>

          <span className="text-xs font-mono text-muted-foreground">
            Category: <strong className="text-foreground">{template.category}</strong>
          </span>
        </div>
      </ScrollReveal>

      {/* Main Header Card */}
      <ScrollReveal direction="scale" duration={0.8}>
        <div className="relative rounded-3xl liquid-glass-elevated p-6 sm:p-10 mb-12 shadow-2xl border border-white/20">
          <div className="glass-reflection-highlight" />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full liquid-badge text-purple-400 border border-purple-500/30">
                {template.category} Architecture
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full liquid-glass-subtle text-muted-foreground border border-white/20">
                {template.version}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Production Verified</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              {template.title}
            </h1>

            <p className="text-lg text-purple-400 font-medium">
              {template.tagline}
            </p>

            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
              {template.fullDescription}
            </p>

            {/* Tech Stack Icons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {template.tags.map((tag) => (
                <TechBadge key={tag} name={tag} size="sm" />
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {template.demoUrl && (
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl liquid-btn-primary text-sm font-semibold shadow-md transition-all hover:scale-102"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Live Demo</span>
                </a>
              )}
              {template.sourceUrl && (
                <a
                  href={template.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl liquid-btn-secondary text-foreground text-sm font-medium transition-colors border border-white/10"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Interactive Responsive Viewport Preview */}
      <ScrollReveal direction="up" delay={0.1} duration={0.8}>
        <section className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Interactive Responsive Demonstration
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Test the live component or architectural blueprint across Desktop, Tablet, and Mobile viewports
            </p>
          </div>
          <TemplateDevicePreview template={template} initialMode="live" />
        </section>
      </ScrollReveal>

      {/* Feature Architecture and Implementation Specifications */}
      <ScrollReveal direction="up" delay={0.1} duration={0.8}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/50">
          {/* Features list */}
          <div className="p-6 sm:p-8 rounded-3xl liquid-glass liquid-glass-interactive space-y-5 border border-white/10">
            <div className="glass-reflection-highlight" />
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Architectural Features Included</span>
            </h3>
            <div className="space-y-3.5">
              {template.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Specifications */}
          <div className="p-6 sm:p-8 rounded-3xl liquid-glass liquid-glass-interactive space-y-5 border border-white/10">
            <div className="glass-reflection-highlight" />
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Technical Specifications</span>
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl liquid-glass-subtle flex items-center justify-between border border-white/5">
                <span className="text-muted-foreground">Core Framework</span>
                <span className="font-mono font-semibold text-foreground">{template.framework}</span>
              </div>
              <div className="p-3.5 rounded-xl liquid-glass-subtle flex items-center justify-between border border-white/5">
                <span className="text-muted-foreground">Styling Engine</span>
                <span className="font-mono font-semibold text-foreground">{template.styling}</span>
              </div>
              <div className="p-3.5 rounded-xl liquid-glass-subtle flex items-center justify-between border border-white/5">
                <span className="text-muted-foreground">Responsive Breakpoints</span>
                <span className="font-mono font-semibold text-emerald-400">Desktop, Tablet, Mobile</span>
              </div>
              <div className="p-3.5 rounded-xl liquid-glass-subtle flex items-center justify-between border border-white/5">
                <span className="text-muted-foreground">WCAG Accessibility</span>
                <span className="font-mono font-semibold text-foreground">Standard AA Compliant</span>
              </div>
              <div className="p-3.5 rounded-xl liquid-glass-subtle border border-white/5 space-y-2">
                <span className="text-muted-foreground block text-xs">Included Stack & Libraries</span>
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.map((tag) => (
                    <TechBadge key={tag} name={tag} size="sm" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Related Templates Section */}
      {relatedTemplates.length > 0 && (
        <ScrollReveal direction="up" delay={0.1} duration={0.8}>
          <section className="mt-16 pt-12 border-t border-border/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-indigo-400" />
                  <span>Related Commercial Templates</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Explore additional blueprints in {template.category} and featured industry niches
                </p>
              </div>
              <Link
                href="/templates"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>View all templates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTemplates.map((rel) => (
                <div
                  key={rel.id}
                  className="p-5 rounded-2xl liquid-glass border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full liquid-badge text-purple-400">
                      {rel.category}
                    </span>
                    <h4 className="text-lg font-bold text-foreground mt-2 tracking-tight">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-muted-foreground">{rel.version}</span>
                    <Link
                      href={`/templates/${rel.slug}`}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </div>
  );
}
