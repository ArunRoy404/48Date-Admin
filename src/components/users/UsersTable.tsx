"use client";

import React from "react";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Eye, Ban, Trash2, Shield } from "lucide-react";
import { useUsersStore } from "@/store/useUsersStore";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

export function UsersTable() {
  const users = useUsersStore((state) => state.users);
  const searchQuery = useUsersStore((state) => state.searchQuery);
  const statusFilter = useUsersStore((state) => state.statusFilter);
  const openUserDetail = useUsersStore((state) => state.openUserDetail);
  const banUser = useUsersStore((state) => state.banUser);
  const deleteUser = useUsersStore((state) => state.deleteUser);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Reveal>
      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-[12px] font-semibold text-slate-subtle uppercase tracking-wider select-none">
                <th className="py-3.5 px-5">User</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Trust Score</th>
                <th className="py-3.5 px-4">Plan</th>
                <th className="py-3.5 px-4">Joined</th>
                <th className="py-3.5 px-4">Last Active</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-[14px]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    No users found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      onClick={() => openUserDetail(user.id)}
                      className="hover:bg-muted/40 transition-colors cursor-pointer group"
                    >
                      {/* User Column (Avatar + Name + Email) */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <UserAvatar
                            src={user.avatarSrc}
                            name={user.name}
                            size="md"
                            className="shrink-0 rounded-full"
                          />
                          <div className="min-w-0">
                            <div className="font-semibold text-foreground truncate group-hover:text-brand-crimson transition-colors">
                              {user.name}
                            </div>
                            <div className="text-[12px] text-muted-foreground truncate">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status Badge matching Figma */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium capitalize",
                            user.status === "active"
                              ? "bg-[#f0fdf4] text-[#008236]"
                              : "bg-[#fef2f2] text-[#e7000b]"
                          )}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Trust Score */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground">
                          <Shield
                            className={cn(
                              "w-3.5 h-3.5",
                              user.trustScore >= 80
                                ? "text-success"
                                : user.trustScore >= 50
                                ? "text-warning"
                                : "text-destructive"
                            )}
                            strokeWidth={2}
                          />
                          <span>{user.trustScore}</span>
                        </div>
                      </td>

                      {/* Plan Badge matching Figma */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium capitalize",
                            user.plan === "premium"
                              ? "bg-[#fce7ef] text-[#e11d48] font-semibold"
                              : "bg-[#f3f4f6] text-[#4a5565]"
                          )}
                        >
                          {user.plan}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-4 text-muted-foreground text-[14px]">
                        {user.joined}
                      </td>

                      {/* Last Active */}
                      <td className="py-3.5 px-4 text-muted-foreground text-[14px]">
                        {user.lastActive}
                      </td>

                      {/* Action Column with 3 Icon Buttons matching Figma 1:1 */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* View Profile Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openUserDetail(user.id);
                            }}
                            title="View Profile"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-subtle hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </button>

                          {/* Deactivate / Ban User Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              banUser(user.id);
                            }}
                            title={user.status === "banned" ? "Unban user" : "Deactivate user"}
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer",
                              user.status === "banned"
                                ? "text-warning-foreground hover:bg-warning-light"
                                : "text-slate-subtle hover:text-warning-foreground hover:bg-warning-light"
                            )}
                          >
                            <Ban className="w-4 h-4" />
                          </button>

                          {/* Delete User Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUser(user.id);
                            }}
                            title="Delete user"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-subtle hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
