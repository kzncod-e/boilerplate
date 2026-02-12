"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
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

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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

    const rows = useMemo(() => getMonthGrid(current), [current]);

    const eventsByDate = useMemo(
        () =>
            eventsStore.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
                (acc[ev.date] ||= []).push(ev);
                return acc;
            }, {}),
        [eventsStore],
    );

    const onDateClick = (d: Date) => {
        const iso = formatISODate(d);
        setSelectedDate(iso);
        setSelectedEvent(undefined);
    };

    const goToToday = () => {
        const today = new Date();
        setCurrent(today);
        setSelectedDate(formatISODate(today));
    };

    return (
        <Card className="rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md"
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
                    <span className="min-w-[7.5rem] text-center text-sm font-semibold select-none">
                        {formatMonthTitle(current)}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md"
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
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs gap-1.5 px-2.5"
                    onClick={goToToday}
                >
                    <Calendar className="h-3 w-3" />
                    Today
                </Button>
            </div>

            <CardContent className="p-3">
                {/* Day headers */}
                <div className="grid grid-cols-7 mb-1">
                    {DAY_HEADERS.map((d) => (
                        <div
                            key={d}
                            className="py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-center select-none"
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* Day grid — connected cells like FullCalendar */}
                <div className="grid grid-cols-7 gap-px rounded-lg border bg-border overflow-hidden">
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
                                className={[
                                    "relative flex flex-col items-center justify-center py-2 transition-colors",
                                    inMonth
                                        ? "bg-card"
                                        : "bg-muted/20 text-muted-foreground/50",
                                    isSelected && !isToday
                                        ? "bg-primary/10 dark:bg-primary/15"
                                        : "",
                                    !isSelected && "hover:bg-accent/60",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                {/* Day number */}
                                <span
                                    className={[
                                        "flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors",
                                        isToday
                                            ? "bg-primary font-bold text-primary-foreground"
                                            : "",
                                        isSelected && !isToday
                                            ? "font-semibold text-primary"
                                            : "",
                                        !isToday &&
                                        !isSelected &&
                                        inMonth
                                            ? "font-medium"
                                            : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    {day.getDate()}
                                </span>

                                {/* Event dots */}
                                <div className="flex gap-[3px] mt-0.5 h-[6px] items-center">
                                    {dayEvents.slice(0, 3).map((e) => (
                                        <span
                                            key={e.id}
                                            className={`h-[5px] w-[5px] rounded-full ${COLOR_DOT[e.color]?.replace("h-2 w-2 rounded-full ", "") ?? "bg-blue-500"}`}
                                        />
                                    ))}
                                    {dayEvents.length > 3 && (
                                        <span className="text-[8px] leading-none text-muted-foreground font-medium">
                                            +
                                        </span>
                                    )}
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
