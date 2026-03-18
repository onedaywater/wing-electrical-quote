"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Ctx = { value?: string; onValueChange?: (value: string) => void };
const SelectContext = React.createContext<Ctx>({});

export function Select({ value, onValueChange, children }: { value?: string; onValueChange?: (value: string) => void; children: React.ReactNode }) {
  return <SelectContext.Provider value={{ value, onValueChange }}>{children}</SelectContext.Provider>;
}

export function SelectTrigger({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("hidden", className)}>{children}</div>;
}

export function SelectValue() {
  const { value } = React.useContext(SelectContext);
  return <>{value}</>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const { value, onValueChange } = React.useContext(SelectContext);
  const items = React.Children.toArray(children) as React.ReactElement[];

  return (
    <select
      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    >
      {items.map((item) => (
        <option key={item.props.value} value={item.props.value}>
          {item.props.children}
        </option>
      ))}
    </select>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}
