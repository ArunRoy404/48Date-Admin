"use client";

import React, { useState } from "react";
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

export default function MatchStatusChart() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // SVG Donut metrics
  const size = 152;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

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

        {/* Donut Graphic */}
        <div className="flex justify-center items-center my-4">
          <div className="relative w-[152px] h-[152px]">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="transform -rotate-90"
            >
              {categories.map((cat) => {
                const percent = cat.count / totalCount;
                const rotation = accumulatedPercent * 360;
                accumulatedPercent += percent;

                const isHovered = activeCategory === cat.id;

                return (
                  <circle
                    key={cat.id}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={cat.color}
                    strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                    strokeDasharray={`${circumference * percent} ${circumference}`}
                    strokeDashoffset={0}
                    transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setActiveCategory(cat.id)}
                    onMouseLeave={() => setActiveCategory(null)}
                  />
                );
              })}
            </svg>

            {/* Center Info on Hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {activeCategory ? (
                <>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {categories.find((c) => c.id === activeCategory)?.name}
                  </span>
                  <span className="text-[15px] font-bold text-foreground">
                    {categories.find((c) => c.id === activeCategory)?.formattedCount}
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
        </div>

        {/* Categories Legend List */}
        <div className="space-y-2 mt-2">
          {categories.map((cat) => {
            const isHovered = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                className={`flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                  isHovered ? "bg-muted" : ""
                }`}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onMouseLeave={() => setActiveCategory(null)}
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
