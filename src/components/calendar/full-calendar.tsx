"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import useEventsStore from "@/store/useEventsStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EventModal from "./event-modal";
import EventDetailPopup from "./event-detail-popup";
import { COLOR_BG, COLOR_DOT } from "./colors";
import { Calendar, ChevronLeft, ChevronRight, Eye, Plus } from "lucide-react";
import GlobalCard from "../global/cards/global-card";
import CalendarSidebar from "./calendar-sidebar";

interface Props {
    initialEvents?: CalendarEvent[];
    showSidebar?: boolean;
}

export default function FullCalendar({
    initialEvents = [],
    showSidebar = true,
}: Props) {
    const [current, setCurrent] = useState(new Date());
    const events = useEventsStore((s) => s.events);
    const addOrUpdateEvent = useEventsStore((s) => s.addOrUpdateEvent);
    const deleteEventStore = useEventsStore((s) => s.deleteEvent);

    useEffect(() => {
        if (initialEvents && initialEvents.length > 0) {
            useEventsStore.getState().setEvents(initialEvents);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const selectedDate = useCalendarStore((s) => s.selectedDate);
    const setSelectedDate = useCalendarStore((s) => s.setSelectedDate);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<
        CalendarEvent | undefined
    >(undefined);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const rows = useMemo(() => getMonthGrid(current), [current]);

    const eventsByDate = useMemo(() => {
        const map: Record<string, CalendarEvent[]> = {};
        for (const e of events) {
            (map[e.date] ||= []).push(e);
        }
        return map;
    }, [events]);

    const handleSave = (ev: CalendarEvent) => {
        addOrUpdateEvent(ev);
    };

    const handleDelete = (id: string) => {
        deleteEventStore(id);
    };

    return (
        <GlobalCard title="Full Calendar">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
                <div className="col-span-8">
                    <Card>
                        <CardHeader className="flex items-center justify-between border-b">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        setCurrent((c) => subMonths(c, 1))
                                    }
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="min-w-[10rem] text-center font-semibold text-lg">
                                    {formatMonthTitle(current)}
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        setCurrent((c) => addMonths(c, 1))
                                    }
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setCurrent(new Date());
                                        setSelectedDate(
                                            formatISODate(new Date()),
                                        );
                                    }}
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Today
                                </Button>
                                <Button
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Event
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            {/* Day headers */}
                            <div className="grid grid-cols-7 mb-1">
                                {[
                                    "Sun",
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                ].map((d) => (
                                    <div
                                        key={d}
                                        className="py-2 text-xs font-medium text-muted-foreground text-center"
                                    >
                                        {d}
                                    </div>
                                ))}
                            </div>

                            {/* Connected grid */}
                            <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border bg-border">
                                {rows.flat().map((day) => {
                                    const iso = formatISODate(day);
                                    const dayEvents = eventsByDate[iso] || [];
                                    const today = isSameDay(day, new Date());
                                    const inMonth = isSameMonth(day, current);
                                    const isSelected = selectedDate === iso;
                                    return (
                                        <div
                                            key={iso}
                                            onClick={() => setSelectedDate(iso)}
                                            className={`group relative min-h-[6rem] p-2 transition-colors cursor-pointer
                                                ${inMonth ? "bg-card" : "bg-muted/30"}
                                                ${isSelected ? "ring-2 ring-inset ring-primary/40 bg-primary/5" : ""}
                                                hover:bg-accent/50
                                            `}
                                        >
                                            {/* Date number + hover actions */}
                                            <div className="flex items-center justify-between">
                                                {today ? (
                                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                                        {day.getDate()}
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${inMonth ? "font-medium" : "text-muted-foreground"}`}
                                                    >
                                                        {day.getDate()}
                                                    </span>
                                                )}

                                                {/* Hover-revealed action buttons */}
                                                <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedDate(
                                                                iso,
                                                            );
                                                            setSelectedEvent(
                                                                undefined,
                                                            );
                                                            setModalOpen(true);
                                                        }}
                                                        className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                    </button>
                                                    {dayEvents.length > 0 && (
                                                        <EventDetailPopup
                                                            events={dayEvents}
                                                            onEdit={(ev) => {
                                                                setSelectedEvent(
                                                                    ev,
                                                                );
                                                                setSelectedDate(
                                                                    iso,
                                                                );
                                                                setModalOpen(
                                                                    true,
                                                                );
                                                            }}
                                                            onDelete={(id) =>
                                                                handleDelete(id)
                                                            }
                                                            trigger={
                                                                <button
                                                                    type="button"
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                        e.stopPropagation()
                                                                    }
                                                                    className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                                                >
                                                                    <Eye className="h-3.5 w-3.5" />
                                                                </button>
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            {/* Event pills */}
                                            <div className="mt-1 space-y-0.5">
                                                {dayEvents
                                                    .slice(0, 2)
                                                    .map((e) => (
                                                        <div
                                                            key={e.id}
                                                            className={`flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-xs ${COLOR_BG[e.color] ?? COLOR_BG.blue}`}
                                                        >
                                                            <span
                                                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${COLOR_DOT[e.color]?.replace("h-2 w-2 rounded-full ", "") ?? "bg-blue-500"}`}
                                                            />
                                                            <span className="truncate">
                                                                {e.title}
                                                            </span>
                                                        </div>
                                                    ))}
                                                {dayEvents.length > 2 && (
                                                    <div className="px-1.5 text-xs text-muted-foreground">
                                                        +{dayEvents.length - 2}{" "}
                                                        more
                                                    </div>
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
                    <CalendarSidebar
                        current={current}
                        setCurrent={setCurrent}
                        currentMonth={currentMonth}
                        setCurrentMonth={setCurrentMonth}
                        selectedDate={selectedDate}
                        eventsByDate={eventsByDate}
                        setSelectedDate={setSelectedDate}
                        setSelectedEvent={setSelectedEvent}
                        setModalOpen={setModalOpen}
                        handleDelete={handleDelete}
                    />
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
        </GlobalCard>
    );
}
