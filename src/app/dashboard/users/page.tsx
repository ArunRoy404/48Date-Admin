"use client";

import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonButton } from "@/components/common/CommonButton";
import { FilterTabs } from "@/components/common/FilterTabs";
import { SearchInput } from "@/components/common/SearchInput";
import { UsersTable } from "@/components/users/UsersTable";
import { UserDetailDrawer } from "@/components/users/UserDetailDrawer";
import { Filter, ArrowUpRight } from "lucide-react";
import { useUsersStore } from "@/store/useUsersStore";

export default function UsersPage() {
  const users = useUsersStore((state) => state.users);
  const statusFilter = useUsersStore((state) => state.statusFilter);
  const setStatusFilter = useUsersStore((state) => state.setStatusFilter);
  const searchQuery = useUsersStore((state) => state.searchQuery);
  const setSearchQuery = useUsersStore((state) => state.setSearchQuery);

  const activeCount = users.filter((u) => u.status === "active").length;
  const bannedCount = users.filter((u) => u.status === "banned").length;

  const filterOptions = [
    { label: "All", value: "all", count: users.length },
    { label: "Active", value: "active", count: activeCount },
    { label: "Banned", value: "banned", count: bannedCount },
  ];

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Users"
        description={`${users.length} total users · 13,421 active today`}
        actions={
          <>
            <CommonButton
              variant="outline"
              icon={<Filter className="w-3.5 h-3.5 text-secondary-foreground" />}
            >
              Filter
            </CommonButton>

            <CommonButton
              variant="brand"
              icon={<ArrowUpRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />}
            >
              Export
            </CommonButton>
          </>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <FilterTabs
          options={filterOptions}
          activeValue={statusFilter}
          onChange={(val) => setStatusFilter(val as "all" | "active" | "banned")}
        />

        <div className="w-full sm:w-[280px]">
          <SearchInput
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>

      {/* Users Table */}
      <UsersTable />

      {/* User Detail Drawer (Slides from Right on Desktop, Bottom on Mobile) */}
      <UserDetailDrawer />
    </main>
  );
}
