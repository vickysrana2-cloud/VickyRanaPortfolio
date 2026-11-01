"use client";

import React from "react";

export interface CharacterFallbackProps {
  /** Optional container CSS class name */
  className?: string;
  /** Custom heading title */
  title?: string;
  /** Custom subtitle or message */
  description?: string;
  /** Whether to render explanatory text beneath the graphic (default true) */
  showText?: boolean;
}

/**
 * Lightweight, accessible visual fallback rendered when WebGL is unavailable,
 * during server-side rendering, or when high-performance graphics are disabled.
 * Uses zero external images or heavy assets.
 */
export function CharacterFallback({
  className = "",
  title = "Golden Monkey Companion",
  description = "WebGL 3D graphics are currently disabled or unsupported. Displaying 2D stylized companion portrait.",
  showText = true,
}: CharacterFallbackProps) {
  return (
    <div
      role="img"
      aria-label="Golden Monkey Character (2D Illustration Fallback)"
      className={`relative flex flex-col items-center justify-center p-6 sm:p-8 text-center rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 via-background/60 to-background/90 backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-44 w-44 rounded-full bg-amber-500/15 blur-2xl"
      />

      {/* Stylized Vector SVG Illustration */}
      <div className="relative z-10 flex items-center justify-center">
        <svg
          viewBox="0 0 200 220"
          className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Ambient Behind Crown */}
          <circle cx="100" cy="95" r="70" fill="url(#furGlow)" opacity="0.3" />

          {/* Golden Ears */}
          <ellipse cx="42" cy="90" rx="18" ry="24" fill="#E9B546" />
          <ellipse cx="42" cy="90" rx="11" ry="16" fill="#F7E6BE" />
          <ellipse cx="158" cy="90" rx="18" ry="24" fill="#E9B546" />
          <ellipse cx="158" cy="90" rx="11" ry="16" fill="#F7E6BE" />

          {/* Swept-Back Crown Tufts */}
          <path
            d="M80 50 Q100 24 120 50 Q100 36 80 50Z"
            fill="#E9B546"
          />
          <path
            d="M65 62 Q85 36 100 52 Q80 44 65 62Z"
            fill="#B9772E"
          />
          <path
            d="M135 62 Q115 36 100 52 Q120 44 135 62Z"
            fill="#B9772E"
          />

          {/* Golden Skull / Head Base */}
          <ellipse cx="100" cy="95" rx="54" ry="52" fill="#E9B546" />

          {/* Cheek Fur Ruff (Left & Right) */}
          <path
            d="M48 100 Q28 115 36 135 Q52 120 54 108Z"
            fill="#F7E6BE"
          />
          <path
            d="M52 112 Q34 130 46 148 Q60 130 58 118Z"
            fill="#E9B546"
          />
          <path
            d="M152 100 Q172 115 164 135 Q148 120 146 108Z"
            fill="#F7E6BE"
          />
          <path
            d="M148 112 Q166 130 154 148 Q140 130 142 118Z"
            fill="#E9B546"
          />

          {/* Soft Cream Face Mask */}
          <path
            d="M62 90 C62 70 80 66 100 66 C120 66 138 70 138 90 C138 112 125 132 100 132 C75 132 62 112 62 90 Z"
            fill="#F7E6BE"
          />

          {/* Brows */}
          <path
            d="M74 80 Q85 76 94 81"
            stroke="#7B4A1E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M126 80 Q115 76 106 81"
            stroke="#7B4A1E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Eyes (Left & Right) */}
          {/* Eye Whites */}
          <ellipse cx="84" cy="94" rx="9" ry="11" fill="#FFFBF2" />
          <ellipse cx="116" cy="94" rx="9" ry="11" fill="#FFFBF2" />
          {/* Warm Amber Irises */}
          <ellipse cx="85" cy="94" rx="6" ry="7.5" fill="#8A4B14" />
          <ellipse cx="115" cy="94" rx="6" ry="7.5" fill="#8A4B14" />
          {/* Pupils */}
          <ellipse cx="85" cy="94" rx="3.5" ry="4.5" fill="#120B07" />
          <ellipse cx="115" cy="94" rx="3.5" ry="4.5" fill="#120B07" />
          {/* Specular Catchlights */}
          <circle cx="83" cy="91" r="2" fill="#FFFFFF" />
          <circle cx="113" cy="91" r="2" fill="#FFFFFF" />

          {/* Snub Nose (Signature Rhinopithecus nostril design) */}
          <ellipse cx="100" cy="107" rx="5" ry="3.5" fill="#2A1710" />

          {/* Friendly Smile */}
          <path
            d="M91 117 Q100 124 109 117"
            stroke="#5A2E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Upper Body & Shoulder Mantle Silhouette */}
          <path
            d="M45 180 C48 148 70 142 100 142 C130 142 152 148 155 180 C155 195 45 195 45 180 Z"
            fill="#E9B546"
          />
          {/* Cream Belly Patch */}
          <ellipse cx="100" cy="180" rx="26" ry="22" fill="#FBF0D2" />
          {/* Bronze Shoulder Cape */}
          <path
            d="M52 152 Q72 165 100 165 Q128 165 148 152"
            stroke="#B9772E"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Radial Gradient for Fur Soft Backlight */}
          <defs>
            <radialGradient id="furGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E9B546" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#B9772E" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Explanatory Fallback Text */}
      {showText && (
        <div className="relative z-10 mt-3 max-w-sm space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400">
            <span>2D Companion View</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
