"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
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
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
          {/* Top Page Heading & Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[24px] md:text-[26px] font-bold text-[#111827] tracking-tight">
                Dashboard
              </h1>
              <p className="text-[14px] text-[#99a1af] mt-1 font-normal">
                Welcome back, Alex. Here&apos;s what&apos;s happening on 48Date.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-1.5 h-[34px] px-3.5 bg-white border border-[#e5e7eb] rounded-2xl text-[12px] font-medium text-[#364153] hover:bg-[#f9fafb] hover:border-[#d1d5dc] active:scale-95 transition-all shadow-2xs cursor-pointer"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 text-[#364153] ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                  strokeWidth={2}
                />
                <span>Refresh</span>
              </button>

              <button className="inline-flex items-center gap-1.5 h-[34px] px-3.5 bg-[#e11d48] hover:bg-[#be123c] rounded-2xl text-[12px] font-medium text-white shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* 7 Stat Cards */}
          <StatCards />

          {/* Mid Charts Grid (User Growth & Match Status) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <UserGrowthChart />
            </div>
            <div className="lg:col-span-1">
              <MatchStatusChart />
            </div>
          </div>

          {/* Bottom Grid (Revenue & Recent Activity) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div className="lg:col-span-1">
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
