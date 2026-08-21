"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FilterTabOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterTabsProps {
  options: FilterTabOption[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterTabs({
  options,
  activeValue,
  onChange,
  className,
}: FilterTabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-muted p-1 rounded-2xl border border-border select-none",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = activeValue === opt.value;

        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-[13px] font-medium transition-all capitalize cursor-pointer",
              isActive
                ? "bg-white text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-white/50"
            )}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span
                className={cn(
                  "ml-1.5 text-[11px] px-1.5 py-0.2 rounded-full",
                  isActive
                    ? "bg-brand-pink text-brand-crimson"
                    : "bg-border text-muted-foreground"
                )}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
