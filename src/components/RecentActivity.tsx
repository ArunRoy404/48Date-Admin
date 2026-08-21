"use client";

import React from "react";
import { User, Flag, Heart, Calendar, CreditCard } from "lucide-react";

interface ActivityItem {
  id: string;
  name: string;
  action: string;
  time: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    name: "Nathan Foster",
    action: "New user registered",
    time: "2 min ago",
    icon: User,
    iconBg: "bg-[#eff6ff]",
    iconColor: "text-[#155dfc]",
  },
  {
    id: "2",
    name: "Marcus Williams",
    action: "High-severity report submitted",
    time: "15 min ago",
    icon: Flag,
    iconBg: "bg-[#fef2f2]",
    iconColor: "text-[#fb2c36]",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    action: "New match with Tyler Brooks",
    time: "23 min ago",
    icon: Heart,
    iconBg: "bg-[#fce7ef]",
    iconColor: "text-[#e11d48]",
  },
  {
    id: "4",
    name: "Sarah Chen",
    action: "Date confirmed at Café Blue, SF",
    time: "41 min ago",
    icon: Calendar,
    iconBg: "bg-[#f5f3ff]",
    iconColor: "text-[#7f22fe]",
  },
  {
    id: "5",
    name: "Aisha Johnson",
    action: "Upgraded to Premium plan",
    time: "1h ago",
    icon: CreditCard,
    iconBg: "bg-[#fffbeb]",
    iconColor: "text-[#e17100]",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col justify-between overflow-hidden h-full">
      {/* Header */}
      <div className="p-5 border-b border-[#e5e7eb]">
        <h3 className="text-[18px] font-semibold text-[#111827] leading-tight">
          Recent Activity
        </h3>
        <p className="text-[12px] text-[#99a1af] mt-0.5">Live feed</p>
      </div>

      {/* Activity List Feed */}
      <div className="divide-y divide-[#f3f4f6] flex-1 flex flex-col justify-between">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="px-4 py-3 flex items-center gap-3 hover:bg-[#f9fafb] transition-colors"
            >
              {/* Colored Rounded Icon Box */}
              <div
                className={`w-7 h-7 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} strokeWidth={2} />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-[#111827] truncate">
                  {item.name}
                </div>
                <div className="text-[12px] text-[#99a1af] truncate">
                  {item.action}
                </div>
                <div className="text-[10px] text-[#d1d5dc] mt-0.5">
                  {item.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
