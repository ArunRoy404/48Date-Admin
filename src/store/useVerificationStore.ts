import { create } from "zustand";
import { verificationRequestsDummyData, type VerificationRequest } from "@/dummyData/verifications";

interface VerificationState {
  requests: VerificationRequest[];
  selectedRequestId: string;
  isRefreshing: boolean;

  setSelectedRequestId: (id: string) => void;
  refreshQueue: () => Promise<void>;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
  retryRequest: (id: string) => void;
}

export const useVerificationStore = create<VerificationState>((set, get) => ({
  requests: verificationRequestsDummyData,
  selectedRequestId: "verif-3", // Priya Sharma by default as in Figma
  isRefreshing: false,

  setSelectedRequestId: (selectedRequestId) => set({ selectedRequestId }),

  refreshQueue: async () => {
    set({ isRefreshing: true });
    await new Promise((resolve) => setTimeout(resolve, 750));
    set({ isRefreshing: false });
  },

  approveRequest: (id) =>
    set((state) => {
      const updated = state.requests.map((r) =>
        r.id === id ? { ...r, status: "approved" as const } : r
      );
      const nextPending = updated.find((r) => r.id !== id && r.status === "pending");
      return {
        requests: updated,
        selectedRequestId: nextPending?.id ?? state.selectedRequestId,
      };
    }),

  rejectRequest: (id) =>
    set((state) => {
      const updated = state.requests.map((r) =>
        r.id === id ? { ...r, status: "rejected" as const } : r
      );
      const nextPending = updated.find((r) => r.id !== id && r.status === "pending");
      return {
        requests: updated,
        selectedRequestId: nextPending?.id ?? state.selectedRequestId,
      };
    }),

  retryRequest: (id) =>
    set((state) => {
      const updated = state.requests.map((r) =>
        r.id === id ? { ...r, status: "pending" as const } : r
      );
      return { requests: updated };
    }),
}));
