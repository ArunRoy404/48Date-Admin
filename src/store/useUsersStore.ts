import { create } from "zustand";
import { usersDummyData, type UserRecord } from "@/dummyData/users";

interface UsersState {
  users: UserRecord[];
  searchQuery: string;
  statusFilter: "all" | "active" | "banned";
  selectedUserId: string | null;
  isDrawerOpen: boolean;

  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: "all" | "active" | "banned") => void;
  openUserDetail: (userId: string) => void;
  closeUserDetail: () => void;
  banUser: (userId: string) => void;
  deleteUser: (userId: string) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: usersDummyData,
  searchQuery: "",
  statusFilter: "all",
  selectedUserId: null,
  isDrawerOpen: false,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),

  openUserDetail: (selectedUserId) => set({ selectedUserId, isDrawerOpen: true }),
  closeUserDetail: () => set({ isDrawerOpen: false }),

  banUser: (userId) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, status: "banned" } : u
      ),
    })),

  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId),
      isDrawerOpen: false,
      selectedUserId: null,
    })),
}));
