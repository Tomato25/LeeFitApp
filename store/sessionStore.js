import { create } from "zustand";

export const useUserStore = create((set) => ({
    userInfo: [],
    setUserInfo: (newUserInfo) => set((state) => ({userInfo: newUserInfo })),
    clearUserInfo: () => set((state) => ({userInfo: []}))
}))