"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Reveal } from "@/components/common/Reveal";
import { useDashboardStore } from "@/store/useDashboardStore";

function CustomBarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    const rev = payload[0]?.value || 0;

    return (
      <div className="bg-foreground text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none">
        <div className="font-semibold text-white">${rev}K Revenue</div>
        <div className="text-white/70 text-[10px]">{label}</div>
      </div>
    );
  }
  return null;
}

export default function RevenueChart() {
  const data = useDashboardStore((state) => state.revenue);

  return (
    <Reveal className="h-full">
      <div className="bg-card rounded-2xl p-6 border border-border shadow-card flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-foreground leading-tight">
              Revenue
            </h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Monthly revenue vs MRR
            </p>
          </div>
          <StatusBadge variant="brand">$183K this month</StatusBadge>
        </div>

        {/* Recharts Single-Bar Chart matching Figma 1:1 */}
        <div className="mt-5 h-[210px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                dy={8}
              />
              <YAxis
                domain={[0, 200]}
                ticks={[0, 50, 100, 150, 200]}
                tickFormatter={(val) => `$${val}k`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "transparent" }} />
              {/* Single Soft Pink Bar matching Figma */}
              <Bar
                dataKey="revenue"
                fill="var(--brand-pink)"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
                className="transition-opacity hover:opacity-85"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Reveal>
  );
}
