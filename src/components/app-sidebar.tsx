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
import { UserMenu } from "@/components/common/UserMenu";

// 48Date Brand Navigation Structure from Figma
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
      {/* Brand Header */}
      <SidebarHeader className="h-[69px] px-4 flex flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2 overflow-hidden">
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
          {!isCollapsed && (
            <span className="font-bold text-[18px] tracking-tight text-foreground flex items-center">
              48<span className="text-brand-crimson">Date</span>
            </span>
          )}
        </div>

        <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-muted" />
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
