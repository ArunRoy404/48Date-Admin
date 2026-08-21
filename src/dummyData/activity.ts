import { User, Flag, Heart, Calendar, CreditCard, type LucideIcon } from "lucide-react";

export interface ActivityItem {
  id: string;
  name: string;
  action: string;
  time: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export const recentActivityDummyData: ActivityItem[] = [
  {
    id: "1",
    name: "Nathan Foster",
    action: "New user registered",
    time: "2 min ago",
    icon: User,
    iconBg: "bg-info-light",
    iconColor: "text-info",
  },
  {
    id: "2",
    name: "Marcus Williams",
    action: "High-severity report submitted",
    time: "15 min ago",
    icon: Flag,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    action: "New match with Tyler Brooks",
    time: "23 min ago",
    icon: Heart,
    iconBg: "bg-brand-pink",
    iconColor: "text-brand-crimson",
  },
  {
    id: "4",
    name: "Sarah Chen",
    action: "Date confirmed at Café Blue, SF",
    time: "41 min ago",
    icon: Calendar,
    iconBg: "bg-purple-light",
    iconColor: "text-purple",
  },
  {
    id: "5",
    name: "Aisha Johnson",
    action: "Upgraded to Premium plan",
    time: "1h ago",
    icon: CreditCard,
    iconBg: "bg-warning-light",
    iconColor: "text-warning-foreground",
  },
];
