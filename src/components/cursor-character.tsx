"use client";

import { useEffect, useRef } from "react";

/**
 * A friendly character whose head turns and eyes focus on the cursor.
 * - No re-renders: pointer position is applied straight to SVG transforms in rAF.
 * - Smooth easing (lerp), so it feels alive instead of snapping.
 * - Respects prefers-reduced-motion.
 */
export function CursorCharacter({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const faceRef = useRef<SVGGElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const antennaRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // target = where the cursor wants us to look, current = what we render
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const clamp = (v: number, min = -1, max = 1) => Math.max(min, Math.min(max, v));

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // normalise by half the viewport, so looking at the screen edge = full turn
      target.x = clamp((e.clientX - cx) / (window.innerWidth / 2));
      target.y = clamp((e.clientY - cy) / (window.innerHeight / 2));
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    let raf = 0;
    const tick = () => {
      // ease toward the target (0.12 = snappy but smooth)
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      const { x, y } = current;

      // Head: tilts and shifts slightly
      if (headRef.current) {
        headRef.current.style.transform = `translate(${x * 8}px, ${y * 6}px) rotate(${x * 6}deg)`;
      }
      // Face plate moves MORE than the head -> fake 3D "turning" illusion
      if (faceRef.current) {
        faceRef.current.style.transform = `translate(${x * 22}px, ${y * 14}px)`;
      }
      // Pupils move inside the eyes
      if (pupilsRef.current) {
        pupilsRef.current.style.transform = `translate(${x * 9}px, ${y * 8}px)`;
      }
      // Antenna lags behind for a bit of personality
      if (antennaRef.current) {
        antennaRef.current.style.transform = `rotate(${-x * 14}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <style>{`
        @keyframes cc-blink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(0.08); } }
        .cc-eye { transform-origin: center; transform-box: fill-box; animation: cc-blink 5s infinite; }
        @media (prefers-reduced-motion: reduce) { .cc-eye { animation: none; } }
      `}</style>

      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Friendly character that follows your cursor"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="cc-head" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#818CF8" />
            <stop offset="0.55" stopColor="#6366F1" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="cc-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4F46E5" />
            <stop offset="1" stopColor="#312E81" />
          </linearGradient>
          <radialGradient id="cc-shine" cx="0.3" cy="0.2" r="0.8">
            <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="200" cy="378" rx="110" ry="12" fill="currentColor" opacity="0.12" />

        {/* Shoulders / body (static) */}
        <path d="M70 380 C70 300 130 275 200 275 C270 275 330 300 330 380 Z" fill="url(#cc-body)" />
        <rect x="178" y="250" width="44" height="36" rx="14" fill="#4338CA" />

        {/* Head group (tilts) */}
        <g ref={headRef} style={{ transformOrigin: "200px 230px" }}>
          {/* Antenna */}
          <g ref={antennaRef} style={{ transformOrigin: "200px 78px" }}>
            <rect x="196" y="40" width="8" height="42" rx="4" fill="#A5B4FC" />
            <circle cx="200" cy="36" r="11" fill="#22D3EE" />
            <circle cx="200" cy="36" r="11" fill="none" stroke="#22D3EE" strokeOpacity="0.4" strokeWidth="6" />
          </g>

          {/* Ears */}
          <rect x="52" y="150" width="26" height="70" rx="13" fill="#4F46E5" />
          <rect x="322" y="150" width="26" height="70" rx="13" fill="#4F46E5" />

          {/* Head */}
          <rect x="70" y="78" width="260" height="190" rx="78" fill="url(#cc-head)" />
          <rect x="70" y="78" width="260" height="190" rx="78" fill="url(#cc-shine)" />

          {/* Face plate: moves more than the head to fake a 3D turn */}
          <g ref={faceRef}>
            <rect x="104" y="112" width="192" height="122" rx="52" fill="#0F1033" />

            {/* Eyes */}
            <g>
              <circle cx="158" cy="170" r="27" fill="#fff" className="cc-eye" />
              <circle cx="242" cy="170" r="27" fill="#fff" className="cc-eye" />
            </g>

            {/* Pupils */}
            <g ref={pupilsRef}>
              <circle cx="158" cy="170" r="12" fill="#1E1B4B" />
              <circle cx="242" cy="170" r="12" fill="#1E1B4B" />
              <circle cx="163" cy="165" r="4" fill="#fff" />
              <circle cx="247" cy="165" r="4" fill="#fff" />
            </g>

            {/* Smile */}
            <path
              d="M180 208 Q200 224 220 208"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default CursorCharacter;
