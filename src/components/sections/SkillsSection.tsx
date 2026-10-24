'use client';

import { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';
import { skillsData } from '@/data/skills';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '../animations/ScrollReveal';
import { getTechMeta } from '../ui/tech-icon';

/* -----------------------------------------------------------------------------
   Category colour themes.
   Every category gets its own hue, so the "All" view is colourful and each tab
   feels distinct. Tailwind needs full class names, so they are written out.
   `rgb` is space-separated so it can be used inside rgb(var(--rgb) / alpha).
----------------------------------------------------------------------------- */
type Theme = {
  grad: string; // gradient used for borders, lines, active tab
  text: string; // accent text colour
  hoverText: string; // skill-name colour on card hover
  blob: string; // soft ambient glow
  dot: string; // small marker dot
  tabHover: string; // inactive tab hover border
  tabActive: string; // active tab fill
  rgb: string; // "r g b"
};

const THEMES: Theme[] = [
  {
    grad: 'from-indigo-500 via-violet-500 to-fuchsia-500',
    text: 'text-indigo-600 dark:text-indigo-400',
    hoverText: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
    blob: 'bg-indigo-500/25',
    dot: 'bg-indigo-500',
    tabHover: 'hover:border-indigo-500/40',
    tabActive: 'from-indigo-500 to-violet-500 shadow-indigo-500/30',
    rgb: '99 102 241',
  },
  {
    grad: 'from-emerald-500 via-teal-500 to-cyan-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    hoverText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    blob: 'bg-emerald-500/25',
    dot: 'bg-emerald-500',
    tabHover: 'hover:border-emerald-500/40',
    tabActive: 'from-emerald-500 to-teal-500 shadow-emerald-500/30',
    rgb: '16 185 129',
  },
  {
    grad: 'from-amber-500 via-orange-500 to-rose-500',
    text: 'text-amber-600 dark:text-amber-400',
    hoverText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    blob: 'bg-amber-500/25',
    dot: 'bg-amber-500',
    tabHover: 'hover:border-amber-500/40',
    tabActive: 'from-amber-500 to-orange-500 shadow-amber-500/30',
    rgb: '245 158 11',
  },
  {
    grad: 'from-rose-500 via-pink-500 to-fuchsia-500',
    text: 'text-rose-600 dark:text-rose-400',
    hoverText: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
    blob: 'bg-rose-500/25',
    dot: 'bg-rose-500',
    tabHover: 'hover:border-rose-500/40',
    tabActive: 'from-rose-500 to-pink-500 shadow-rose-500/30',
    rgb: '244 63 94',
  },
  {
    grad: 'from-cyan-500 via-sky-500 to-blue-500',
    text: 'text-cyan-600 dark:text-cyan-400',
    hoverText: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
    blob: 'bg-cyan-500/25',
    dot: 'bg-cyan-500',
    tabHover: 'hover:border-cyan-500/40',
    tabActive: 'from-cyan-500 to-sky-500 shadow-cyan-500/30',
    rgb: '6 182 212',
  },
  {
    grad: 'from-violet-500 via-purple-500 to-indigo-500',
    text: 'text-violet-600 dark:text-violet-400',
    hoverText: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
    blob: 'bg-violet-500/25',
    dot: 'bg-violet-500',
    tabHover: 'hover:border-violet-500/40',
    tabActive: 'from-violet-500 to-purple-500 shadow-violet-500/30',
    rgb: '139 92 246',
  },
];

// Used for the "All" tab: a blend of the brand colours.
const ALL_THEME: Theme = {
  ...THEMES[0],
  grad: 'from-indigo-500 via-violet-500 to-cyan-400',
  blob: 'bg-indigo-500/20',
  tabActive: 'from-indigo-500 via-violet-500 to-cyan-500 shadow-indigo-500/30',
};

const categoryTheme = (category: string): Theme => {
  const i = skillsData.findIndex((c) => c.category === category);
  return THEMES[(i < 0 ? 0 : i) % THEMES.length];
};

const STAT_GRADIENTS = [
  'from-indigo-500 to-violet-500',
  'from-emerald-500 to-cyan-500',
  'from-amber-500 to-rose-500',
];

// Level styling: bars filled + colors. Add more levels here if you have them.
const LEVELS: Record<string, { bars: number; text: string; bar: string }> = {
  Expert: { bars: 3, text: 'text-emerald-600 dark:text-emerald-400', bar: 'bg-emerald-500' },
  Advanced: { bars: 2, text: 'text-indigo-600 dark:text-indigo-400', bar: 'bg-indigo-500' },
  Proficient: { bars: 1, text: 'text-cyan-600 dark:text-cyan-400', bar: 'bg-cyan-500' },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/* ------------------------------- small hooks -------------------------------- */

function useInViewOnce<T extends Element>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown] as const;
}

