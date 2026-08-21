"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonButton } from "@/components/common/CommonButton";
import StatCards from "@/components/StatCards";
import UserGrowthChart from "@/components/UserGrowthChart";
import MatchStatusChart from "@/components/MatchStatusChart";
import RevenueChart from "@/components/RevenueChart";
import RecentActivity from "@/components/RecentActivity";
import { RotateCw, ArrowUpRight } from "lucide-react";

export default function OverviewPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] w-full mx-auto">
      {/* Reusable PageHeader with Reusable CommonButtons */}
      <PageHeader
        title="Dashboard"
        description="Welcome back, Alex. Here's what's happening on 48Date."
        actions={
          <>
            <CommonButton
              variant="outline"
              onClick={handleRefresh}
              icon={
                <RotateCw
                  className={`w-3.5 h-3.5 text-secondary-foreground ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                  strokeWidth={2}
                />
              }
            >
              Refresh
            </CommonButton>

            <CommonButton
              variant="brand"
              icon={<ArrowUpRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />}
            >
              Export
            </CommonButton>
          </>
        }
      />

      {/* 7 Metric Stat Cards */}
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
