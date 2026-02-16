"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CalendarState {
    selectedDate: string;
    setSelectedDate: (d: string) => void;
    selectedMonth?: string;
    setSelectedMonth?: (m: string) => void;
}

const todayIso = new Date().toISOString().split("T")[0];

export const useCalendarStore = create<CalendarState>()(
    persist(
        (set) => ({
            selectedDate: todayIso,
            setSelectedDate: (d: string) => set({ selectedDate: d }),
            selectedMonth: todayIso.substring(0, 7), // Format as YYYY-MM
            setSelectedMonth: (m: string) => set({ selectedMonth: m }),
        }),
        {
            name: "optimasi-calendar-selected-date",
            partialize: (state) => ({
                selectedDate: state.selectedDate,
                selectedMonth: state.selectedMonth,
            }),
        },
    ),
);

export default useCalendarStore;
