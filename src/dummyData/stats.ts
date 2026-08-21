import {
  Users,
  Heart,
  ShieldCheck,
  CreditCard,
  Flag,
  Star,
  Activity,
  type LucideIcon,
} from "lucide-react";

export interface StatItem {
  id: string;
  title: string;
  value: string;
  subtext: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: LucideIcon;
  isPrimary?: boolean;
}

export const row1StatsDummyData: StatItem[] = [
  {
    id: "total-users",
    title: "Total Users",
    value: "18,347",
    subtext: "↑ 1,842 this month",
    trend: { value: "12%", isUp: true },
    icon: Users,
  },
  {
    id: "active-matches",
    title: "Active Matches",
    value: "4,280",
    subtext: "Within 48h window",
    trend: { value: "8%", isUp: true },
    icon: Heart,
  },
  {
    id: "pending-verifications",
    title: "Pending Verifications",
    value: "24",
    subtext: "5 flagged by AI",
    icon: ShieldCheck,
  },
  {
    id: "monthly-revenue",
    title: "Monthly Revenue",
    value: "$183K",
    subtext: "↑ $35K vs last month",
    trend: { value: "23%", isUp: true },
    icon: CreditCard,
    isPrimary: true,
  },
];

export const row2StatsDummyData: StatItem[] = [
  {
    id: "open-reports",
    title: "Open Reports",
    value: "12",
    subtext: "3 high severity",
    trend: { value: "3%", isUp: false },
    icon: Flag,
  },
  {
    id: "avg-trust-score",
    title: "Avg Trust Score",
    value: "76.4",
    subtext: "Platform wide",
    trend: { value: "2%", isUp: true },
    icon: Star,
  },
  {
    id: "match-success-rate",
    title: "Match Success Rate",
    value: "68.3%",
    subtext: "Date completion",
    trend: { value: "4%", isUp: true },
    icon: Activity,
  },
];
