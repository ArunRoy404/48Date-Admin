"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Reveal } from "@/components/common/Reveal";
import { useDashboardStore } from "@/store/useDashboardStore";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-foreground text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none">
        <div className="font-semibold text-white">
          {payload[0].value.toLocaleString()} Users
        </div>
        <div className="text-white/60 text-[10px]">{label}</div>
      </div>
    );
  }
  return null;
}

export default function UserGrowthChart() {
  const data = useDashboardStore((state) => state.userGrowth);

  return (
    <Reveal className="h-full">
      <div className="bg-card rounded-2xl p-6 border border-border shadow-card flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-foreground leading-tight">
              User Growth
            </h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Total vs active users
            </p>
          </div>
          <StatusBadge variant="success">+12% this month</StatusBadge>
        </div>

        {/* Recharts Area Chart */}
        <div className="mt-5 h-[210px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="userGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e11d48" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#e11d48" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="0" vertical={true} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                dy={8}
              />
              <YAxis
                domain={[0, 20000]}
                ticks={[0, 5000, 10000, 15000, 20000]}
                tickFormatter={(val) => `${val / 1000}k`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#e11d48"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#userGrowthGradient)"
                activeDot={{
                  r: 5,
                  fill: "#e11d48",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Reveal>
  );
}
