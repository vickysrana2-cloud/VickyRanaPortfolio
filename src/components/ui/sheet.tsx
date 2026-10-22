import * as React from "react";
import { cn } from "@/lib/utils";

interface SheetContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

export function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const ctx = React.useContext(SheetContext);
  return (
    <div onClick={() => ctx?.setOpen(true)} className="cursor-pointer inline-flex">
      {children}
    </div>
  );
}

export function SheetContent({
  children,
  side = "right",
  className,
}: {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const ctx = React.useContext(SheetContext);
  if (!ctx?.open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className={cn(
          "fixed z-50 bg-background p-6 shadow-xl transition-all duration-300",
          side === "right" && "inset-y-0 right-0 w-3/4 max-w-sm border-l border-border",
          side === "left" && "inset-y-0 left-0 w-3/4 max-w-sm border-r border-border",
          side === "top" && "inset-x-0 top-0 h-1/3 border-b border-border",
          side === "bottom" && "inset-x-0 bottom-0 h-1/3 border-t border-border",
          className
        )}
      >
        <button
          onClick={() => ctx.setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
