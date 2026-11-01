'use client';

import React from 'react';
import { ScrollReveal } from '../animations/ScrollReveal';

export interface FixedBackgroundSectionProps {
  image: string;
  children?: React.ReactNode;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  minHeight?: string;
  imageSize?: string;
}

export default function FixedBackgroundSection({
  image,
  children,
  className = '',
  overlay = false,
  overlayOpacity = 0,
  minHeight = '60vh',
  imageSize = 'min(100vh, 100vw)',
}: FixedBackgroundSectionProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-black ${className}`}
      style={{ minHeight }}
    >
      {/* Fixed Background Layer (bg-fixed anchored to viewport center with matching black backdrop) */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none z-0 bg-scroll sm:bg-fixed bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('${image}')`,
          backgroundSize: imageSize,
        }}
      />

      {/* Optional Overlay */}
      {overlay && overlayOpacity > 0 && (
        <div 
          className="absolute inset-0 bg-black z-[1] pointer-events-none transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />
      )}



      {/* Foreground Content Layer (if provided) */}
      {children && (
        <ScrollReveal className="relative z-10 w-full min-h-full flex flex-col justify-center items-center py-12">
          {children}
        </ScrollReveal>
      )}
    </section>
  );
}

export { FixedBackgroundSection };

