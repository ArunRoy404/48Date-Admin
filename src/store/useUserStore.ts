import { create } from "zustand";
import { currentUserDummyData, type UserProfile } from "@/dummyData/user";

interface UserState {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: currentUserDummyData,
  setCurrentUser: (currentUser) => set({ currentUser }),
}));
