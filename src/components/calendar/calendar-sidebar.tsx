import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { EventColor } from "./types";
import { COLOR_DOT } from "./colors";
import formatCalendarDate from "@/lib/format-calendar";
import { addMonths, format, parseISO, setMonth, setYear } from "date-fns";
import { Calendar, Edit2, Sparkles, Trash2 } from "lucide-react";

interface CalendarSidebarProps {
    selectedDate: string;
    currentMonth: Date;

    current: Date;
    setCurrent: (d: Date) => void;
    setCurrentMonth: (d: Date) => void;
    eventsByDate: Record<
        string,
        {
            id: string;
            title: string;
            description?: string;
            color: EventColor;
            date: string;
        }[]
    >;
    setSelectedDate: (date: string) => void;
    setSelectedEvent: (
        ev:
            | {
                  id: string;
                  title: string;
                  description?: string;
                  color: EventColor;
                  date: string;
              }
            | undefined,
    ) => void;
    setModalOpen: (open: boolean) => void;
    handleDelete: (id: string) => void;
}

const CalendarSidebar = (props: CalendarSidebarProps) => {
    const {
        selectedDate,
        eventsByDate,
        setSelectedDate,
        setSelectedEvent,
        setModalOpen,
        current,
        setCurrent,

        handleDelete,
    } = props;
    const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
    const months = Array.from({ length: 60 }, (_, i) =>
        addMonths(new Date(), i - 30),
    );
    const COLOR_ACCENT: Record<EventColor, string> = {
        red: "bg-red-500",
        orange: "bg-orange-500",

        green: "bg-green-500",
        blue: "bg-blue-500",
        purple: "bg-purple-500",
    };

    const dateInfo = formatCalendarDate(selectedDate);
    return (
        <aside className="col-span-4">
            <Card className="h-full flex flex-col border-none shadow-xl  backdrop-blur-sm">
                {/* HEADER - Date Badge */}
                <CardHeader className="pb-4">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 p-6 border border-indigo-100/50 dark:border-indigo-900/50">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />

                        <div className="relative flex items-baseline justify-center">
                            <div className="flex flex-col items-baseline  justify-center">
                                <div className="flex flex-col items-center justify-center     gap-3">
                                    <h2 className="text-3xl text-primary font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text ">
                                        {dateInfo.dayName}
                                    </h2>
                                    <div className="flex justify-center items-center gap-3">
                                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            {dateInfo.month}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-500">
                                            {dateInfo.year}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center gap-1.5">
                                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                                    <div className="h-1 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-60" />
                                </div>
                            </div>

                            {/* <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-700/20">
                <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div> */}
                        </div>
                    </div>
                </CardHeader>

                {/* BODY - Event List */}
                <CardContent className="flex-1 overflow-hidden px-6 pb-6">
                    <div className="h-full overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {eventsByDate[selectedDate] &&
                        eventsByDate[selectedDate].length > 0 ? (
                            eventsByDate[selectedDate].map((ev, index) => (
                                <div
                                    key={ev.id}
                                    className="group relative animate-in fade-in slide-in-from-bottom-2 duration-300"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                    onMouseEnter={() =>
                                        setHoveredEventId(ev.id)
                                    }
                                    onMouseLeave={() => setHoveredEventId(null)}
                                >
                                    {/* Accent Border - Vertical Bar */}
                                    <div
                                        className={`absolute left-0 pl-2  py-4 top-0 bottom-0 w-1 z-30 rounded-l-xl ${COLOR_ACCENT[ev.color]} transition-all duration-300 ${hoveredEventId === ev.id ? "w-1.5" : "w-1"}`}
                                    />

                                    <div
                                        className={`
                    relative pl-5 pr-4 py-4 rounded-xl border bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                    transition-all duration-300 cursor-pointer
                    ${
                        hoveredEventId === ev.id
                            ? "shadow-lg shadow-indigo-500/10 dark:shadow-indigo-500/20 -translate-y-0.5  dark:border-indigo-800/60 bg-white/80 dark:bg-gray-800/80"
                            : "shadow-sm  dark:border-gray-700/60"
                    }
                  `}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                                                    {ev.title}
                                                </h3>
                                                {ev.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                                        {ev.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Action Buttons - Show on Hover */}
                                            <div
                                                className={`
                        flex items-center gap-1 transition-all duration-200
                        ${hoveredEventId === ev.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}
                      `}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                    onClick={() => {
                                                        setSelectedEvent(ev);
                                                        setSelectedDate(
                                                            ev.date,
                                                        );
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                    onClick={() =>
                                                        handleDelete(ev.id)
                                                    }
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div
                                            className={`
                      absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
                      transition-opacity duration-300 pointer-events-none
                      ${hoveredEventId === ev.id ? "opacity-100" : "opacity-0"}
                    `}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Empty State
                            <div className="flex flex-col items-center justify-center h-full min-h-[300px] animate-in fade-in duration-500">
                                <div className="relative">
                                    {/* Decorative circles */}
                                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" />
                                    <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200/50 dark:border-indigo-800/50">
                                        <Sparkles className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                </div>

                                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    No events today
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center max-w-[200px]">
                                    Your day is wide open. Ready to add
                                    something?
                                </p>

                                {/* Decorative element */}
                                <div className="mt-6 flex items-center gap-2">
                                    <div className="h-1 w-8 rounded-full bg-gradient-to-r from-indigo-500/30 to-transparent" />
                                    <div className="h-1 w-1 rounded-full bg-indigo-500/30" />
                                    <div className="h-1 w-8 rounded-full bg-gradient-to-l from-purple-500/30 to-transparent" />
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </aside>
    );
};

export default CalendarSidebar;
