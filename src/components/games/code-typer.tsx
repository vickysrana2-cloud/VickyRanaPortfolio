'use client';

import * as React from 'react';
import { RotateCcw, Trophy, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    id: 'next-action',
    title: 'Next.js Server Action',
    language: 'TypeScript',
    code: 'async function submitOrder(data: OrderInput) {\n  const res = await db.orders.create({ data });\n  revalidatePath("/dashboard");\n  return { success: true, id: res.id };\n}',
  },
  {
    id: 'nest-guard',
    title: 'NestJS Auth Guard',
    language: 'TypeScript',
    code: '@Injectable()\nexport class JwtAuthGuard implements CanActivate {\n  canActivate(ctx: ExecutionContext): boolean {\n    const req = ctx.switchToHttp().getRequest();\n    return Boolean(req.headers.authorization);\n  }\n}',
  },
  {
    id: 'sql-query',
    title: 'SQL Indexed Join Query',
    language: 'SQL',
    code: 'SELECT u.id, u.email, COUNT(o.id) AS total_orders\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nWHERE o.status = "COMPLETED"\nGROUP BY u.id HAVING total_orders > 5;',
  },
  {
    id: 'react-hook',
    title: 'React Custom Hook',
    language: 'TypeScript',
    code: 'export function useDebounce<T>(value: T, delay = 300): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debounced;\n}',
  },
];

export function CodeSpeedTyper() {
  const [selectedSnippetIndex, setSelectedSnippetIndex] = React.useState(0);
  const [userInput, setUserInput] = React.useState('');
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [endTime, setEndTime] = React.useState<number | null>(null);
  const [mistakes, setMistakes] = React.useState(0);
  const [bestWpm, setBestWpm] = React.useState(0);
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const snippet = SNIPPETS[selectedSnippetIndex];
  const targetCode = snippet.code;

  // Load high score
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('dev-typer-best-wpm');
      if (saved) setBestWpm(parseInt(saved, 10));
    } catch {
      // ignore
    }
  }, []);

  const resetSprint = (newIndex?: number) => {
    if (typeof newIndex === 'number') {
      setSelectedSnippetIndex(newIndex);
    }
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setMistakes(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (endTime) return; // already finished

    if (!startTime && val.length === 1) {
      setStartTime(Date.now());
    }

    // Check mistake on the newly typed character
    if (val.length > userInput.length) {
      const charIndex = val.length - 1;
      if (val[charIndex] !== targetCode[charIndex]) {
        setMistakes((m) => m + 1);
      }
    }

    setUserInput(val);

    // Completion check
    if (val === targetCode) {
      const finishedAt = Date.now();
      setEndTime(finishedAt);
      const elapsedMinutes = Math.max((finishedAt - (startTime || finishedAt)) / 60000, 0.05);
      const words = targetCode.length / 5;
      const finalWpm = Math.round(words / elapsedMinutes);

      if (finalWpm > bestWpm) {
        setBestWpm(finalWpm);
        try {
          localStorage.setItem('dev-typer-best-wpm', finalWpm.toString());
        } catch {
          // ignore
        }
      }

      try {
        confetti({ particleCount: 90, spread: 70 });
      } catch {
        // ignore
      }
    }
  };

  // Compute live metrics
  const elapsedMinutes = startTime
    ? Math.max(((endTime || Date.now()) - startTime) / 60000, 0.02)
    : 0;

  const currentWpm =
    startTime && userInput.length > 0
      ? Math.round(userInput.length / 5 / elapsedMinutes)
      : 0;

  const accuracy =
    userInput.length > 0
      ? Math.max(0, Math.round(((userInput.length - mistakes) / userInput.length) * 100))
      : 100;

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-7 rounded-3xl liquid-glass-elevated shadow-2xl relative">
      <div className="glass-reflection-highlight" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            Dev Code Typer
            <span className="text-xs font-mono font-normal liquid-badge text-cyan-400">
              Syntax Sprint
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Type production code snippets with maximum speed & accuracy</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => resetSprint()}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl liquid-btn-primary transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Snippet Selector Buttons Pill */}
      <div className="flex flex-wrap gap-1.5 mb-5 p-1.5 liquid-glass-pill rounded-2xl">
        {SNIPPETS.map((snip, idx) => (
          <button
            key={snip.id}
            onClick={() => resetSprint(idx)}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-300',
              selectedSnippetIndex === idx
                ? 'liquid-btn-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
            )}
          >
            {snip.title}
          </button>
        ))}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3.5 rounded-2xl liquid-glass-subtle text-center">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            Speed
          </span>
          <span className="text-xl sm:text-2xl font-black text-foreground font-mono">
            {currentWpm} <span className="text-xs font-normal text-muted-foreground">WPM</span>
          </span>
        </div>
        <div className="p-3.5 rounded-2xl liquid-glass-subtle text-center">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground block">
            Accuracy
          </span>
          <span className={cn(
            'text-xl sm:text-2xl font-black font-mono',
            accuracy >= 95 ? 'text-emerald-400' : accuracy >= 80 ? 'text-amber-400' : 'text-rose-400'
          )}>
            {accuracy}%
          </span>
        </div>
        <div className="p-3.5 rounded-2xl liquid-glass-subtle text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-amber-500">
            <Trophy className="w-3 h-3" />
            <span>Best</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-amber-500 font-mono">
            {bestWpm} <span className="text-xs font-normal">WPM</span>
          </span>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="relative p-5 rounded-2xl liquid-glass border border-border/60 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto select-none min-h-[140px] shadow-inner">
        <div className="text-[11px] text-muted-foreground pb-2.5 border-b border-border/50 mb-3 flex items-center justify-between">
          <span className="liquid-badge text-cyan-400 px-2 py-0.5">{snippet.language} snippet</span>
          <span>
            {userInput.length} / {targetCode.length} chars
          </span>
        </div>

        <div className="whitespace-pre font-mono">
          {targetCode.split('').map((char, index) => {
            let colorClass = 'text-muted-foreground/60';
            let bgClass = '';

            if (index < userInput.length) {
              if (userInput[index] === char) {
                colorClass = 'text-emerald-400 font-bold';
              } else {
                colorClass = 'text-white font-bold';
                bgClass = 'bg-rose-600/80 rounded-xs';
              }
            } else if (index === userInput.length) {
              bgClass = 'bg-cyan-500/30 border-b-2 border-cyan-400 animate-pulse';
            }

            return (
              <span key={index} className={cn(colorClass, bgClass)}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Real textarea to capture typed inputs cleanly */}
      <div className="mt-4">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          disabled={Boolean(endTime)}
          placeholder={endTime ? "Challenge complete!" : "Click here and start typing the code snippet above..."}
          className="w-full h-24 p-3.5 rounded-2xl liquid-glass-input text-foreground font-mono text-xs sm:text-sm focus:outline-none resize-none"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>

      {/* Completion Banner */}
      {endTime && (
        <div className="mt-5 p-4 rounded-2xl liquid-glass-elevated border border-emerald-500/40 text-emerald-400 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-bold text-sm">Sprint Completed!</div>
              <div className="text-xs text-muted-foreground font-mono">
                Final Speed: {currentWpm} WPM • Accuracy: {accuracy}%
              </div>
            </div>
          </div>
          <button
            onClick={() => resetSprint((selectedSnippetIndex + 1) % SNIPPETS.length)}
            className="px-4 py-2 rounded-xl liquid-btn-primary text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <span>Next Snippet</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
