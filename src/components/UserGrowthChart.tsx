"use client";

import React, { useState } from "react";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Reveal } from "@/components/common/Reveal";

interface DataPoint {
  month: string;
  total: number;
  active: number;
  label: string;
}

const data: DataPoint[] = [
  { month: "Jan", total: 3200, active: 1800, label: "3.2k" },
  { month: "Feb", total: 4600, active: 2700, label: "4.6k" },
  { month: "Mar", total: 6400, active: 3900, label: "6.4k" },
  { month: "Apr", total: 8500, active: 5200, label: "8.5k" },
  { month: "May", total: 11200, active: 7100, label: "11.2k" },
  { month: "Jun", total: 14800, active: 9400, label: "14.8k" },
  { month: "Jul", total: 18347, active: 11800, label: "18.3k" },
];

const yLabels = ["20k", "15k", "10k", "5k", "0k"];

export default function UserGrowthChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(6);

  // Chart dimensions in SVG viewBox
  const width = 860;
  const height = 180;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 20000;

  // Compute coordinates for data points
  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.total / maxVal) * chartHeight;
    return { x, y, ...d };
  });

  // Generate smooth SVG path
  const pathD = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, "");

  // Area path (closed at bottom)
  const areaD = `${pathD} L ${points[points.length - 1].x} ${
    paddingTop + chartHeight
  } L ${points[0].x} ${paddingTop + chartHeight} Z`;

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

        {/* Interactive Chart */}
        <div className="relative mt-5 h-[210px] w-full">
          <svg
            viewBox={`0 0 ${width} ${height + 10}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="userGrowthAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {[0, 1, 2, 3, 4].map((step) => {
              const y = paddingTop + (step / 4) * chartHeight;
              return (
                <g key={step}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingLeft - 10}
                    y={y + 3.5}
                    textAnchor="end"
                    fill="#9ca3af"
                    fontSize="11"
                    fontFamily="var(--font-inter), sans-serif"
                  >
                    {yLabels[step]}
                  </text>
                </g>
              );
            })}

            {/* Vertical Grid Lines & X Labels */}
            {points.map((pt, idx) => (
              <g key={idx}>
                <line
                  x1={pt.x}
                  y1={paddingTop}
                  x2={pt.x}
                  y2={paddingTop + chartHeight}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={pt.x}
                  y={paddingTop + chartHeight + 18}
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="11"
                  fontFamily="var(--font-inter), sans-serif"
                >
                  {pt.month}
                </text>
              </g>
            ))}

            {/* Gradient Area */}
            <path d={areaD} fill="url(#userGrowthAreaGradient)" />

            {/* Main Spline Curve Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#e11d48"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Interactive Data Nodes */}
            {points.map((pt, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <g
                  key={idx}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="14"
                    fill="transparent"
                  />
                  {isHovered && (
                    <>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="7"
                        fill="#e11d48"
                        fillOpacity="0.2"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="4"
                        fill="#e11d48"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip */}
          {hoveredIndex !== null && points[hoveredIndex] && (
            <div
              className="absolute -top-1 bg-foreground text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 transition-all duration-150 z-10"
              style={{
                left: `${(points[hoveredIndex].x / width) * 100}%`,
                top: `${(points[hoveredIndex].y / height) * 100 - 30}%`,
              }}
            >
              <div className="font-semibold text-white">
                {points[hoveredIndex].total.toLocaleString()} Users
              </div>
              <div className="text-white/60 text-[10px]">
                {points[hoveredIndex].month}
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
