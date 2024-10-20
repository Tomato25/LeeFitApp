import { create } from "zustand";

export const useUserStore = create((set) => ({
    userInfo: [],
    setUserInfo: (newUserInfo) => set((state) => ({userInfo: newUserInfo })),
    clearUserInfo: () => set((state) => ({userInfo: []}))
}))

export const useRegInfoStore = create((set) => ({
    userWeight: "",
    setUserWeight: (newUserWeight) => set ((state) => ({userWeight: newUserWeight})),
    userHeight: "",
    setUserHeight: (newUserHeight) => set ((state) => ({userHeight: newUserHeight})),
    userUnits: "metric",
    setUserUnits: (newUserUnits) => set ((state) => ({userUnits: newUserUnits})),
    userDoB: "01-01-2000",
    setUserDoB:(newUserDoB) => set ((state) => ({userDoB: newUserDoB})),
    modalVisible: false,
    setModalVisible:(newModalVisible) => set ((state) => ({modalVisible: newModalVisible})),

}))