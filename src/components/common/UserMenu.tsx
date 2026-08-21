"use client";

import React from "react";
import { UserAvatar } from "@/components/common/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  name?: string;
  role?: string;
  avatarSrc?: string;
  variant?: "header" | "sidebar";
  className?: string;
}

export function UserMenu({
  name = "Alex Rivera",
  role = "Super Admin",
  avatarSrc = "/assets/avatar.png",
  variant = "header",
  className,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 rounded-xl transition-colors outline-none cursor-pointer select-none",
            variant === "header"
              ? "p-1 hover:bg-muted"
              : "w-full p-2 hover:bg-muted",
            className
          )}
        >
          <UserAvatar src={avatarSrc} name={name} size="md" />

          <div
            className={cn(
              "flex flex-col text-left leading-none min-w-0 flex-1",
              variant === "header" ? "hidden md:flex" : "flex"
            )}
          >
            <span className="text-[13px] font-semibold text-foreground truncate">
              {name}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5 truncate">
              {role}
            </span>
          </div>

          <ChevronDown
            className="w-3.5 h-3.5 text-muted-foreground shrink-0"
            strokeWidth={2}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={variant === "header" ? "end" : "start"}
        className="w-56 bg-white border border-border shadow-dropdown rounded-xl p-1.5 z-50"
      >
        <DropdownMenuLabel className="px-2.5 py-2">
          <div className="text-[13px] font-semibold text-foreground">{name}</div>
          <div className="text-[11px] text-muted-foreground font-normal">{role}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border my-1" />
        <DropdownMenuItem className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-slate-subtle hover:text-foreground hover:bg-muted rounded-lg cursor-pointer">
          <User className="w-4 h-4 text-muted-foreground" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-slate-subtle hover:text-foreground hover:bg-muted rounded-lg cursor-pointer">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border my-1" />
        <DropdownMenuItem className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer">
          <LogOut className="w-4 h-4 text-destructive" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
