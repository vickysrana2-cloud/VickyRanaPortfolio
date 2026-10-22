import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variant === "default" && "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
          variant === "destructive" && "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
          variant === "outline" && "border border-border bg-transparent hover:bg-muted text-foreground",
          variant === "secondary" && "bg-muted text-foreground hover:bg-muted/80",
          variant === "ghost" && "hover:bg-muted text-foreground",
          variant === "link" && "text-indigo-500 underline-offset-4 hover:underline",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 rounded-lg px-3 text-xs",
          size === "lg" && "h-12 rounded-xl px-8 text-base",
          size === "icon" && "h-10 w-10",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
