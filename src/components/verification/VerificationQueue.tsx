"use client";

import React from "react";
import { UserAvatar } from "@/components/common/UserAvatar";
import { useVerificationStore } from "@/store/useVerificationStore";
import { Reveal } from "@/components/common/Reveal";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerificationQueue() {
  const requests = useVerificationStore((state) => state.requests);
  const selectedRequestId = useVerificationStore((state) => state.selectedRequestId);
  const setSelectedRequestId = useVerificationStore((state) => state.setSelectedRequestId);

  return (
    <Reveal className="h-full">
      <div className="bg-card rounded-2xl border border-border shadow-card flex flex-col h-full overflow-hidden">
        {/* Header matching Figma 1:1 */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-[12px] font-semibold text-slate-subtle uppercase tracking-wider">
            All Request
          </h3>
        </div>

        {/* Requests List */}
        <div className="divide-y divide-border/60 flex-1 overflow-y-auto">
          {requests.map((item) => {
            const isSelected = selectedRequestId === item.id;
            const confidenceColor =
              item.confidenceScore >= 80
                ? "bg-[#f0fdf4] text-[#008236]"
                : item.confidenceScore >= 50
                ? "bg-[#fffbeb] text-[#bb4d00]"
                : "bg-[#fef2f2] text-[#e7000b]";

            return (
              <div
                key={item.id}
                onClick={() => setSelectedRequestId(item.id)}
                className={cn(
                  "p-4 flex flex-col gap-2 cursor-pointer transition-all hover:bg-muted/40",
                  isSelected
                    ? "bg-brand-pink/30 border-l-4 border-brand-crimson pl-3"
                    : "border-l-4 border-transparent"
                )}
              >
                {/* Top Row: Avatar + Name + Confidence Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <UserAvatar
                      src={item.avatarSrc}
                      name={item.name}
                      size="md"
                      className="w-9 h-9 shrink-0 rounded-full"
                    />
                    <div className="text-[14px] font-medium text-foreground truncate">
                      {item.name}
                    </div>
                  </div>

                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[12px] font-medium shrink-0",
                      confidenceColor
                    )}
                  >
                    {item.confidenceScore}%
                  </span>
                </div>

                {/* Bottom Row: Timestamp with clock icon */}
                <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#99a1af] pl-12">
                  <Clock className="w-3.5 h-3.5 text-[#99a1af]" strokeWidth={2} />
                  <span>{item.submittedAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
