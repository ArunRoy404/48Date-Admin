import { create } from "zustand";
import { row1StatsDummyData, row2StatsDummyData, type StatItem } from "@/dummyData/stats";
import { userGrowthDummyData, type UserGrowthDataPoint } from "@/dummyData/userGrowth";
import { matchStatusDummyData, type MatchStatusCategory } from "@/dummyData/matchStatus";
import { revenueDummyData, type RevenueDataPoint } from "@/dummyData/revenue";
import { recentActivityDummyData, type ActivityItem } from "@/dummyData/activity";

interface DashboardState {
  // Data
  row1Stats: StatItem[];
  row2Stats: StatItem[];
  userGrowth: UserGrowthDataPoint[];
  matchStatus: MatchStatusCategory[];
  revenue: RevenueDataPoint[];
  activities: ActivityItem[];

  // UI state
  isRefreshing: boolean;
  hoveredGrowthIndex: number | null;
  activeMatchCategoryIndex: number | null;

  // Actions
  setIsRefreshing: (loading: boolean) => void;
  refreshDashboard: () => Promise<void>;
  setHoveredGrowthIndex: (index: number | null) => void;
  setActiveMatchCategoryIndex: (index: number | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  row1Stats: row1StatsDummyData,
  row2Stats: row2StatsDummyData,
  userGrowth: userGrowthDummyData,
  matchStatus: matchStatusDummyData,
  revenue: revenueDummyData,
  activities: recentActivityDummyData,

  isRefreshing: false,
  hoveredGrowthIndex: null,
  activeMatchCategoryIndex: null,

  setIsRefreshing: (isRefreshing) => set({ isRefreshing }),

  refreshDashboard: async () => {
    set({ isRefreshing: true });
    await new Promise((resolve) => setTimeout(resolve, 750));
    set({ isRefreshing: false });
  },

  setHoveredGrowthIndex: (hoveredGrowthIndex) => set({ hoveredGrowthIndex }),
  setActiveMatchCategoryIndex: (activeMatchCategoryIndex) => set({ activeMatchCategoryIndex }),
}));
