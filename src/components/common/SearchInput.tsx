"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
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
    <div
      className={cn(
        "relative flex items-center h-[38px] px-3 bg-muted border border-border rounded-2xl hover:border-muted-foreground/30 focus-within:border-brand-crimson focus-within:ring-2 focus-within:ring-brand-crimson/10 transition-all",
        className
      )}
    >
      <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" strokeWidth={2} />
      <input
        type="text"
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        className="bg-transparent text-[13px] text-foreground placeholder-muted-foreground outline-none px-2 w-full min-w-0"
      />
      <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/80 bg-white border border-border rounded shadow-2xs shrink-0 select-none">
        ⌘K
      </kbd>
    </div>
  );
}
