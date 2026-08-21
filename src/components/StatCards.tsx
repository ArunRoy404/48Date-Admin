"use client";

import React from "react";
import {
  Users,
  Heart,
  ShieldCheck,
  CreditCard,
  Flag,
  Star,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface StatItem {
  id: string;
  title: string;
  value: string;
  subtext: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: React.ElementType;
  isPrimary?: boolean;
}

const row1Stats: StatItem[] = [
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

const row2Stats: StatItem[] = [
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

function Card({ item }: { item: StatItem }) {
  const Icon = item.icon;

  if (item.isPrimary) {
    return (
      <div className="relative bg-[#e11d48] text-white rounded-2xl p-6 border border-[#e11d48] shadow-sm flex flex-col justify-between transition-transform hover:-translate-y-0.5 duration-200">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-white" strokeWidth={1.75} />
          </div>
          {item.trend && (
            <div className="flex items-center gap-1 text-white/90 text-[12px] font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              <span>{item.trend.value}</span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="text-[32px] font-bold tracking-tight text-white leading-tight">
            {item.value}
          </div>
          <div className="text-[14px] font-medium text-white/70 mt-0.5">
            {item.title}
          </div>
          <div className="text-[12px] text-white/55 mt-1">
            {item.subtext}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-xs flex flex-col justify-between transition-transform hover:-translate-y-0.5 duration-200">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-2xl bg-[#fce7ef] flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-[#e11d48]" strokeWidth={1.75} />
        </div>
        {item.trend && (
          <div
            className={`flex items-center gap-1 text-[12px] font-semibold ${
              item.trend.isUp ? "text-[#00a63e]" : "text-[#fb2c36]"
            }`}
          >
            {item.trend.isUp ? (
              <TrendingUp className="w-3.5 h-3.5 text-[#00a63e]" strokeWidth={2} />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-[#fb2c36]" strokeWidth={2} />
            )}
            <span>{item.trend.value}</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="text-[32px] font-bold tracking-tight text-[#111827] leading-tight">
          {item.value}
        </div>
        <div className="text-[14px] font-medium text-[#6a7282] mt-0.5">
          {item.title}
        </div>
        <div className="text-[12px] text-[#99a1af] mt-1">
          {item.subtext}
        </div>
      </div>
    </div>
  );
}

export default function StatCards() {
  return (
    <div className="space-y-5">
      {/* Row 1: 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {row1Stats.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      {/* Row 2: 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {row2Stats.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
