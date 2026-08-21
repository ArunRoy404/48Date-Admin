"use client";

import React from "react";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Reveal } from "@/components/common/Reveal";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Check,
} from "lucide-react";
import { useVerificationStore } from "@/store/useVerificationStore";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ActiveVerificationCard() {
  const requests = useVerificationStore((state) => state.requests);
  const selectedRequestId = useVerificationStore((state) => state.selectedRequestId);
  const approveRequest = useVerificationStore((state) => state.approveRequest);
  const rejectRequest = useVerificationStore((state) => state.rejectRequest);
  const retryRequest = useVerificationStore((state) => state.retryRequest);

  const activeRequest =
    requests.find((r) => r.id === selectedRequestId) ?? requests[0];

  if (!activeRequest) return null;

  return (
    <Reveal delay={0.1} className="h-full">
      <div className="bg-card rounded-2xl border border-border shadow-card flex flex-col justify-between h-full p-6 space-y-6">
        {/* Header (1053x92) matching Figma 1:1 */}
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <UserAvatar
              src={activeRequest.avatarSrc}
              name={activeRequest.name}
              size="lg"
              className="w-10 h-10 rounded-full shrink-0"
            />
            <div>
              <h2 className="text-[18px] font-semibold text-foreground">
                {activeRequest.name}
              </h2>
              <p className="text-[12px] text-[#99a1af] mt-0.5">
                Submitted {activeRequest.submittedAt}
              </p>
            </div>
          </div>

          <span
            className={cn(
              "px-3 py-1 rounded-full text-[12px] font-medium capitalize",
              activeRequest.status === "approved"
                ? "bg-[#f0fdf4] text-[#008236]"
                : activeRequest.status === "rejected"
                ? "bg-[#fef2f2] text-[#e7000b]"
                : "bg-[#f3f4f6] text-[#4a5565]"
            )}
          >
            {activeRequest.status}
          </span>
        </div>

        {/* Section 1: AI Verification Result matching Figma 1:1 */}
        <div className="space-y-2.5">
          <div className="text-[10px] font-semibold text-[#99a1af] uppercase tracking-wider">
            AI Verification Result
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Confidence Card (493x84) */}
            <div className="bg-[#f9fafb] rounded-xl p-4 border border-[#f3f4f6] flex flex-col justify-center">
              <div className="text-[24px] font-bold text-foreground leading-tight">
                {activeRequest.confidenceScore}%
              </div>
              <div className="text-[12px] text-[#99a1af] mt-0.5">
                Match Confidence
              </div>
            </div>

            {/* Checklist Card (493x84) */}
            <div className="bg-[#f9fafb] rounded-xl p-4 border border-[#f3f4f6] flex flex-col justify-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#00a63e]">
                  <CheckCircle className="w-4 h-4 text-[#00a63e]" strokeWidth={2} />
                  <span>Selfie</span>
                </div>
                <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#00a63e]">
                  <CheckCircle className="w-4 h-4 text-[#00a63e]" strokeWidth={2} />
                  <span>ID</span>
                </div>
              </div>
              <div className="text-[12px] text-[#99a1af] mt-1">
                Documents
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Photo Comparison matching Figma 1:1 */}
        <div className="space-y-2.5">
          <div className="text-[10px] font-semibold text-[#99a1af] uppercase tracking-wider">
            Photo Comparison
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Live Selfie Card */}
            <div>
              <div className="text-[12px] text-[#99a1af] mb-2 font-normal">
                Live Selfie
              </div>
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted border border-border shadow-2xs">
                <Image
                  src={activeRequest.selfieUrl}
                  alt="Live Selfie"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Profile Photo Card */}
            <div>
              <div className="text-[12px] text-[#99a1af] mb-2 font-normal">
                Profile Photo
              </div>
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted border border-border shadow-2xs">
                <Image
                  src={activeRequest.idPhotoUrl}
                  alt="Profile Photo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Bottom Action Toolbar matching Figma 1:1 */}
        <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
          {/* Reject Button (448x38, bg-[#fef2f2], text-[#e7000b]) */}
          <button
            onClick={() => rejectRequest(activeRequest.id)}
            className="flex-1 h-[38px] px-4 bg-[#fef2f2] hover:bg-[#fee2e2] text-[#e7000b] rounded-xl text-[14px] font-medium inline-flex items-center justify-center gap-2 transition-all cursor-pointer border border-transparent active:scale-95"
          >
            <XCircle className="w-4 h-4 text-[#e7000b]" />
            <span>Reject</span>
          </button>

          {/* Retry Button (87x38, bg-white, border border-[#e5e7eb]) */}
          <button
            onClick={() => retryRequest(activeRequest.id)}
            className="h-[38px] px-5 bg-white hover:bg-muted border border-border text-[#4a5565] rounded-xl text-[14px] font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#4a5565]" />
            <span>Retry</span>
          </button>

          {/* Approve Button (446x38, bg-[#e11d48], text-white) */}
          <button
            onClick={() => approveRequest(activeRequest.id)}
            className="flex-1 h-[38px] px-4 bg-brand-crimson hover:bg-brand-crimson/90 text-white rounded-xl text-[14px] font-medium inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-card active:scale-95"
          >
            <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
            <span>Approve</span>
          </button>
        </div>
      </div>
    </Reveal>
  );
}
