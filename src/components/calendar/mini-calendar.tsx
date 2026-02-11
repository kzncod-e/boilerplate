"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import useEventsStore from "@/store/useEventsStore";
import { COLOR_DOT } from "./colors";
import EventModal from "./event-modal";

interface Props {
    events?: CalendarEvent[];
}

export default function MiniCalendar({ events = [] }: Props) {
    const [current, setCurrent] = useState(new Date());
    const selectedDate = useCalendarStore((s) => s.selectedDate);
    const setSelectedDate = useCalendarStore((s) => s.setSelectedDate);
    const [modalOpen, setModalOpen] = useState(false);
    const eventsStore = useEventsStore((s) => s.events);
    const addOrUpdateEvent = useEventsStore((s) => s.addOrUpdateEvent);
    const deleteEvent = useEventsStore((s) => s.deleteEvent);

    React.useEffect(() => {
        if (events && events.length > 0) {
            useEventsStore.getState().setEvents(events);
        }
    }, [events]);
    const [selectedEvent, setSelectedEvent] = useState<
        CalendarEvent | undefined
    >(undefined);

    const rows = getMonthGrid(current);

    const eventsByDate = eventsStore.reduce<Record<string, CalendarEvent[]>>(
        (acc, ev) => {
            acc[ev.date] = acc[ev.date] || [];
            acc[ev.date].push(ev);
            return acc;
        },
        {},
    );

    const onDateClick = (d: Date) => {
        const iso = formatISODate(d);
        setSelectedDate(iso);
        setSelectedEvent(undefined);
    };

    return (
        <Card className="rounded-xl border-none shadow-xl backdrop-blur-sm">
            <CardHeader className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                            setCurrent(
                                (c) =>
                                    new Date(
                                        c.getFullYear(),
                                        c.getMonth() - 1,
                                        1,
                                    ),
                            )
                        }
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="min-w-[8rem] text-center font-semibold">
                        {formatMonthTitle(current)}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                            setCurrent(
                                (c) =>
                                    new Date(
                                        c.getFullYear(),
                                        c.getMonth() + 1,
                                        1,
                                    ),
                            )
                        }
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-7 text-xs text-center gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (d) => (
                            <div
                                key={d}
                                className="py-1 text-muted-foreground font-medium"
                            >
                                {d}
                            </div>
                        ),
                    )}
                </div>

                <div className="grid grid-cols-7 gap-1 mt-1">
                    {rows.flat().map((day) => {
                        const iso = formatISODate(day);
                        const dayEvents = eventsByDate[iso] || [];
                        const isToday = isSameDay(day, new Date());
                        const inMonth = isSameMonth(day, current);
                        const isSelected = selectedDate === iso;
                        return (
                            <button
                                key={iso}
                                type="button"
                                onClick={() => onDateClick(day)}
                                className={`flex flex-col items-center gap-1 rounded-lg p-1.5 transition-colors
                                    ${inMonth ? "" : "opacity-40"}
                                    ${isSelected && !isToday ? "ring-2 ring-inset ring-primary/40 bg-primary/5" : ""}
                                    hover:bg-accent/50
                                `}
                            >
                                {isToday ? (
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                        {day.getDate()}
                                    </span>
                                ) : (
                                    <span className="flex h-6 w-6 items-center justify-center text-sm">
                                        {day.getDate()}
                                    </span>
                                )}
                                <div className="flex gap-0.5">
                                    {dayEvents.slice(0, 3).map((e) => (
                                        <span
                                            key={e.id}
                                            className={`h-1 w-1 rounded-full ${COLOR_DOT[e.color]?.replace("h-2 w-2 rounded-full ", "") ?? "bg-blue-500"}`}
                                        />
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
                    addOrUpdateEvent(ev);
                    setSelectedEvent(undefined);
                }}
                onDelete={(id) => {
                    deleteEvent(id);
                    setSelectedEvent(undefined);
                }}
            />
        </Card>
    );
}
