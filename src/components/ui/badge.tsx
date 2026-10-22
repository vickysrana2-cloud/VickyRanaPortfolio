import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "border-transparent bg-indigo-600 text-white shadow hover:bg-indigo-700",
        variant === "secondary" && "border-transparent bg-muted text-foreground hover:bg-muted/80",
        variant === "destructive" && "border-transparent bg-rose-600 text-white shadow hover:bg-rose-700",
        variant === "outline" && "text-foreground border-border",
        className
      )}
      {...props}
    />
  );
}
