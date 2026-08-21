"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  children?: React.ReactNode;
  variant?: "success" | "brand" | "destructive" | "warning" | "neutral" | "white";
  trend?: "up" | "down";
  className?: string;
  pill?: boolean;
}

export function StatusBadge({
  children,
  variant = "success",
  trend,
  className,
  pill = true,
}: StatusBadgeProps) {
  const variantStyles = {
    success: "bg-success-light text-success-foreground border-success-border",
    brand: "bg-brand-pink text-brand-crimson border-brand-pink-border",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    warning: "bg-warning-light text-warning-foreground border-warning/20",
    neutral: "bg-muted text-slate-subtle border-border",
    white: "bg-white/20 text-white border-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[12px] font-semibold border transition-colors",
        pill ? "rounded-full px-2.5 py-0.5" : "rounded-md px-2 py-0.5",
        variantStyles[variant],
        className
      )}
    >
      {trend === "up" && (
        <TrendingUp className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
      )}
      {trend === "down" && (
        <TrendingDown className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
      )}
      {children}
    </span>
  );
}
