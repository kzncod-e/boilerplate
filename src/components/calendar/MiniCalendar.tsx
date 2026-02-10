"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  formatMonthTitle,
  getMonthGrid,
  formatISODate,
  isSameDay,
  isSameMonth,
} from "./utils";
import type { CalendarEvent } from "./types";
import useCalendarStore from "@/store/useCalendarStore";
import { COLOR_DOT } from "./colors";
import EventModal from "./EventModal";
import EventDetailPopup from "./EventDetailPopup";

interface Props {
  events?: CalendarEvent[];
}

export default function MiniCalendar({ events = [] }: Props) {
  const [current, setCurrent] = useState(new Date());
  const selectedDate = useCalendarStore((s) => s.selectedDate);
  const setSelectedDate = useCalendarStore((s) => s.setSelectedDate);
  const [modalOpen, setModalOpen] = useState(false);
  const [localEvents, setLocalEvents] = useState<CalendarEvent[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(
    undefined,
  );

  const rows = getMonthGrid(current);

  const eventsByDate = localEvents.reduce<Record<string, CalendarEvent[]>>(
    (acc, ev) => {
      acc[ev.date] = acc[ev.date] || [];
      acc[ev.date].push(ev);
      return acc;
    },
    {},
  );

  const onDateClick = (d: Date) => {
    const iso = formatISODate(d);
    // only select the date (update global store) — do not auto-open the modal
    setSelectedDate(iso);
    setSelectedEvent(undefined);
  };

  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setCurrent((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))
            }
            className="p-1 rounded hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="font-semibold">{formatMonthTitle(current)}</div>
          <button
            onClick={() =>
              setCurrent((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))
            }
            className="p-1 rounded hover:bg-gray-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-7 text-xs text-center gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-1 text-muted-foreground">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mt-2">
          {rows.flat().map((day) => {
            const iso = formatISODate(day);
            const dayEvents = eventsByDate[iso] || [];
            const isToday = isSameDay(day, new Date());
            const inMonth = isSameMonth(day, current);
            return (
              <button
                key={iso}
                onClick={() => onDateClick(day)}
                className={`p-2 rounded hover:bg-muted/30 transition text-left ${inMonth ? "" : "text-muted-foreground"}`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`text-sm ${isToday ? "font-semibold text-primary" : ""}`}
                  >
                    {day.getDate()}
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span key={e.id} className={COLOR_DOT[e.color]} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>

      <EventModal
        open={modalOpen}
        onOpenChange={(v) => {
          setModalOpen(v);
          if (!v) setSelectedEvent(undefined);
        }}
        dateIso={selectedDate ?? formatISODate(new Date())}
        initial={selectedEvent}
        onSave={(ev) => {
          setLocalEvents((prev) => {
            const exists = prev.find((p) => p.id === ev.id);
            if (exists) return prev.map((p) => (p.id === ev.id ? ev : p));
            return [...prev, ev];
          });
          setSelectedEvent(undefined);
        }}
        onDelete={(id) => {
          setLocalEvents((prev) => prev.filter((p) => p.id !== id));
          setSelectedEvent(undefined);
        }}
      />
    </Card>
  );
}
