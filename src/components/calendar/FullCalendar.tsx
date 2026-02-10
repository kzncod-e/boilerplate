"use client";

import React, { useState, useMemo } from "react";
import {
  addMonths,
  subMonths,
  formatISODate,
  formatMonthTitle,
  getMonthGrid,
  isSameMonth,
  isSameDay,
} from "./utils";
import type { CalendarEvent } from "./types";
import useCalendarStore from "@/store/useCalendarStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EventModal from "./EventModal";
import EventDetailPopup from "./EventDetailPopup";
import { COLOR_DOT } from "./colors";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  initialEvents?: CalendarEvent[];
  showSidebar?: boolean;
}

export default function FullCalendar({
  initialEvents = [],
  showSidebar = true,
}: Props) {
  const [current, setCurrent] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const selectedDate = useCalendarStore((s) => s.selectedDate);
  const setSelectedDate = useCalendarStore((s) => s.setSelectedDate);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(
    undefined,
  );

  const rows = useMemo(() => getMonthGrid(current), [current]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const e of events) {
      (map[e.date] ||= []).push(e);
    }
    return map;
  }, [events]);

  const handleSave = (ev: CalendarEvent) => {
    setEvents((prev) => {
      const exists = prev.find((p) => p.id === ev.id);
      if (exists) return prev.map((p) => (p.id === ev.id ? ev : p));
      return [...prev, ev];
    });
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setCurrent((c) => subMonths(c, 1))}
              >
                <ChevronLeft />
              </Button>
              <div className="font-semibold text-lg">
                {formatMonthTitle(current)}
              </div>
              <Button
                variant="ghost"
                onClick={() => setCurrent((c) => addMonths(c, 1))}
              >
                <ChevronRight />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrent(new Date());
                  setSelectedDate(formatISODate(new Date()));
                }}
              >
                Today
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Add Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div
                  key={d}
                  className="text-sm text-muted-foreground text-center"
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 mt-3">
              {rows.flat().map((day) => {
                const iso = formatISODate(day);
                const dayEvents = eventsByDate[iso] || [];
                const today = isSameDay(day, new Date());
                const inMonth = isSameMonth(day, current);
                return (
                  <div
                    key={iso}
                    onClick={() => {
                      // select the date globally (update sidebar)
                      setSelectedDate(iso);
                    }}
                    className={`p-3 rounded border ${today ? "ring-1 ring-primary" : ""} ${inMonth ? "" : "opacity-60"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="text-sm font-medium">{day.getDate()}</div>
                      <div className="flex gap-1">
                        {dayEvents.slice(0, 3).map((e) => (
                          <span key={e.id} className={COLOR_DOT[e.color]} />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      {dayEvents.slice(0, 2).map((e) => (
                        <div
                          key={e.id}
                          className="flex items-center justify-between text-sm py-1"
                        >
                          <div className="flex items-center gap-2">
                            <span className={COLOR_DOT[e.color]} />
                            <div className="truncate max-w-[8rem]">
                              {e.title}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-right">
                      {dayEvents.length > 0 ? (
                        <EventDetailPopup
                          events={dayEvents}
                          onEdit={(ev) => {
                            setSelectedEvent(ev);
                            setSelectedDate(iso);
                            setModalOpen(true);
                          }}
                          onDelete={(id) => handleDelete(id)}
                        />
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDate(iso);
                            setSelectedEvent(undefined);
                            setModalOpen(true);
                          }}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {showSidebar && (
        <aside className="col-span-4">
          <Card>
            <CardHeader>
              <div className="font-semibold">Events</div>
              <div className="text-sm text-muted-foreground">
                {selectedDate}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(eventsByDate[selectedDate] || []).map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className={COLOR_DOT[ev.color]} />
                      <div>
                        <div className="font-medium">{ev.title}</div>
                        {ev.description && (
                          <div className="text-sm text-muted-foreground">
                            {ev.description}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedEvent(ev);
                          setSelectedDate(ev.date);
                          setModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(ev.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
                {(eventsByDate[selectedDate] || []).length === 0 && (
                  <div className="text-sm text-muted-foreground">No events</div>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      )}

      <EventModal
        open={modalOpen}
        onOpenChange={(v) => {
          setModalOpen(v);
          if (!v) setSelectedEvent(undefined);
        }}
        dateIso={selectedDate}
        initial={selectedEvent}
        onSave={(ev) => {
          handleSave(ev);
          setSelectedEvent(undefined);
        }}
        onDelete={(id) => {
          handleDelete(id);
          setSelectedEvent(undefined);
        }}
      />
    </div>
  );
}
