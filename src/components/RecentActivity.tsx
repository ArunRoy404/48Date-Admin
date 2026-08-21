"use client";

import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { useDashboardStore } from "@/store/useDashboardStore";

export default function RecentActivity() {
  const activities = useDashboardStore((state) => state.activities);

  return (
    <Reveal delay={0.15} className="h-full">
      <div className="bg-card rounded-2xl border border-border shadow-card flex flex-col justify-between overflow-hidden h-full">
        {/* Header */}
        <div className="p-5 border-b border-border">
          <h3 className="text-[18px] font-semibold text-foreground leading-tight">
            Recent Activity
          </h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">Live feed</p>
        </div>

        {/* Activity List Feed */}
        <div className="divide-y divide-[#f3f4f6] flex-1 flex flex-col justify-between">
          {activities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors"
              >
                {/* Colored Rounded Icon Box */}
                <div
                  className={`w-7 h-7 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} strokeWidth={2} />
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-foreground truncate">
                    {item.name}
                  </div>
                  <div className="text-[12px] text-muted-foreground truncate">
                    {item.action}
                  </div>
                  <div className="text-[10px] text-muted-foreground/60 mt-0.5">
                    {item.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
