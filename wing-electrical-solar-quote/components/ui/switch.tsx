"use client";
import * as React from "react";

export function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-slate-900" : "bg-slate-300"}`}
      aria-pressed={checked}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? "left-5" : "left-0.5"}`} />
    </button>
  );
}
