"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { UserAvatar } from "@/components/common/UserAvatar";
import { X, Ban, Trash2, ShieldCheck } from "lucide-react";
import { useUsersStore } from "@/store/useUsersStore";
import { cn } from "@/lib/utils";

export function UserDetailDrawer() {
  const isDrawerOpen = useUsersStore((state) => state.isDrawerOpen);
  const closeUserDetail = useUsersStore((state) => state.closeUserDetail);
  const selectedUserId = useUsersStore((state) => state.selectedUserId);
  const users = useUsersStore((state) => state.users);
  const banUser = useUsersStore((state) => state.banUser);
  const deleteUser = useUsersStore((state) => state.deleteUser);

  const selectedUser = users.find((u) => u.id === selectedUserId) ?? null;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!selectedUser) return null;

  const detailItems = [
    {
      label: "Trust Score",
      value: `${selectedUser.trustScore}`,
    },
    {
      label: "Plan",
      value: selectedUser.plan,
      capitalize: true,
    },
    {
      label: "Location",
      value: selectedUser.location,
    },
    {
      label: "Age",
      value: `${selectedUser.age} years old`,
    },
    {
      label: "Total Matches",
      value: `${selectedUser.totalMatches}`,
    },
    {
      label: "Dates Completed",
      value: `${selectedUser.datesCompleted}`,
    },
    {
      label: "Photos",
      value: `${selectedUser.photosCount}`,
    },
    {
      label: "Joined",
      value: selectedUser.joined,
    },
  ];

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(open) => {
        if (!open) closeUserDetail();
      }}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent
        className={cn(
          "bg-white flex flex-col justify-between overflow-hidden shadow-2xl z-50",
          isMobile
            ? "max-h-[88vh] rounded-t-2xl p-0"
            : "fixed inset-y-0 right-0 w-[480px] max-w-[480px] h-full border-l border-border rounded-l-2xl p-0"
        )}
      >
        {/* Header (480x65) matching Figma 1:1 */}
        <DrawerHeader className="h-[65px] px-6 border-b border-border flex flex-row items-center justify-between shrink-0">
          <DrawerTitle className="text-[16px] font-semibold text-foreground tracking-tight">
            User Profile
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              onClick={closeUserDetail}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        {/* Scrollable Body matching Figma 1:1 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Hero Section (432x84) */}
          <div className="flex items-center gap-4">
            <UserAvatar
              src={selectedUser.avatarSrc}
              name={selectedUser.name}
              size="lg"
              className="w-12 h-12 rounded-full shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[18px] font-semibold text-foreground truncate">
                  {selectedUser.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-brand-crimson shrink-0" />
              </div>
              <p className="text-[14px] text-muted-foreground truncate">
                {selectedUser.email}
              </p>
              <div className="mt-1">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium capitalize",
                    selectedUser.status === "active"
                      ? "bg-[#f0fdf4] text-[#008236]"
                      : "bg-[#fef2f2] text-[#e7000b]"
                  )}
                >
                  {selectedUser.status}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details 2-Column Grid (432x288, each 210x63, bg-[#f9fafb]) */}
          <div className="grid grid-cols-2 gap-3">
            {detailItems.map((item) => (
              <div
                key={item.label}
                className="bg-[#f9fafb] rounded-xl p-3.5 border border-[#f3f4f6] flex flex-col justify-center"
              >
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </div>
                <div
                  className={cn(
                    "text-[14px] font-medium text-foreground mt-0.5 truncate",
                    item.capitalize && "capitalize"
                  )}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Actions Section (432x50) matching Figma */}
          <div className="space-y-2 pt-2">
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Actions
            </div>
            <div className="flex items-center gap-3">
              {/* Ban Button (139x30, bg-[#fef2f2], text-[#e7000b]) */}
              <button
                onClick={() => banUser(selectedUser.id)}
                className="flex-1 h-[34px] px-3.5 bg-[#fef2f2] hover:bg-[#fee2e2] text-[#e7000b] rounded-xl text-[12px] font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-transparent active:scale-95"
              >
                <Ban className="w-3.5 h-3.5 text-[#e7000b]" />
                <span>{selectedUser.status === "banned" ? "Unban" : "Ban"}</span>
              </button>

              {/* Delete Button (139x30, bg-[#fef2f2], text-[#e7000b]) */}
              <button
                onClick={() => deleteUser(selectedUser.id)}
                className="flex-1 h-[34px] px-3.5 bg-[#fef2f2] hover:bg-[#fee2e2] text-[#e7000b] rounded-xl text-[12px] font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-transparent active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5 text-[#e7000b]" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
