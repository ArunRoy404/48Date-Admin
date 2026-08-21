"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Heart,
  Flag,
  BookOpen,
  Bell,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  ClipboardList,
  ChevronLeft,
  MoreVertical,
} from "lucide-react";

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "#", active: true },
    ],
  },
  {
    title: "USERS",
    items: [
      { name: "Users", icon: Users, href: "#" },
      { name: "Verification", icon: ShieldCheck, href: "#" },
    ],
  },
  {
    title: "ENGAGEMENT",
    items: [
      { name: "Matches", icon: Heart, href: "#" },
    ],
  },
  {
    title: "TRUST & SAFETY",
    items: [
      { name: "Reports & Safety", icon: Flag, href: "#" },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { name: "Community Stories", icon: BookOpen, href: "#" },
      { name: "Notifications", icon: Bell, href: "#" },
    ],
  },
  {
    title: "REVENUE",
    items: [
      { name: "Subscriptions", icon: CreditCard, href: "#" },
      { name: "Analytics", icon: BarChart3, href: "#" },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      { name: "Settings", icon: Settings, href: "#" },
      { name: "Roles & Permissions", icon: Shield, href: "#" },
      { name: "Audit Logs", icon: ClipboardList, href: "#" },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside
      className={`relative flex flex-col bg-white border-r border-[#e5e7eb] transition-all duration-300 z-30 shrink-0 select-none ${
        collapsed ? "w-[76px]" : "w-[260px]"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Brand Header */}
      <div className="h-[69px] px-4 flex items-center justify-between border-b border-[#e5e7eb]">
        <div className="flex items-center gap-2 overflow-hidden">
          {/* 48Date Logo Mark */}
          <div className="flex items-center gap-1.5 shrink-0">
            <svg
              width="33"
              height="36"
              viewBox="0 0 33 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              {/* 4 mark */}
              <path
                d="M13.7393 0.069C13.8939 0.3074 13.8281 4.8957 13.8281 5.4557L13.8271 16.1012L16.1055 16.108C15.6593 16.9749 15.2867 17.8333 14.8936 18.7252L13.8252 18.7369L13.8223 26.1959C12.9418 26.2431 12.0801 26.2091 11.2002 26.1774C11.0838 23.9621 11.173 21.0117 11.1748 18.7418L10.1699 18.736C8.9985 18.7364 0.3186 18.8442 0 18.5836C0.0592 18.1221 0.5883 17.4597 0.873 17.0787C5.1033 11.4189 9.185 5.578 13.4805 -0.0258L13.7393 0.069ZM11.1533 7.274C10.463 8.1573 4.7675 15.7695 4.749 16.1022L11.1777 16.0953L11.1855 10.0826C11.1868 9.5744 11.2214 7.673 11.1533 7.274Z"
                fill="#E11D48"
              />
              {/* 8 intertwined heart mark */}
              <path
                d="M24.62 1.183C25.8398 0.1367 27.21 -0.345 28.8192 0.0101C30.1014 0.2942 31.2115 1.0906 31.8914 2.2142C32.636 3.4221 32.8312 4.969 32.4686 6.3363C31.655 9.4039 29.0604 11.3725 26.4823 12.9359C29.2629 14.6283 32.3134 17.1341 32.6268 20.6254C32.7559 22.0639 32.337 23.5266 31.3846 24.6302C30.5466 25.6087 29.3473 26.205 28.0614 26.2836C26.6291 26.3682 25.6127 25.8667 24.5789 24.933C23.9917 25.5171 23.2019 25.9819 22.3944 26.1761C21.2296 26.4555 20.0006 26.2545 18.9862 25.6176C17.8029 24.8633 16.9784 23.6592 16.702 22.2836C16.293 20.3473 16.8938 18.6434 17.9354 17.0385C19.0836 15.4491 20.1876 14.6274 21.7469 13.5482C22.2723 13.9987 22.8069 14.3705 23.3514 14.8539C21.4709 16.0831 19.3882 17.6503 18.7518 19.9213C18.2826 21.5957 18.9064 23.6699 20.7782 24.1049C22.2452 24.4456 23.2423 23.7054 23.993 22.515C24.1338 22.2917 24.3892 21.9005 24.6053 21.7611C25.1226 22.4527 25.5197 23.1599 26.2254 23.6644C27.6584 24.6888 29.2798 24.2484 30.162 22.765C30.6006 22.0274 30.7075 20.9761 30.4823 20.1478C29.4187 16.4406 25.4351 14.6649 22.3231 12.766C18.7577 10.5904 14.8966 6.5805 17.4286 2.1293C18.1123 0.9276 19.3543 0.2568 20.6971 -0.0563C22.4864 -0.1771 23.2279 0.0898 24.62 1.183ZM27.7899 1.9213C27.1307 1.9239 26.3742 2.2159 25.8788 2.6644C25.5563 2.9565 24.8754 4.0719 24.5946 4.2826C24.356 4.1002 24.1464 3.7084 23.9657 3.4408C23.2248 2.3443 22.3877 1.8556 21.0506 1.9525C20.2699 2.157 19.454 2.5455 19.0829 3.2933C17.2234 7.0415 21.9024 10.3439 24.578 11.8002C26.0607 10.8765 26.8479 10.4502 28.1766 9.3099C29.8154 7.6948 31.8406 4.8669 29.7362 2.7474C29.2237 2.2233 28.5229 1.9253 27.7899 1.9213Z"
                fill="#E11D48"
              />
            </svg>
            {!collapsed && (
              <span className="font-bold text-[18px] tracking-tight text-[#111827] flex items-center">
                48<span className="text-[#e11d48]">Date</span>
              </span>
            )}
          </div>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-[#99a1af] hover:text-[#111827] hover:bg-[#f3f4f6] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-3 px-2 overflow-y-auto space-y-4">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!collapsed && (
              <div className="px-3 py-1 text-[9px] font-bold text-[#99a1af] tracking-wider uppercase">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[14px] font-medium transition-all ${
                    isActive
                      ? "bg-[#fce7ef] text-[#e11d48] font-semibold"
                      : "text-[#6a7282] hover:text-[#111827] hover:bg-[#f9fafb]"
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon
                    className={`w-[15px] h-[15px] shrink-0 ${
                      isActive ? "text-[#e11d48]" : "text-[#99a1af]"
                    }`}
                    strokeWidth={isActive ? 2 : 1.75}
                  />
                  {!collapsed && (
                    <span className="truncate text-left">{item.name}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-[#e5e7eb] bg-white">
        <div
          className={`flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#f9fafb] transition-colors cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="relative w-7 h-7 rounded-full bg-[#fce7ef] overflow-hidden shrink-0 border border-[#fbcfe8]">
            <Image
              src="/assets/avatar.png"
              alt="Alex Rivera"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[#111827] truncate leading-tight">
                Alex Rivera
              </div>
              <div className="text-[11px] text-[#99a1af] truncate leading-tight">
                Super Admin
              </div>
            </div>
          )}
          {!collapsed && (
            <button className="text-[#99a1af] hover:text-[#111827] p-1">
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
