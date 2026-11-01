"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * TUNING CONSTANTS
 * ============================================================================
 * Edit these values to tune the cursor-reactive 3D parallax effect:
 */
export const PORTRAIT_TUNING = {
  // Smoothing / Lerp factor: lower = smoother/slower, higher = snappier
  EASE: 0.1,

  // Card 3D tilt angles (in degrees)
  TILT_X: 12, // rotateY angle (horizontal movement)
  TILT_Y: 9,  // rotateX angle (vertical movement)

  // Glow halo movement opposite to cursor (in pixels)
  HALO_X: 22,
  HALO_Y: 16,

  // Torso / body layer counter-shift opposite to cursor (in pixels)
  BODY_SHIFT_X: 4,
  BODY_SHIFT_Y: 3,

  // Head layer shift turning toward cursor (in pixels)
  HEAD_SHIFT_X: 9,
  HEAD_SHIFT_Y: 6,

  // Head subtle rotation angle (in degrees)
  HEAD_ROTATE: 1.5,

  // Soft light spotlight tracking range (% offset across card)
  LIGHT_X: 45,
  LIGHT_Y: 35,

  // Head vertical mask stops (percentage of photo height)
  HEAD_MASK_TOP: "32%",
  HEAD_MASK_BOTTOM: "46%",
};

interface HeroPortraitProps {
  className?: string;
  name?: string;
}

export function HeroPortrait({
  className = "",
  name = "Vicky Rana",
}: HeroPortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // Store pointer target and smoothed position in refs (zero React re-renders)
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Respect user motion preferences: disable animation if reduced motion requested
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const clamp = (val: number, min = -1, max = 1) =>
      Math.max(min, Math.min(max, val));

    const onPointerMove = (e: PointerEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Normalize offset by half the viewport width/height, clamped to [-1, 1]
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;

      target.current.x = clamp((e.clientX - cx) / halfW);
      target.current.y = clamp((e.clientY - cy) / halfH);
    };

    // When cursor leaves the document, ease smoothly back to neutral center (0, 0)
    const onPointerLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    const {
      EASE,
      TILT_X,
      TILT_Y,
      HALO_X,
      HALO_Y,
      BODY_SHIFT_X,
      BODY_SHIFT_Y,
      HEAD_SHIFT_X,
      HEAD_SHIFT_Y,
      HEAD_ROTATE,
      LIGHT_X,
      LIGHT_Y,
    } = PORTRAIT_TUNING;

    // 60-120fps requestAnimationFrame loop applying transforms directly to DOM elements
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * EASE;
      current.current.y += (target.current.y - current.current.y) * EASE;

      const x = current.current.x;
      const y = current.current.y;

      // 1. Glow halo behind: moves opposite to cursor
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${-x * HALO_X}px, ${-y * HALO_Y}px, 0)`;
      }

      // 2. 3D Tilt card
      if (cardRef.current) {
        cardRef.current.style.transform = `rotateY(${x * TILT_X}deg) rotateX(${-y * TILT_Y}deg)`;
      }

      // 3. Body layer: subtle counter-shift
      if (bodyRef.current) {
        bodyRef.current.style.transform = `translate3d(${-x * BODY_SHIFT_X}px, ${-y * BODY_SHIFT_Y}px, 0) scale(1.05)`;
      }

      // 4. Head layer: turns and tilts toward the cursor (3D depth illusion)
      if (headRef.current) {
        headRef.current.style.transform = `translate3d(${x * HEAD_SHIFT_X}px, ${y * HEAD_SHIFT_Y}px, 0) rotate(${x * HEAD_ROTATE}deg) scale(1.05)`;
      }

      // 5. Dynamic light spotlight tracking the cursor
      if (lightRef.current) {
        const spotX = (50 + x * LIGHT_X).toFixed(1);
        const spotY = (35 + y * LIGHT_Y).toFixed(1);
        lightRef.current.style.background = `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(165,180,252,0.28) 0%, transparent 55%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative aspect-square w-full select-none",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {/* 1. Glow Halo Behind Card (moves opposite to cursor) */}
      <div
        ref={haloRef}
        aria-hidden="true"
        className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] bg-gradient-to-tr from-indigo-500/25 via-violet-500/20 to-cyan-400/25 blur-2xl sm:blur-3xl pointer-events-none -z-10 will-change-transform"
      />

      {/* 2. Tilt Card (rounded container with 3D preserve-3d) */}
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl shadow-indigo-950/40 dark:shadow-indigo-950/60 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 3a. Body Layer: Full image, slight counter-shift */}
        <div
          ref={bodyRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/portrait.png"
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 448px"
            className="object-cover pointer-events-none select-none"
          />
        </div>

        {/* 3b. Head Layer: Masked duplicate image, turns toward cursor */}
        <div
          ref={headRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            maskImage: `linear-gradient(to bottom, #000 0%, #000 ${PORTRAIT_TUNING.HEAD_MASK_TOP}, transparent ${PORTRAIT_TUNING.HEAD_MASK_BOTTOM})`,
            WebkitMaskImage: `linear-gradient(to bottom, #000 0%, #000 ${PORTRAIT_TUNING.HEAD_MASK_TOP}, transparent ${PORTRAIT_TUNING.HEAD_MASK_BOTTOM})`,
            transformOrigin: "50% 30%",
          }}
        >
          <Image
            src="/portrait.png"
            alt=""
            aria-hidden
            fill
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 448px"
            className="object-cover pointer-events-none select-none"
          />
        </div>

        {/* 3c. Light Layer: Soft-light radial spotlight following cursor */}
        <div
          ref={lightRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-soft-light will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, rgba(165,180,252,0.28) 0%, transparent 55%)",
          }}
        />

        {/* 3d. Edge Vignette: Radial fade to black at edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>
    </div>
  );
}

export default HeroPortrait;
