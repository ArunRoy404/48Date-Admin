import { create } from "zustand";
import { navigationDummyData, type NavGroup } from "@/dummyData/navigation";

interface NavigationState {
  navGroups: NavGroup[];
  activeNav: string;
  setActiveNav: (title: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  navGroups: navigationDummyData,
  activeNav: "Dashboard",
  setActiveNav: (activeNav) => set({ activeNav }),
}));
