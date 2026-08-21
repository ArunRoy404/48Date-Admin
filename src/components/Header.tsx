"use client";

import React from "react";
import { ChevronRight, Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchInput } from "@/components/common/SearchInput";
import { UserMenu } from "@/components/common/UserMenu";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes("/users")) return "Users";
    if (pathname.includes("/verification")) return "Verification";
    return "Dashboard";
  };

  return (
    <header className="h-[56px] px-4 md:px-6 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between sticky top-0 z-20 shrink-0 select-none">
      {/* Left: Mobile Sidebar Trigger + Dynamic Breadcrumbs */}
      <div className="flex items-center gap-2 text-[14px]">
        <SidebarTrigger className="md:hidden text-muted-foreground hover:text-foreground" />
        <Link
          href="/dashboard"
          className="text-muted-foreground/80 font-medium hover:text-foreground cursor-pointer transition-colors hidden sm:inline"
        >
          48Date
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border hidden sm:inline" strokeWidth={2} />
        <span className="text-foreground font-semibold">{getPageTitle()}</span>
      </div>

      {/* Right: Search, Notifications & User Menu */}
      <div className="flex items-center gap-3">
        {/* Reusable Search Box */}
        <SearchInput className="w-[140px] sm:w-[200px]" />

        {/* Notifications Bell */}
        <button
          className="relative w-8 h-8 rounded-full flex items-center justify-center text-slate-subtle hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-slate-subtle" strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-crimson ring-2 ring-white" />
        </button>

        {/* Reusable User Menu */}
        <UserMenu variant="header" />
      </div>
    </header>
  );
}
