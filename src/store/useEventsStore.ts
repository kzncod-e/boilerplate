import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CalendarEvent } from "@/components/calendar/types";

interface EventsState {
  events: CalendarEvent[];
  setEvents: (e: CalendarEvent[]) => void;
    addOrUpdateEvent: (ev: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  getEventsByDate: (dateIso: string) => CalendarEvent[];
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set, get) => ({
      events: [],
      setEvents: (e) => set({ events: e }),
      addOrUpdateEvent: (ev) =>
        set((state) => {
          const exists = state.events.find((p) => p.id === ev.id);
          if (exists) return { events: state.events.map((p) => (p.id === ev.id ? ev : p)) };
          return { events: [...state.events, ev] };
        }),
      deleteEvent: (id) => set((state) => ({ events: state.events.filter((p) => p.id !== id) })),
      getEventsByDate: (dateIso: string) => get().events.filter((e) => e.date === dateIso),
    }),
    {
      name: "optimasi-calendar-events",
      partialize: (state) => ({ events: state.events }),
    },
  ),
);

export default useEventsStore;
