"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none",
        className
      )}
    >
      <div>
        <h1 className="text-[24px] md:text-[26px] font-bold text-foreground tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-[14px] text-muted-foreground mt-1 font-normal">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0">{actions}</div>
      )}
    </div>
  );
}