function CountUp({ value }: { value: number }) {
  const [ref, shown] = useInViewOnce<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!shown) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 900);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, value]);

  return <span ref={ref}>{String(n).padStart(2, '0')}</span>;
}

/* ------------------------------ level meter -------------------------------- */

function LevelMeter({ level }: { level: string }) {
  const cfg = LEVELS[level];
  const [ref, shown] = useInViewOnce<HTMLDivElement>(0.4);
  if (!cfg) return null;
  return (
    <div ref={ref} className="flex shrink-0 flex-col items-end gap-1.5" title={level}>
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} className="relative h-1.5 w-4 overflow-hidden rounded-full bg-border">
            <span
              style={{ transitionDelay: `${n * 120}ms` }}
              className={cn(
                'absolute inset-0 origin-left rounded-full transition-transform duration-700 ease-out motion-reduce:transition-none',
                n <= cfg.bars ? cfg.bar : 'bg-transparent',
                shown ? 'scale-x-100' : 'scale-x-0 motion-reduce:scale-x-100'
              )}
            />
          </span>
        ))}
      </div>
      <span className={cn('font-mono text-[10px] font-semibold uppercase tracking-wider', cfg.text)}>
        {level}
      </span>
    </div>
  );
}

/* --------------------- mobile: two auto-scrolling rows --------------------- */

type MarqueeSkill = { name: string; level: string; category: string };

function SkillPill({ skill }: { skill: MarqueeSkill }) {
  const meta = getTechMeta(skill.name);
  const Icon = meta.icon;
  const t = categoryTheme(skill.category);
  const lvl = LEVELS[skill.level];

  return (
    <div className="relative flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-background px-3.5 py-3 shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl"
        style={{ background: `rgb(${t.rgb} / 0.25)` }}
      />
      <span aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r', t.grad)} />

      <div
        className={cn(
          'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
          meta.bg,
          meta.border
        )}
      >
        <Icon className={cn('h-5 w-5', meta.color)} />
      </div>

      <div className="relative">
        <p className="whitespace-nowrap text-sm font-semibold text-foreground">{skill.name}</p>
        <p
          className={cn(
            'mt-0.5 flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-wider',
            lvl ? lvl.text : t.text
          )}
        >
          <span className={cn('h-1.5 w-1.5 rounded-full', lvl ? lvl.bar : t.dot)} aria-hidden="true" />
          {skill.level}
        </p>
      </div>
    </div>
  );
}

