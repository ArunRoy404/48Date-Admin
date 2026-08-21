"use client";

import React, { useState } from "react";

interface MonthlyRevenue {
  month: string;
  mrr: number; // in thousands
  total: number; // in thousands
  displayTotal: string;
  displayMrr: string;
}

const data: MonthlyRevenue[] = [
  { month: "Jan", mrr: 35, total: 48, displayTotal: "$48k", displayMrr: "$35k" },
  { month: "Feb", mrr: 48, total: 64, displayTotal: "$64k", displayMrr: "$48k" },
  { month: "Mar", mrr: 59, total: 80, displayTotal: "$80k", displayMrr: "$59k" },
  { month: "Apr", mrr: 74, total: 98, displayTotal: "$98k", displayMrr: "$74k" },
  { month: "May", mrr: 93, total: 125, displayTotal: "$125k", displayMrr: "$93k" },
  { month: "Jun", mrr: 123, total: 158, displayTotal: "$158k", displayMrr: "$123k" },
  { month: "Jul", mrr: 152, total: 183, displayTotal: "$183k", displayMrr: "$152k" },
];

const yLabels = ["$200k", "$150k", "$100k", "$50k", "$0k"];

export default function RevenueChart() {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>("Jul");

  const maxVal = 200;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] font-semibold text-[#111827] leading-tight">
            Revenue
          </h3>
          <p className="text-[12px] text-[#99a1af] mt-0.5">
            Monthly revenue vs MRR
          </p>
        </div>
        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold text-[#e11d48] bg-[#fce7ef] border border-[#fbcfe8]">
          $183K this month
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="relative mt-6 pt-4 pb-2">
        {/* Y Axis & Grid Lines */}
        <div className="space-y-7 relative">
          {yLabels.map((label, idx) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-10 text-right text-[11px] font-normal text-[#9ca3af] shrink-0">
                {label}
              </span>
              <div className="flex-1 h-px bg-[#f1f5f9]" />
            </div>
          ))}
        </div>

        {/* Bars Container Overlay */}
        <div className="absolute inset-0 left-12 right-4 top-2 bottom-6 flex items-end justify-between px-2 sm:px-6">
          {data.map((item) => {
            const isHovered = hoveredMonth === item.month;
            const barHeightPct = (item.total / maxVal) * 100;
            const mrrHeightPct = (item.mrr / item.total) * 100;

            return (
              <div
                key={item.month}
                className="flex flex-col items-center group relative cursor-pointer h-full justify-end"
                onMouseEnter={() => setHoveredMonth(item.month)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Floating Tooltip Indicator */}
                {isHovered && (
                  <div className="absolute -top-7 bg-[#111827] text-white text-[11px] font-medium px-2 py-1 rounded-md shadow-md whitespace-nowrap z-20 pointer-events-none transform -translate-y-1">
                    <span className="font-semibold text-white">{item.displayTotal}</span> (MRR {item.displayMrr})
                  </div>
                )}

                {/* Dual-layer Bar */}
                <div
                  className={`w-9 sm:w-12 rounded-t-lg relative overflow-hidden transition-all duration-200 ${
                    isHovered ? "ring-2 ring-[#e11d48]/20" : ""
                  }`}
                  style={{
                    height: `${barHeightPct}%`,
                    backgroundColor: "#fce7ef",
                  }}
                >
                  {/* MRR Solid Fill */}
                  <div
                    className="w-full absolute bottom-0 bg-[#e11d48] rounded-t-sm transition-all duration-300"
                    style={{
                      height: `${mrrHeightPct}%`,
                    }}
                  />
                </div>

                {/* Month Label */}
                <span
                  className={`mt-2 text-[11px] font-medium transition-colors ${
                    isHovered ? "text-[#111827] font-semibold" : "text-[#9ca3af]"
                  }`}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
