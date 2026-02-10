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
import { COLOR_DOT } from "./colors";

interface Props {
  events: CalendarEvent[];
  onEdit: (ev: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export default function EventDetailPopup({ events, onEdit, onDelete }: Props) {
  return (
    <div className="inline-block">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm">
            Details
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            {events.map((e) => (
              <div
                key={e.id}
                className="flex items-start gap-3 p-2 rounded hover:bg-muted"
              >
                <div className={COLOR_DOT[e.color]} />
                <div className="flex-1">
                  <div className="font-medium">{e.title}</div>
                  {e.description && (
                    <div className="text-sm text-muted-foreground">
                      {e.description}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(e)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(e.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