// Top row scrolls to the right, bottom row to the left. Phones only (sm:hidden).
function MobileSkillMarquee({ skills }: { skills: MarqueeSkill[] }) {
  // Alternate skills between the two rows so categories mix in both
  const rows = [skills.filter((_, i) => i % 2 === 0), skills.filter((_, i) => i % 2 === 1)];

  // Make sure one set is wider than the screen so the loop never shows a gap
  const fill = (arr: MarqueeSkill[]) => {
    if (arr.length === 0) return arr;
    let out = arr;
    while (out.length < 10) out = [...out, ...arr];
    return out;
  };

  return (
    <div
      className="-mx-4 space-y-3 overflow-hidden motion-reduce:overflow-x-auto [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-label="All skills"
    >
      {rows.map((row, r) => {
        const set = fill(row);
        const duration = Math.max(24, set.length * 3.5); // seconds, scales with row length
        return (
          <div key={r} className="overflow-hidden">
            <div
              className={cn(
                'skill-anim skill-marquee flex w-max',
                r === 0 ? 'skill-marquee-right' : 'skill-marquee-left'
              )}
              style={{ animationDuration: `${duration}s` }}
            >
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
                  {set.map((skill, i) => (
                    <li key={`${copy}-${skill.category}-${skill.name}-${i}`}>
                      <SkillPill skill={skill} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        );
      })}
      <p className="px-4 text-center text-[11px] text-muted-foreground motion-reduce:hidden">
        Press and hold to pause
      </p>
    </div>
  );
}

/* ------------------------------- main section ------------------------------ */

export function SkillsSection() {
  const [active, setActive] = useState('All');

  const all = skillsData.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.category })));
  const visible = active === 'All' ? all : all.filter((s) => s.category === active);
  const activeMeta = skillsData.find((c) => c.category === active);
  const activeTheme = active === 'All' ? ALL_THEME : categoryTheme(active);
  const expertCount = all.filter((s) => s.level === 'Expert').length;

  const tabs = [
    { key: 'All', count: all.length, theme: ALL_THEME },
    ...skillsData.map((c) => ({ key: c.category, count: c.skills.length, theme: categoryTheme(c.category) })),
  ];

  const stats = [
    { label: 'Technologies', value: all.length },
    { label: 'Categories', value: skillsData.length },
    { label: 'Expert level', value: expertCount },
  ];

  // Spotlight: write the cursor position into CSS variables (no re-render).
  const onCardMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  // Arrow-key navigation between tabs
  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = tabs.findIndex((t) => t.key === active);
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    setActive(next.key);
    requestAnimationFrame(() => document.getElementById(`skills-tab-${slug(next.key)}`)?.focus());
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative isolate mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <style>{`
        @keyframes skill-gradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes skill-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes skill-shine { 0% { transform: translateX(-120%); } 60%, 100% { transform: translateX(220%); } }
        @keyframes skill-marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes skill-marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .skill-marquee { animation-timing-function: linear; animation-iteration-count: infinite; }
        .skill-marquee-left { animation-name: skill-marquee-left; }
        .skill-marquee-right { animation-name: skill-marquee-right; }
        .skill-marquee:active { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .skill-anim { animation: none !important; }
        }
      `}</style>

      {/* Ambient glow that changes colour with the selected tab */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full blur-3xl transition-colors duration-700',
          activeTheme.blob
        )}
      />

      {/* Header + stats */}
      <ScrollReveal direction="down" duration={0.8} amount={0.15}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Technical Competencies</span>
            </div>
            <h2
              id="skills-heading"
              className="mt-5 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Verified{' '}
              <span className="skill-anim bg-gradient-to-r from-indigo-500 via-violet-500 via-50% to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-[skill-gradient_8s_linear_infinite]">
                technical stack
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Production engineering tools, frameworks, databases, and architectural patterns.
            </p>
          </div>

          <dl className="grid grid-cols-3 divide-x divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-background/40 backdrop-blur-sm">
            {stats.map((s, i) => (
              <div key={s.label} className="group relative px-5 py-4 text-center sm:px-7">
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-4 top-0 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100',
                    STAT_GRADIENTS[i % STAT_GRADIENTS.length]
                  )}
                />
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd
                  className={cn(
                    'mt-1 bg-gradient-to-r bg-clip-text font-mono text-2xl font-bold text-transparent',
                    STAT_GRADIENTS[i % STAT_GRADIENTS.length]
                  )}
                >
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </ScrollReveal>

      {/* Mobile only: every skill in two auto-scrolling rows (top -> right, bottom -> left) */}
      <div className="mt-8 sm:hidden">
        <MobileSkillMarquee skills={all} />
      </div>

      {/* Tabs + legend (tablet / desktop) */}
      <div className="hidden sm:block">
      <ScrollReveal direction="up" delay={0.1} duration={0.8}>
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Skill categories"
            onKeyDown={onTabKey}
            className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((t) => {
              const selected = active === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  type="button"
                  id={`skills-tab-${slug(t.key)}`}
                  aria-selected={selected}
                  aria-controls="skills-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(t.key)}
                  className={cn(
                    'group/tab relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    selected
                      ? cn('border-transparent bg-gradient-to-r text-white shadow-lg', t.theme.tabActive)
                      : cn(
                          'border-border/60 bg-background/40 text-muted-foreground hover:-translate-y-0.5 hover:text-foreground',
                          t.theme.tabHover
                        )
                  )}
                >
                  {!selected && (
                    <span
                      aria-hidden="true"
                      className={cn('h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover/tab:scale-150', t.theme.dot)}
                    />
                  )}
                  {t.key}
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 font-mono text-[10px] transition-colors',
                      selected ? 'bg-white/25 text-white' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {t.count}
                  </span>
                  {selected && (
                    <span
                      aria-hidden="true"
                      className="skill-anim pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/25 blur-sm [animation:skill-shine_3.2s_ease-in-out_infinite]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 text-[11px] text-muted-foreground sm:flex">
            {Object.entries(LEVELS).map(([name, cfg]) => (
              <span key={name} className="inline-flex items-center gap-1.5">
                <span className={cn('h-1.5 w-1.5 rounded-full', cfg.bar)} aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Active category description (fades on change) */}
        <p
          key={active}
          className="skill-anim mt-4 min-h-[1.25rem] text-sm text-muted-foreground [animation:skill-fade_0.45s_ease-out_both]"
        >
          {activeMeta ? activeMeta.description : 'Everything across all categories.'}
        </p>
      </ScrollReveal>
      </div>

      {/* Skill cards (remounted per tab so the entrance replays) */}
      <div
        key={active}
        id="skills-panel"
        role="tabpanel"
        aria-labelledby={`skills-tab-${slug(active)}`}
        className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((skill, idx) => {
          const meta = getTechMeta(skill.name);
          const Icon = meta.icon;
          const t = categoryTheme(skill.category);

          return (
            <ScrollReveal
              key={`${skill.category}-${skill.name}`}
              direction="scale"
              delay={idx * 0.04}
              duration={0.7}
              amount={0.1}
            >
              {/* 1px gradient frame: resting = neutral border, hover = category gradient */}
              <div
                onPointerMove={onCardMove}
                style={{ ['--rgb' as string]: t.rgb }}
                className="group relative h-full rounded-2xl bg-border/60 p-px transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_-20px_rgb(var(--rgb)/0.6)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                    t.grad
                  )}
                />

                <article className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[15px] bg-background p-5">
                  {/* resting colour wash (always visible = colourful grid) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `rgb(${t.rgb} / 0.22)` }}
                  />
                  {/* cursor spotlight */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgb(${t.rgb} / 0.16), transparent 70%)`,
                    }}
                  />
                  {/* top accent line that draws in on hover */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 ease-out group-hover:scale-x-100',
                      t.grad
                    )}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3.5">
                      <div
                        className={cn(
                          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm backdrop-blur-md transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110',
                          meta.bg,
                          meta.border,
                          meta.hoverGlow
                        )}
                      >
                        <Icon className={cn('h-6 w-6', meta.color)} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className={cn(
                              'text-base font-semibold text-foreground transition-colors duration-300',
                              t.hoverText
                            )}
                          >
                            {skill.name}
                          </h3>
                        </div>
                        {skill.description && (
                          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <LevelMeter level={skill.level} />
                  </div>

                  {active === 'All' && (
                    <div className="relative flex items-center justify-between border-t border-border/40 pt-3 font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span className={cn('inline-flex items-center gap-1.5', t.text)}>
                        <span className={cn('h-1.5 w-1.5 rounded-full', t.dot)} aria-hidden="true" />
                        {skill.category}
                      </span>
                      <span className="text-muted-foreground/60">{skill.level}</span>
                    </div>
                  )}
                </article>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

export default SkillsSection;