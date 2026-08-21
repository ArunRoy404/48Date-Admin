"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommonInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export function CommonInput({
  type = "text",
  icon,
  endAdornment,
  className,
  ...props
}: CommonInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <span className="absolute left-3 text-muted-foreground pointer-events-none z-10 flex items-center justify-center">
          {icon}
        </span>
      )}
      <Input
        type={inputType}
        className={cn(
          "h-[38px] bg-muted border-border text-[13px] text-foreground placeholder:text-muted-foreground rounded-2xl transition-all",
          icon ? "pl-9" : "pl-3",
          isPassword || endAdornment ? "pr-10" : "pr-3",
          "focus-visible:border-brand-crimson focus-visible:ring-2 focus-visible:ring-brand-crimson/10",
          className
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-muted-foreground hover:text-foreground cursor-pointer z-10"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      )}
      {!isPassword && endAdornment && (
        <span className="absolute right-3 flex items-center justify-center z-10">
          {endAdornment}
        </span>
      )}
    </div>
  );
}
