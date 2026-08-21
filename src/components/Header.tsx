"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Search,
  Moon,
  Sun,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-[56px] px-6 bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] flex items-center justify-between sticky top-0 z-20 shrink-0 select-none">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[14px]">
        <span className="text-[#9ca3af] font-medium hover:text-[#6a7282] cursor-pointer transition-colors">
          48Date
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-[#d1d5dc]" strokeWidth={2} />
        <span className="text-[#111827] font-semibold">Dashboard</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <div className="flex items-center gap-2 h-[38px] px-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl hover:border-[#d1d5dc] focus-within:border-[#e11d48] focus-within:ring-2 focus-within:ring-[#e11d48]/10 transition-all">
            <Search className="w-3.5 h-3.5 text-[#99a1af]" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] text-[#111827] placeholder-[#99a1af] outline-none w-[110px] sm:w-[150px] transition-all"
            />
            <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono text-[#9ca3af] bg-white border border-[#e5e7eb] rounded shadow-xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#6a7282] hover:text-[#111827] hover:bg-[#f3f4f6] transition-colors"
          title="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-500" strokeWidth={1.75} />
          ) : (
            <Moon className="w-4 h-4 text-[#6a7282]" strokeWidth={1.75} />
          )}
        </button>

        {/* Notifications Bell */}
        <button
          className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#6a7282] hover:text-[#111827] hover:bg-[#f3f4f6] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-[#6a7282]" strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#e11d48] ring-2 ring-white" />
        </button>

        {/* User Profile dropdown */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-85 transition-opacity">
          <div className="relative w-7 h-7 rounded-full bg-[#fce7ef] overflow-hidden border border-[#fbcfe8]">
            <Image
              src="/assets/avatar.png"
              alt="Alex Rivera"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <div className="hidden md:flex flex-col text-left leading-none">
            <span className="text-[12px] font-semibold text-[#111827]">
              Alex Rivera
            </span>
            <span className="text-[10px] text-[#99a1af] mt-0.5">
              Super Admin
            </span>
          </div>
          <ChevronDown className="w-3 h-3 text-[#99a1af]" strokeWidth={2} />
        </div>
      </div>
    </header>
  );
}
