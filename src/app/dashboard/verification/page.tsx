"use client";

import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonButton } from "@/components/common/CommonButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { VerificationQueue } from "@/components/verification/VerificationQueue";
import { ActiveVerificationCard } from "@/components/verification/ActiveVerificationCard";
import { RotateCw } from "lucide-react";
import { useVerificationStore } from "@/store/useVerificationStore";

export default function VerificationPage() {
  const requests = useVerificationStore((state) => state.requests);
  const isRefreshing = useVerificationStore((state) => state.isRefreshing);
  const refreshQueue = useVerificationStore((state) => state.refreshQueue);

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Verification"
        description={`${pendingCount} pending in queue`}
        actions={
          <>
            <StatusBadge variant="warning">{pendingCount} Pending</StatusBadge>

            <CommonButton
              variant="outline"
              onClick={refreshQueue}
              loading={isRefreshing}
              icon={
                <RotateCw
                  className={`w-3.5 h-3.5 text-secondary-foreground ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                  strokeWidth={2}
                />
              }
            >
              Refresh
            </CommonButton>
          </>
        }
      />

      {/* 2-Column Verification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <VerificationQueue />
        </div>
        <div className="lg:col-span-2">
          <ActiveVerificationCard />
        </div>
      </div>
    </main>
  );
}
