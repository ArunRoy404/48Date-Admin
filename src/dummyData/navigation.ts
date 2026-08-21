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
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigationDummyData: NavGroup[] = [
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
