import React from 'react';
import { Gamepad2, Play, Sparkles, Terminal, Cpu, Flame, Grid3X3, Zap } from 'lucide-react';

interface GameBannerProps {
  slug: string;
  title: string;
  category: string;
  className?: string;
}

export function GameBanner({ slug, title, category, className = '' }: GameBannerProps) {
  switch (slug) {
    case 'cyber-2048':
      return (
        <div className={`relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/60 p-4 flex flex-col justify-between group/banner select-none ${className}`}>
          {/* Neon Grid Mesh */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d412_1px,transparent_1px),linear-gradient(to_bottom,#06b6d412_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none group-hover/banner:bg-cyan-500/35 transition-all duration-500" />
          <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-fuchsia-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Info */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[10px] font-mono font-semibold tracking-wider text-cyan-400 uppercase">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              CYBER PUZZLE
            </span>
            <span className="text-[11px] font-mono text-cyan-300/80 bg-slate-950/70 px-2 py-0.5 rounded border border-cyan-500/20">
              TARGET: 2048
            </span>
          </div>

          {/* Centered Decorative 2048 Tiles Showcase */}
          <div className="relative z-10 flex items-center justify-center gap-2 py-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-lg shadow-cyan-500/20 flex flex-col items-center justify-center font-bold text-xs text-cyan-300">
              <span>256</span>
            </div>
            <div className="w-13 h-13 rounded-xl bg-cyan-500/20 border border-cyan-400 shadow-lg shadow-cyan-500/30 flex flex-col items-center justify-center font-extrabold text-sm text-cyan-200">
              <span>1024</span>
            </div>
            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500 to-fuchsia-500 border border-white/40 shadow-xl shadow-cyan-500/40 flex flex-col items-center justify-center font-black text-lg text-white scale-105 group-hover/banner:scale-110 transition-transform">
              <span>2048</span>
              <span className="text-[7px] tracking-widest font-mono uppercase text-white/90">CYBER</span>
            </div>
            <div className="w-13 h-13 rounded-xl bg-fuchsia-500/20 border border-fuchsia-400 shadow-lg shadow-fuchsia-500/30 flex flex-col items-center justify-center font-extrabold text-sm text-fuchsia-200">
              <span>4096</span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-cyan-500/20 pt-2">
            <span className="text-cyan-400/90 flex items-center gap-1">
              <Grid3X3 className="w-3 h-3" /> 4×4 Matrix Grid
            </span>
            <span className="text-muted-foreground group-hover/banner:text-cyan-300 transition-colors">
              Slide & Merge
            </span>
          </div>
        </div>
      );

    case 'retro-snake-quest':
      return (
        <div className={`relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 p-4 flex flex-col justify-between group/banner select-none ${className}`}>
          {/* CRT scanlines effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[size:100%_4px] opacity-40 pointer-events-none" />
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none group-hover/banner:bg-emerald-500/35 transition-all duration-500" />
          
          {/* Top Info */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              <Zap className="w-3 h-3 text-emerald-400" />
              60 FPS RETRO ARCADE
            </span>
            <span className="text-[11px] font-mono text-emerald-300/80 bg-slate-950/70 px-2 py-0.5 rounded border border-emerald-500/20">
              ORBS: 10 PTS
            </span>
          </div>

          {/* Snake visualization */}
          <div className="relative z-10 flex items-center justify-center gap-1.5 py-3">
            {/* Snake Body segments */}
            <div className="w-5 h-5 rounded-md bg-emerald-500/30 border border-emerald-500/40" />
            <div className="w-5 h-5 rounded-md bg-emerald-500/50 border border-emerald-500/60" />
            <div className="w-5 h-5 rounded-md bg-emerald-500/70 border border-emerald-400" />
            <div className="w-6 h-6 rounded-lg bg-emerald-400 border border-emerald-200 shadow-lg shadow-emerald-500/50 flex items-center justify-center relative">
              {/* Snake eyes */}
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute top-1 right-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute bottom-1 right-1" />
            </div>
            {/* Food Orb */}
            <div className="ml-8 w-4 h-4 rounded-full bg-rose-500 border border-rose-300 shadow-lg shadow-rose-500/80 animate-pulse" />
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-emerald-500/20 pt-2">
            <span className="text-emerald-400/90 flex items-center gap-1">
              <Gamepad2 className="w-3 h-3" /> Canvas Mechanics
            </span>
            <span className="text-muted-foreground group-hover/banner:text-emerald-300 transition-colors">
              Speed Tiers: Casual → Overdrive
            </span>
          </div>
        </div>
      );

    case 'memory-matrix':
      return (
        <div className={`relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/60 p-4 flex flex-col justify-between group/banner select-none ${className}`}>
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none group-hover/banner:bg-purple-500/35 transition-all duration-500" />

          {/* Top Info */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-mono font-semibold tracking-wider text-purple-400 uppercase">
              <Cpu className="w-3 h-3 text-purple-400" />
              NEURAL RECALL
            </span>
            <span className="text-[11px] font-mono text-purple-300/80 bg-slate-950/70 px-2 py-0.5 rounded border border-purple-500/20">
              AUDIO-VISUAL
            </span>
          </div>

          {/* Memory Matrix 3x3 Simulation */}
          <div className="relative z-10 grid grid-cols-3 gap-2 w-28 mx-auto my-1">
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-purple-500/20" />
            <div className="w-7 h-7 rounded-lg bg-purple-500 border border-purple-200 shadow-md shadow-purple-500/80 scale-105 animate-pulse" />
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-purple-500/20" />
            <div className="w-7 h-7 rounded-lg bg-indigo-500/40 border border-indigo-400/50" />
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-purple-500/20" />
            <div className="w-7 h-7 rounded-lg bg-purple-500/60 border border-purple-400" />
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-purple-500/20" />
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-purple-500/20" />
            <div className="w-7 h-7 rounded-lg bg-indigo-500 border border-white/50 shadow-md shadow-indigo-500/80" />
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-purple-500/20 pt-2">
            <span className="text-purple-400/90">Web Audio Synthesizer</span>
            <span className="text-muted-foreground group-hover/banner:text-purple-300 transition-colors">
              Combo Multipliers
            </span>
          </div>
        </div>
      );

    case 'code-speed-typer':
      return (
        <div className={`relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 p-4 flex flex-col justify-between group/banner select-none ${className}`}>
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none group-hover/banner:bg-amber-500/35 transition-all duration-500" />

          {/* Top Info */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono font-semibold tracking-wider text-amber-400 uppercase">
              <Terminal className="w-3 h-3 text-amber-400" />
              DEV TYPING SPRINT
            </span>
            <span className="text-[11px] font-mono text-amber-300/80 bg-slate-950/70 px-2 py-0.5 rounded border border-amber-500/20">
              LIVE WPM & ACCURACY
            </span>
          </div>

          {/* Code snippet typing representation */}
          <div className="relative z-10 bg-slate-950/90 border border-amber-500/30 rounded-xl p-2.5 font-mono text-xs text-left my-1 shadow-inner">
            <div className="flex items-center gap-1.5 mb-1.5 opacity-60">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[9px] text-muted-foreground ml-1">snippet.ts</span>
            </div>
            <div className="space-y-0.5 text-[11px]">
              <p className="text-emerald-400 font-semibold">
                const <span className="text-cyan-300">speed</span> = <span className="text-amber-300">calculateWpm</span>();
              </p>
              <p className="text-slate-400">
                return <span className="text-purple-400">accuracy</span> &gt; 98 ? <span className="text-emerald-300">&quot;MASTER&quot;</span> : <span className="text-rose-400">&quot;PUSH&quot;</span>;
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-amber-500/20 pt-2">
            <span className="text-amber-400/90">TypeScript & React Snippets</span>
            <span className="text-muted-foreground group-hover/banner:text-amber-300 transition-colors">
              Zero Backspace Mode
            </span>
          </div>
        </div>
      );

    case 'dragon-runner':
    default:
      return (
        <div className={`relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-rose-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/60 p-4 flex flex-col justify-between group/banner select-none ${className}`}>
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl pointer-events-none group-hover/banner:bg-rose-500/35 transition-all duration-500" />

          {/* Top Info */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-[10px] font-mono font-semibold tracking-wider text-rose-400 uppercase">
              <Flame className="w-3 h-3 text-rose-400" />
              ENDLESS ARCADE RUNNER
            </span>
            <span className="text-[11px] font-mono text-rose-300/80 bg-slate-950/70 px-2 py-0.5 rounded border border-rose-500/20">
              JUMP & DUCK
            </span>
          </div>

          {/* Runner visualization */}
          <div className="relative z-10 flex items-center justify-between px-4 py-2">
            {/* Dragon */}
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 border border-rose-300 shadow-lg shadow-rose-600/50 flex items-center justify-center text-lg animate-bounce">
                🐉
              </div>
              <div className="w-6 h-1 bg-rose-500/50 rounded-full blur-xs mx-auto mt-1" />
            </div>

            {/* Flying enemy bat */}
            <div className="text-xs font-mono px-2 py-1 rounded bg-slate-900/90 border border-rose-500/40 text-rose-300 flex items-center gap-1">
              <span>🦇 FLYING</span>
            </div>

            {/* Ground Obstacle */}
            <div className="flex items-end gap-1">
              <div className="w-3 h-6 bg-gradient-to-t from-slate-900 to-rose-500 rounded-t border-t border-rose-300" />
              <div className="w-4 h-8 bg-gradient-to-t from-slate-900 to-amber-500 rounded-t border-t border-amber-300" />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-rose-500/20 pt-2">
            <span className="text-rose-400/90">HTML5 Physics Loop</span>
            <span className="text-muted-foreground group-hover/banner:text-rose-300 transition-colors">
              Escalating Velocity
            </span>
          </div>
        </div>
      );
  }
}
