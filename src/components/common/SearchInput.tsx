"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { CommonInput } from "@/components/common/CommonInput";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <CommonInput
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        icon={<Search className="w-3.5 h-3.5" strokeWidth={2} />}
        endAdornment={
          <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/80 bg-white border border-border rounded shadow-2xs select-none">
            ⌘K
          </kbd>
        }
      />
    </div>
  );
}
