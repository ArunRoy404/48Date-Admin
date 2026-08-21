"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CommonButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant"> {
  variant?: "brand" | "outline" | "ghost" | "secondary" | "destructive";
  icon?: React.ReactNode;
  loading?: boolean;
}

export function CommonButton({
  children,
  variant = "brand",
  icon,
  loading = false,
  className,
  disabled,
  ...props
}: CommonButtonProps) {
  const customVariantStyles = {
    brand:
      "bg-brand-crimson hover:bg-brand-crimson/90 text-white shadow-card hover:shadow active:scale-95 border border-transparent",
    outline:
      "bg-white border border-border text-secondary-foreground hover:bg-muted hover:border-muted-foreground/30 active:scale-95 shadow-card",
    ghost: "hover:bg-muted text-slate-subtle hover:text-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  return (
    <Button
      disabled={disabled || loading}
      className={cn(
        "h-[34px] px-3.5 rounded-2xl text-[12px] font-medium transition-all cursor-pointer inline-flex items-center justify-center gap-1.5",
        customVariantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </Button>
  );
}
