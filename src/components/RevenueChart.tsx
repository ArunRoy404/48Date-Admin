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

interface RevenueDataPoint {
  month: string;
  mrr: number;
  total: number;
}

const data: RevenueDataPoint[] = [
  { month: "Jan", mrr: 35, total: 48 },
  { month: "Feb", mrr: 48, total: 64 },
  { month: "Mar", mrr: 59, total: 80 },
  { month: "Apr", mrr: 74, total: 98 },
  { month: "May", mrr: 93, total: 125 },
  { month: "Jun", mrr: 123, total: 158 },
  { month: "Jul", mrr: 152, total: 183 },
];

function CustomBarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    const mrr = payload.find((p) => p.dataKey === "mrr")?.value || 0;
    const total = payload.find((p) => p.dataKey === "total")?.value || 0;

    return (
      <div className="bg-foreground text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none">
        <div className="font-semibold text-white">${total}K Total Revenue</div>
        <div className="text-white/70 text-[10px]">
          MRR: ${mrr}K · {label}
        </div>
      </div>
    );
  }
  return null;
}

export default function RevenueChart() {
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

        {/* Recharts Bar Chart */}
        <div className="mt-5 h-[210px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barGap={-36}
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
              <Tooltip content={<CustomBarTooltip />} />
              {/* Background Target/Total Bar */}
              <Bar
                dataKey="total"
                fill="var(--brand-pink)"
                radius={[8, 8, 0, 0]}
                maxBarSize={44}
              />
              {/* Foreground MRR Bar */}
              <Bar
                dataKey="mrr"
                fill="var(--brand-crimson)"
                radius={[4, 4, 0, 0]}
                maxBarSize={44}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Reveal>
  );
}
