"use client";

import * as React from "react";
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
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/common/Logo";
import { UserMenu } from "@/components/common/UserMenu";
import { cn } from "@/lib/utils";

// 48Date Brand Navigation Structure
const navGroups = [
  {
    label: "OVERVIEW",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
    ],
  },
  {
    label: "USERS",
    items: [
      {
        title: "Users",
        url: "#",
        icon: Users,
      },
      {
        title: "Verification",
        url: "#",
        icon: ShieldCheck,
      },
    ],
  },
  {
    label: "ENGAGEMENT",
    items: [
      {
        title: "Matches",
        url: "#",
        icon: Heart,
      },
    ],
  },
  {
    label: "TRUST & SAFETY",
    items: [
      {
        title: "Reports & Safety",
        url: "#",
        icon: Flag,
      },
    ],
  },
  {
    label: "CONTENT",
    items: [
      {
        title: "Community Stories",
        url: "#",
        icon: BookOpen,
      },
      {
        title: "Notifications",
        url: "#",
        icon: Bell,
      },
    ],
  },
  {
    label: "REVENUE",
    items: [
      {
        title: "Subscriptions",
        url: "#",
        icon: CreditCard,
      },
      {
        title: "Analytics",
        url: "#",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "ADMINISTRATION",
    items: [
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
      {
        title: "Roles & Permissions",
        url: "#",
        icon: Shield,
      },
      {
        title: "Audit Logs",
        url: "#",
        icon: ClipboardList,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState("Dashboard");
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="bg-white border-r border-border select-none"
      {...props}
    >
      {/* Brand Header: Logo hidden when collapsed */}
      <SidebarHeader className="h-[69px] px-3 flex flex-row items-center justify-between border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center pl-1 overflow-hidden">
            <Logo size="md" />
          </div>
        )}

        <SidebarTrigger
          className={cn(
            "text-muted-foreground hover:text-foreground hover:bg-muted transition-all",
            isCollapsed && "mx-auto"
          )}
        />
      </SidebarHeader>

      {/* Navigation Groups */}
      <SidebarContent className="py-3 px-2 space-y-3">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="p-0">
            {!isCollapsed && (
              <SidebarGroupLabel className="px-3 py-1 text-[9px] font-bold text-muted-foreground tracking-wider uppercase">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.title;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setActiveItem(item.title)}
                      tooltip={item.title}
                      className={`h-9 px-3 rounded-lg text-[14px] font-medium transition-all ${
                        isActive
                          ? "bg-brand-pink text-brand-crimson font-semibold hover:bg-brand-pink hover:text-brand-crimson"
                          : "text-slate-subtle hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon
                        className={`w-[15px] h-[15px] shrink-0 ${
                          isActive ? "text-brand-crimson" : "text-muted-foreground"
                        }`}
                        strokeWidth={isActive ? 2 : 1.75}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer User Profile Card */}
      <SidebarFooter className="p-2 border-t border-border bg-white">
        <UserMenu variant="sidebar" />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
