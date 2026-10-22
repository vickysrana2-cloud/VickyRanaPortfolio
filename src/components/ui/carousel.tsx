import * as React from "react";
import { cn } from "@/lib/utils";

export function Carousel({ children, className, opts }: { children: React.ReactNode; className?: string; plugins?: unknown[]; opts?: Record<string, unknown> }) {
  return <div className={cn("relative overflow-hidden w-full", className)}>{children}</div>;
}

export function CarouselContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex gap-4 overflow-x-auto scrollbar-none", className)}>{children}</div>;
}

export function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}>{children}</div>;
}

export function CarouselPrevious({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn("absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 border border-border shadow-md", className)}
      aria-label="Previous slide"
    >
      ‹
    </button>
  );
}

export function CarouselNext({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn("absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 border border-border shadow-md", className)}
      aria-label="Next slide"
    >
      ›
    </button>
  );
}
