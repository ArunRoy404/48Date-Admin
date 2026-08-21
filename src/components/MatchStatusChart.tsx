"use client";

import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Reveal } from "@/components/common/Reveal";

interface StatusCategory {
  id: string;
  name: string;
  count: number;
  formattedCount: string;
  color: string;
}

const categories: StatusCategory[] = [
  {
    id: "active",
    name: "Active",
    count: 4280,
    formattedCount: "4,280",
    color: "#22c55e",
  },
  {
    id: "completed",
    name: "Completed",
    count: 2840,
    formattedCount: "2,840",
    color: "#e11d48",
  },
  {
    id: "expired",
    name: "Expired",
    count: 1560,
    formattedCount: "1,560",
    color: "#f59e0b",
  },
  {
    id: "cancelled",
    name: "Cancelled",
    count: 820,
    formattedCount: "820",
    color: "#94a3b8",
  },
];

const totalCount = categories.reduce((sum, c) => sum + c.count, 0);

function CustomPieTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: StatusCategory }> }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-foreground text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none">
        <div className="font-semibold text-white">{data.name}</div>
        <div className="text-white/70 text-[10px]">{data.formattedCount} ({Math.round((data.count / totalCount) * 100)}%)</div>
      </div>
    );
  }
  return null;
}

export default function MatchStatusChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Reveal delay={0.1} className="h-full">
      <div className="bg-card rounded-2xl p-6 border border-border shadow-card flex flex-col justify-between h-full">
        {/* Header */}
        <div>
          <h3 className="text-[18px] font-semibold text-foreground leading-tight">
            Match Status
          </h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">Live distribution</p>
        </div>

        {/* Recharts Donut Graphic */}
        <div className="relative w-full h-[160px] flex items-center justify-center my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={categories}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {categories.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.id}`}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={activeIndex === index ? 3 : 1}
                    className="transition-all cursor-pointer outline-none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Info Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {activeIndex !== null && categories[activeIndex] ? (
              <>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {categories[activeIndex].name}
                </span>
                <span className="text-[15px] font-bold text-foreground">
                  {categories[activeIndex].formattedCount}
                </span>
              </>
            ) : (
              <>
                <span className="text-[10px] font-medium text-muted-foreground">
                  Total
                </span>
                <span className="text-[15px] font-bold text-foreground">
                  {totalCount.toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Categories Legend List */}
        <div className="space-y-2 mt-2">
          {categories.map((cat, idx) => {
            const isHovered = activeIndex === idx;

            return (
              <div
                key={cat.id}
                className={`flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                  isHovered ? "bg-muted" : ""
                }`}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-[14px] text-slate-subtle font-normal">
                    {cat.name}
                  </span>
                </div>
                <span className="text-[14px] font-semibold text-foreground">
                  {cat.formattedCount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
