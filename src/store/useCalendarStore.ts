import { create } from "zustand";

interface CalendarState {
  selectedDate: string;
  setSelectedDate: (d: string) => void;
}

const todayIso = new Date().toISOString().split("T")[0];

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: todayIso,
  setSelectedDate: (d: string) => set({ selectedDate: d }),
}));

export default useCalendarStore;
