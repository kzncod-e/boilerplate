"use client";

import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import type { CalendarEvent } from "./types";
import { COLOR_BG, COLOR_DOT } from "./colors";

interface Props {
    events: CalendarEvent[];
    onEdit: (ev: CalendarEvent) => void;
    onDelete: (id: string) => void;
    trigger?: React.ReactNode;
}

export default function EventDetailPopup({
    events,
    onEdit,
    onDelete,
    trigger,
}: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {trigger ?? (
                    <Button variant="ghost" size="sm">
                        Details
                    </Button>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0">
                <div className="border-b px-3 py-2">
                    <p className="text-xs font-medium text-muted-foreground">
                        {events.length} event{events.length !== 1 && "s"}
                    </p>
                </div>
                <div className="max-h-[16rem] overflow-y-auto p-2 space-y-1.5">
                    {events.map((e) => (
                        <div
                            key={e.id}
                            className={`group flex items-start gap-2.5 rounded-md px-2.5 py-2 ${COLOR_BG[e.color] ?? COLOR_BG.blue}`}
                        >
                            <span
                                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${COLOR_DOT[e.color]?.replace("h-2 w-2 rounded-full ", "") ?? "bg-blue-500"}`}
                            />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                    {e.title}
                                </p>
                                {e.description && (
                                    <p className="truncate text-xs opacity-70">
                                        {e.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => onEdit(e)}
                                >
                                    <Pencil className="h-3 w-3" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-destructive hover:text-destructive"
                                    onClick={() => onDelete(e.id)}
                                >
                                    <Trash className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
