'use client';

import * as React from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Code2, 
  Sparkles, 
  RotateCcw, 
  Check, 
  Copy, 
  ExternalLink,
  Layers, 
  ShieldCheck, 
  Zap, 
  Globe,
  AlertTriangle
} from 'lucide-react';
import { Template } from '@/types';
import { cn } from '@/lib/utils';
import { SLUG_TO_TEMPLATE_COMPONENT } from './TemplateRegistry';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class TemplateErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Template preview error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function TemplateDevicePreview({ 
  template,
  initialMode = 'live'
}: { 
  template: Template;
  initialMode?: 'live' | 'blueprint';
}) {
  const [device, setDevice] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = React.useState<'live' | 'blueprint'>(initialMode);
  const [copied, setCopied] = React.useState(false);
  const [key, setKey] = React.useState(0);
  const [iframeError, setIframeError] = React.useState(false);

  React.useEffect(() => {
    setIframeError(false);
  }, [device, key, template.slug]);

  const LiveComponent = SLUG_TO_TEMPLATE_COMPONENT[template.slug];
  const hasLiveComponent = Boolean(LiveComponent);

  const deviceDimensions = {
    desktop: '1280 × 820 px',
    tablet: '768 × 1024 px',
    mobile: '390 × 844 px'
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin + `/templates/${template.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReload = () => {
    setIframeError(false);
    setKey((prev) => prev + 1);
  };

  const previewUrl = `/templates/preview/${template.slug}`;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Floating Control Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 w-full max-w-4xl">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-full liquid-glass-pill shadow-lg border border-white/20">
          <button
            onClick={() => setDevice('desktop')}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300',
              device === 'desktop'
                ? 'liquid-btn-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
            )}
            aria-label="Desktop viewport"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300',
              device === 'tablet'
                ? 'liquid-btn-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
            )}
            aria-label="Tablet viewport"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300',
              device === 'mobile'
                ? 'liquid-btn-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
            )}
            aria-label="Mobile viewport"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* View Mode Toggle: Live Interactive App vs Architecture Blueprint */}
        <div className="flex items-center gap-1 p-1 rounded-full liquid-glass-pill shadow-lg border border-white/20">
          <button
            onClick={() => setViewMode('live')}
            disabled={!hasLiveComponent}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300',
              viewMode === 'live' && hasLiveComponent
                ? 'liquid-btn-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 dark:hover:bg-white/5'
            )}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive App</span>
            {hasLiveComponent && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </button>
          <button
            onClick={() => setViewMode('blueprint')}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300',
              viewMode === 'blueprint' || !hasLiveComponent
                ? 'liquid-btn-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
            )}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Blueprint & Specs</span>
          </button>
        </div>

        {/* Refresh Preview */}
        <button
          onClick={handleReload}
          className="p-2 rounded-full liquid-btn-secondary text-muted-foreground hover:text-foreground transition-all border border-white/15"
          title="Reload preview"
          aria-label="Reload preview"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Simulation Chassis Container */}
      <div className="w-full flex justify-center items-start overflow-hidden px-1 sm:px-4 py-2">
        <div
          className={cn(
            'transition-all duration-500 w-full overflow-hidden shadow-2xl relative',
            device === 'desktop' && 'max-w-5xl rounded-2xl liquid-glass-elevated border border-white/20',
            device === 'tablet' && 'w-[800px] max-w-full rounded-[36px] liquid-glass-elevated p-3 border-4 border-slate-700/60 bg-slate-900/90 shadow-2xl',
            device === 'mobile' && 'w-[414px] max-w-full rounded-[48px] liquid-glass-elevated p-3 border-4 sm:border-[6px] border-slate-800 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
          )}
        >
          {/* Mobile Chassis Top Notch / Dynamic Island */}
          {device === 'mobile' && (
            <div className="w-full flex items-center justify-between px-6 pt-1 pb-2 select-none">
              <span className="text-[11px] font-semibold text-foreground/80 font-mono">9:41</span>
              <div className="w-24 h-4.5 rounded-full bg-black/90 border border-white/15 flex items-center justify-end px-2 gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-foreground/80 font-mono">
                <span>5G</span>
                <span className="w-4 h-2.5 border border-foreground/80 rounded-xs inline-block relative after:content-[''] after:absolute after:inset-0.5 after:bg-foreground/80" />
              </div>
            </div>
          )}

          {/* Tablet Camera dot */}
          {device === 'tablet' && (
            <div className="w-full flex justify-center pb-2 select-none">
              <span className="w-2 h-2 rounded-full bg-black/60 border border-white/20 inline-block" />
            </div>
          )}

          {/* Desktop Browser Chrome top bar */}
          {device === 'desktop' && (
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 text-xs font-mono text-muted-foreground bg-muted/40 backdrop-blur-md select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-xs shadow-rose-500/50" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-xs shadow-amber-500/50" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-xs shadow-emerald-500/50" />
                <span className="ml-3 text-[11px] text-muted-foreground/80 hidden sm:inline truncate max-w-[200px]">
                  {template.title}
                </span>
              </div>

              {/* Simulated Omnibar */}
              <div className="flex items-center gap-2 px-4 py-1 rounded-full liquid-glass-subtle text-[11px] font-mono text-foreground/80 border border-white/20 max-w-sm truncate">
                <Globe className="w-3 h-3 text-indigo-400 shrink-0" />
                <span className="truncate">https://vickyrana.dev/templates/{template.slug}</span>
                <button
                  onClick={handleCopyLink}
                  className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy link"
                  aria-label="Copy link"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-0.5 text-muted-foreground hover:text-foreground transition-colors"
                  title="Open live preview in separate window"
                  aria-label="Open preview in new tab"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Resolution indicator */}
              <div className="text-[10px] text-muted-foreground font-mono tracking-wider">
                {deviceDimensions[device]}
              </div>
            </div>
          )}

          {/* Preview Viewport Canvas */}
          <div 
            className={cn(
              'w-full bg-background overflow-hidden transition-all relative',
              device === 'desktop' ? 'h-[640px]' : device === 'tablet' ? 'w-[768px] max-w-full mx-auto h-[740px] rounded-[24px]' : 'w-[390px] max-w-full mx-auto h-[680px] rounded-[36px]'
            )}
          >
            {viewMode === 'live' && hasLiveComponent ? (
              <TemplateErrorBoundary
                fallback={
                  <div className="p-8 text-center space-y-4 my-auto h-full flex flex-col justify-center items-center">
                    <p className="text-sm text-amber-400 font-semibold">
                      An unexpected error occurred in this viewport.
                    </p>
                    <button
                      onClick={handleReload}
                      className="px-4 py-2 rounded-xl liquid-btn-primary text-xs font-semibold flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reload Preview</span>
                    </button>
                  </div>
                }
              >
                <div className="w-full h-full relative">
                  {/* Iframe Error State (Never silently fall back to blueprint) */}
                  {iframeError ? (
                    <div className="absolute inset-0 z-30 bg-background flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 max-w-md">
                        <h4 className="text-base font-bold text-foreground">Live Template Failed to Load</h4>
                        <p className="text-xs text-muted-foreground">
                          The preview frame for "{template.title}" encountered a connection error.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={handleReload}
                          className="px-4 py-2 rounded-xl liquid-btn-primary text-xs font-semibold flex items-center gap-2"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retry Live Preview</span>
                        </button>
                        <button
                          onClick={() => setViewMode('blueprint')}
                          className="px-4 py-2 rounded-xl liquid-btn-secondary text-xs font-semibold flex items-center gap-2"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Switch to Blueprint Mode</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* The Isolated Preview Iframe */
                    <iframe
                      key={`${template.slug}-${key}`}
                      src={previewUrl}
                      title={`${template.title} Live Device Preview`}
                      className="w-full h-full border-0 block bg-background"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      onError={() => setIframeError(true)}
                    />
                  )}
                </div>
              </TemplateErrorBoundary>
            ) : (
              <div className="w-full h-full overflow-y-auto scrollbar-thin">
                <BlueprintCanvas template={template} />
              </div>
            )}
          </div>

          {/* Mobile Home Indicator bar */}
          {device === 'mobile' && (
            <div className="w-full flex justify-center pt-2 pb-1 select-none">
              <span className="w-32 h-1 rounded-full bg-white/40 inline-block" />
            </div>
          )}
        </div>
      </div>

      {/* Quick Specs Footnote */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Production Ready Sandbox</span>
        </span>
        <span>•</span>
        <span>Framework: <strong className="text-foreground">{template.framework}</strong></span>
        <span>•</span>
        <span>Styling: <strong className="text-foreground">{template.styling}</strong></span>
        <span>•</span>
        <span>Viewport: <strong className="text-indigo-400">{deviceDimensions[device]}</strong></span>
      </div>
    </div>
  );
}

function BlueprintCanvas({ template }: { template: Template }) {
  return (
    <div className="p-6 sm:p-8 min-h-full bg-gradient-to-b from-background via-muted/15 to-background flex flex-col justify-between space-y-8">
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-500/25">
              {template.title[0]}
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground tracking-tight">
                {template.title}
              </h4>
              <p className="text-[11px] text-muted-foreground font-mono">
                {template.category} Architecture System
              </p>
            </div>
          </div>
          <span className="text-[11px] px-3 py-1 rounded-full liquid-badge text-purple-400 font-mono">
            {template.version}
          </span>
        </div>

        {/* Hero Tagline & Description */}
        <div className="p-5 sm:p-6 rounded-2xl liquid-glass space-y-3">
          <span className="text-[10px] uppercase tracking-widest font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 inline-block">
            Architectural Overview
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            {template.tagline}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {template.description}
          </p>
        </div>

        {/* Key Architectural Highlights */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Built-in Systems & Modules</span>
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {template.features.map((feat, i) => (
              <div 
                key={i} 
                className="p-3.5 rounded-xl liquid-glass-subtle flex items-start gap-2.5 text-xs text-foreground/90 transition-transform hover:scale-101 border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shrink-0 mt-1 shadow-xs" />
                <span className="leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Tag Pills */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tech Stack Foundation</span>
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-3 py-1 rounded-lg liquid-glass-subtle text-foreground/80 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Blueprint Footer */}
      <div className="pt-6 border-t border-border/50 flex flex-wrap items-center justify-between text-xs text-muted-foreground font-mono gap-3">
        <span>Engineered with {template.framework}</span>
        <span>Standard AA Responsive Breakpoints</span>
      </div>
    </div>
  );
}
