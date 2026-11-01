"use client";

import { useEffect, useRef } from "react";

/**
 * A polished, professional illustrated portrait (glasses, blazer and tie)
 * that turns toward your cursor.
 *
 * How the "turn" works (no 3D engine needed):
 *  - The head tilts a little.
 *  - The face features (brows, eyes, nose, mouth) slide MORE than the head outline,
 *    the glasses slide a bit more again (they sit in front of the face), and the
 *    nose slides the most of the features because it is closest to the viewer.
 *  - Ears and body move the opposite way, hair leads slightly. That layered
 *    parallax is what reads as depth.
 *  - Pupils move inside the eyes, and the face is clipped so features never leave the head.
 *
 * No re-renders: pointer position is applied straight to SVG transforms in rAF.
 * Respects prefers-reduced-motion.
 */

// ---- Tune these -------------------------------------------------------------
const EASE = 0.1; // follow speed. 0.05 = floaty, 0.2 = snappy
const TURN = 1; // overall strength multiplier. 0.6 = subtle, 1.4 = dramatic
// ------------------------------------------------------------------------------

export function CursorCharacter({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<SVGGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const earLRef = useRef<SVGGElement>(null);
  const earRRef = useRef<SVGGElement>(null);
  const hairFrontRef = useRef<SVGGElement>(null);
  const featuresRef = useRef<SVGGElement>(null);
  const browsRef = useRef<SVGGElement>(null);
  const glassesRef = useRef<SVGGElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const noseRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // normalised by half the viewport: cursor at the screen edge = full turn
      target.x = clamp((e.clientX - cx) / (window.innerWidth / 2));
      target.y = clamp((e.clientY - cy) / (window.innerHeight / 2));
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const set = (el: SVGGElement | null, value: string) => {
      if (el) el.style.transform = value;
    };

    let raf = 0;
    const tick = () => {
      cur.x += (target.x - cur.x) * EASE;
      cur.y += (target.y - cur.y) * EASE;
      const x = cur.x * TURN;
      const y = cur.y * TURN;

      set(haloRef.current, `translate(${-x * 10}px, ${-y * 8}px)`);
      set(bodyRef.current, `translate(${-x * 3}px, 0)`);
      set(headRef.current, `translate(${x * 6}px, ${y * 4}px) rotate(${x * 4}deg)`);
      set(earLRef.current, `translate(${-x * 6}px, 0)`);
      set(earRRef.current, `translate(${-x * 6}px, 0)`);
      set(hairFrontRef.current, `translate(${x * 4}px, ${y * 3}px)`);
      set(featuresRef.current, `translate(${x * 14}px, ${y * 9}px)`);
      set(glassesRef.current, `translate(${x * 15}px, ${y * 9.5}px)`);
      set(browsRef.current, `translate(${x}px, ${y * 3}px)`);
      set(pupilsRef.current, `translate(${x * 5}px, ${y * 4}px)`);
      set(noseRef.current, `translate(${x * 7}px, ${y * 4}px)`);

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <style>{`
        @keyframes cc-blink { 0%, 93%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.05); } }
        .cc-eyes { transform-origin: center; transform-box: fill-box; animation: cc-blink 5s infinite; }
        @media (prefers-reduced-motion: reduce) { .cc-eyes { animation: none; } }
      `}</style>

      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Illustrated portrait that turns to follow your cursor"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="cc-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F0C19B"/>
            <stop offset="1" stopColor="#D99A70"/>
          </linearGradient>
          <linearGradient id="cc-neck" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#B9784F"/>
            <stop offset="1" stopColor="#D49669"/>
          </linearGradient>
          <linearGradient id="cc-hair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2B2521"/>
            <stop offset="1" stopColor="#0D0B0A"/>
          </linearGradient>
          <linearGradient id="cc-jacket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2B3A63"/>
            <stop offset="1" stopColor="#0F1730"/>
          </linearGradient>
          <radialGradient id="cc-halo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#6366F1" stopOpacity="0.32"/>
            <stop offset="0.7" stopColor="#7C3AED" stopOpacity="0.14"/>
            <stop offset="1" stopColor="#7C3AED" stopOpacity="0"/>
          </radialGradient>
          <clipPath id="cc-face-clip">
            <path d="M118 150 C118 100 150 80 200 80 C250 80 282 100 282 150 L282 176 C282 226 252 266 200 268 C148 266 118 226 118 176 Z"/>
          </clipPath>
          <clipPath id="cc-eyes-clip">
            <ellipse cx="162" cy="172" rx="17" ry="10.5"/>
            <ellipse cx="238" cy="172" rx="17" ry="10.5"/>
          </clipPath>
        </defs>

        <g ref={haloRef} style={{ transformOrigin: "200px 190px" }}>
          <circle cx="200" cy="190" r="190" fill="url(#cc-halo)"/>
        </g>

        <ellipse cx="200" cy="392" rx="130" ry="10" fill="#000" opacity="0.18"/>

        <g ref={bodyRef} style={{ transformOrigin: "200px 340px" }}>
          <rect x="168" y="236" width="64" height="70" rx="18" fill="url(#cc-neck)"/>
          <path d="M30 400 C30 320 104 290 200 290 C296 290 370 320 370 400 Z" fill="url(#cc-jacket)"/>
          <path d="M36 372 C46 322 108 292 200 292 C292 292 354 322 364 372" fill="none" stroke="#818CF8" strokeOpacity="0.45" strokeWidth="2"/>
          <path d="M166 291 L200 352 L234 291 Z" fill="#EEF0F8"/>
          <path d="M196 318 L204 318 L207 350 L200 355 L193 350 Z" fill="#4338CA"/>
          <path d="M200 320 L200 352" stroke="#818CF8" strokeWidth="1.4" strokeOpacity="0.6"/>
          <path d="M168 291 L124 314 L148 376 L200 354 Z" fill="#17223F"/>
          <path d="M232 291 L276 314 L252 376 L200 354 Z" fill="#17223F"/>
          <path d="M168 291 L124 314 L148 376" fill="none" stroke="#3B4A72" strokeWidth="1.5"/>
          <path d="M232 291 L276 314 L252 376" fill="none" stroke="#3B4A72" strokeWidth="1.5"/>
          <circle cx="146" cy="326" r="4" fill="#6366F1"/>
          <circle cx="146" cy="326" r="4" fill="none" stroke="#C7D2FE" strokeWidth="1" strokeOpacity="0.7"/>
          <path d="M170 280 L200 322 L166 300 Z" fill="#FFFFFF" stroke="#D5D9E8" strokeWidth="1.2"/>
          <path d="M230 280 L200 322 L234 300 Z" fill="#FFFFFF" stroke="#D5D9E8" strokeWidth="1.2"/>
          <path d="M193 306 L207 306 L205 319 L195 319 Z" fill="#4F46E5"/>
        </g>

        <g ref={headRef} style={{ transformOrigin: "200px 240px" }}>
          <ellipse cx="200" cy="270" rx="50" ry="13" fill="#000" opacity="0.28"/>

          <path d="M112 150 C102 84 148 50 204 50 C262 50 298 86 288 150 L280 128 L120 128 Z" fill="url(#cc-hair)"/>

          <g ref={earLRef} style={{ transformOrigin: "116px 178px" }}>
            <ellipse cx="116" cy="178" rx="13" ry="22" fill="#D08E64"/>
            <path d="M114 166 C108 176 110 186 116 192" fill="none" stroke="#A9683F" strokeWidth="3" strokeLinecap="round"/>
          </g>
          <g ref={earRRef} style={{ transformOrigin: "284px 178px" }}>
            <ellipse cx="284" cy="178" rx="13" ry="22" fill="#D08E64"/>
            <path d="M286 166 C292 176 290 186 284 192" fill="none" stroke="#A9683F" strokeWidth="3" strokeLinecap="round"/>
          </g>

          <path d="M118 150 C118 100 150 80 200 80 C250 80 282 100 282 150 L282 176 C282 226 252 266 200 268 C148 266 118 226 118 176 Z" fill="url(#cc-skin)"/>

          <g clipPath="url(#cc-face-clip)">
            <g ref={featuresRef} style={{ transformOrigin: "200px 180px" }}>
              <path d="M114 196 C122 248 162 274 200 274 C238 274 278 248 286 196 C268 226 240 232 200 230 C160 232 132 226 114 196 Z" fill="#2A1D17" opacity="0.08"/>
              <ellipse cx="140" cy="206" rx="16" ry="9" fill="#E07A6A" opacity="0.14"/>
              <ellipse cx="260" cy="206" rx="16" ry="9" fill="#E07A6A" opacity="0.14"/>

              <g ref={browsRef} style={{ transformOrigin: "200px 150px" }}>
                <path d="M140 149 Q160 135 184 145" fill="none" stroke="#1A1411" strokeWidth="8" strokeLinecap="round"/>
                <path d="M216 143 Q240 127 260 145" fill="none" stroke="#1A1411" strokeWidth="8" strokeLinecap="round"/>
              </g>

              <g className="cc-eyes">
                <ellipse cx="162" cy="172" rx="17" ry="10.5" fill="#F7F5F2"/>
                <ellipse cx="238" cy="172" rx="17" ry="10.5" fill="#F7F5F2"/>
                <g clipPath="url(#cc-eyes-clip)">
                  <g ref={pupilsRef} style={{ transformOrigin: "200px 172px" }}>
                    <circle cx="162" cy="172" r="9" fill="#4A3123"/>
                    <circle cx="238" cy="172" r="9" fill="#4A3123"/>
                    <circle cx="162" cy="172" r="4.6" fill="#0A0807"/>
                    <circle cx="238" cy="172" r="4.6" fill="#0A0807"/>
                    <circle cx="165" cy="169" r="2" fill="#fff"/>
                    <circle cx="241" cy="169" r="2" fill="#fff"/>
                  </g>
                </g>
              </g>
              <path d="M144 173 Q162 158 180 173" fill="none" stroke="#2A1C15" strokeWidth="3.2" strokeLinecap="round"/>
              <path d="M220 173 Q238 158 256 173" fill="none" stroke="#2A1C15" strokeWidth="3.2" strokeLinecap="round"/>

              <g ref={noseRef} style={{ transformOrigin: "200px 200px" }}>
                <path d="M207 176 C208 192 214 202 216 208" fill="none" stroke="#9C5B36" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round"/>
                <path d="M188 210 C194 217 206 217 212 210" fill="none" stroke="#8A4C2C" strokeWidth="3.4" strokeLinecap="round"/>
                <ellipse cx="191" cy="211" rx="3" ry="2" fill="#7A4226" opacity="0.7"/>
                <ellipse cx="209" cy="211" rx="3" ry="2" fill="#7A4226" opacity="0.7"/>
                <ellipse cx="203" cy="203" rx="5" ry="3" fill="#fff" opacity="0.18"/>
              </g>

              <path d="M176 234 Q200 249 226 232" fill="none" stroke="#7E352E" strokeWidth="5.5" strokeLinecap="round"/>
              <path d="M229 227 Q234 229 232 235" fill="none" stroke="#7E352E" strokeWidth="2.4" strokeLinecap="round" opacity="0.35"/>
              <path d="M190 242 Q202 247 214 241" fill="none" stroke="#B8665A" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
            </g>
          </g>

          <g ref={glassesRef} style={{ transformOrigin: "200px 172px" }}>
            <rect x="135" y="153" width="54" height="39" rx="13" fill="#818CF8" fillOpacity="0.1"/>
            <rect x="211" y="153" width="54" height="39" rx="13" fill="#818CF8" fillOpacity="0.1"/>
            <path d="M146 189 L158 157 L166 157 L154 189 Z" fill="#fff" opacity="0.16"/>
            <path d="M222 189 L234 157 L242 157 L230 189 Z" fill="#fff" opacity="0.16"/>
            <rect x="135" y="153" width="54" height="39" rx="13" fill="none" stroke="#1B2038" strokeWidth="4"/>
            <rect x="211" y="153" width="54" height="39" rx="13" fill="none" stroke="#1B2038" strokeWidth="4"/>
            <path d="M189 167 Q200 160 211 167" fill="none" stroke="#1B2038" strokeWidth="4" strokeLinecap="round"/>
            <path d="M135 166 L121 163" fill="none" stroke="#1B2038" strokeWidth="4" strokeLinecap="round"/>
            <path d="M265 166 L279 163" fill="none" stroke="#1B2038" strokeWidth="4" strokeLinecap="round"/>
          </g>

          <g ref={hairFrontRef} style={{ transformOrigin: "200px 100px" }}>
            <path d="M116 152 C106 98 136 58 196 54 C256 50 296 88 284 152 C282 134 272 120 258 112 C236 124 198 114 176 100 C160 112 138 124 126 152 Z" fill="url(#cc-hair)"/>
            <path d="M150 78 C170 62 214 58 244 74" fill="none" stroke="#5A4E46" strokeWidth="3" strokeLinecap="round" opacity="0.45"/>
            <path d="M168 92 C190 80 226 80 250 92" fill="none" stroke="#5A4E46" strokeWidth="2.4" strokeLinecap="round" opacity="0.3"/>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default CursorCharacter;
