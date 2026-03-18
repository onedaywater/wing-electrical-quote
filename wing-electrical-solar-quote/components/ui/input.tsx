import * as React from "react";
import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-slate-500", props.className)} {...props} />;
}
