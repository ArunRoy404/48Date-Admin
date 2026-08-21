"use client";

import React, { useState } from "react";
import StatCards from "@/components/StatCards";
import UserGrowthChart from "@/components/UserGrowthChart";
import MatchStatusChart from "@/components/MatchStatusChart";
import RevenueChart from "@/components/RevenueChart";
import RecentActivity from "@/components/RecentActivity";
import { RotateCw, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] w-full mx-auto">
      {/* Top Page Heading & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] md:text-[26px] font-bold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-[14px] text-muted-foreground mt-1 font-normal">
            Welcome back, Alex. Here&apos;s what&apos;s happening on 48Date.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 h-[34px] px-3.5 bg-white border border-border rounded-2xl text-[12px] font-medium text-secondary-foreground hover:bg-muted hover:border-muted-foreground/30 active:scale-95 transition-all shadow-card cursor-pointer"
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-secondary-foreground ${
                isRefreshing ? "animate-spin" : ""
              }`}
              strokeWidth={2}
            />
            <span>Refresh</span>
          </button>

          <button className="inline-flex items-center gap-1.5 h-[34px] px-3.5 bg-brand-crimson hover:bg-brand-crimson/90 rounded-2xl text-[12px] font-medium text-white shadow-card hover:shadow active:scale-95 transition-all cursor-pointer">
            <ArrowUpRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 7 Stat Metric Cards */}
      <StatCards />

      {/* Middle Charts Grid (User Growth & Match Status) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        <div className="lg:col-span-2">
          <UserGrowthChart />
        </div>
        <div className="lg:col-span-1">
          <MatchStatusChart />
        </div>
      </div>

      {/* Bottom Grid (Revenue & Recent Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </main>
  );
}
