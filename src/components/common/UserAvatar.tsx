"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-7 h-7 text-[11px]",
  lg: "w-9 h-9 text-[13px]",
  xl: "w-11 h-11 text-[15px]",
};

export function UserAvatar({
  src = "/assets/avatar.png",
  name = "Alex Rivera",
  size = "md",
  className,
}: UserAvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div
      className={cn(
        "relative rounded-full bg-brand-pink border border-brand-pink-border overflow-hidden shrink-0 flex items-center justify-center font-semibold text-brand-crimson select-none",
        sizeMap[size],
        className
      )}
    >
      {!hasError && src ? (
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="44px"
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
