import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { EventColor } from "./types";
import { COLOR_DOT } from "./colors";
import formatCalendarDate from "@/lib/format-calendar";
import { addMonths, format, parseISO, setMonth, setYear } from "date-fns";

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

  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  const months = Array.from({ length: 60 }, (_, i) =>
    addMonths(new Date(), i - 30),
  );

  return (
    <aside className="col-span-4">
      <Card className="h-full flex flex-col">
        {/* HEADER */}
        <CardHeader></CardHeader>

        {/* BODY */}
        <CardContent className="flex-1 overflow-hidden space-y-4">
          <div className=" flex items-baseline justify-center">
            <div className="text-sm font-semibold text-muted-foreground">
              {formatCalendarDate(selectedDate).year}
            </div>
          </div>

          {/* EVENT LIST */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
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
  );
};

export default CalendarSidebar;
