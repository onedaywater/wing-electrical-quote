import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "outline" ? "border border-slate-300 bg-white text-slate-700" : "bg-slate-900 text-white",
        className,
      )}
      {...props}
    />
  );
}
