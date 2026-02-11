"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import type { CalendarEvent, EventColor } from "./types";
import { COLOR_CLASS } from "./colors";

interface Props {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    dateIso: string;
    initial?: CalendarEvent | null;
    onSave: (ev: CalendarEvent) => void;
    onDelete?: (id: string) => void;
}

const PRESET_COLORS: EventColor[] = [
    "red",
    "blue",
    "green",
    "purple",
    "orange",
];

export default function EventModal({
    open,
    onOpenChange,
    dateIso,
    initial,
    onSave,
    onDelete,
}: Props) {
    const [title, setTitle] = useState(initial?.title ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [color, setColor] = useState<EventColor>(initial?.color ?? "blue");

    useEffect(() => {
        setTitle(initial?.title ?? "");
        setDescription(initial?.description ?? "");
        setColor(initial?.color ?? "blue");
    }, [initial, open]);

    const save = () => {
        const ev: CalendarEvent = {
            id: initial?.id ?? String(Date.now()),
            title: title.trim() || "Untitled",
            description: description.trim() || undefined,
            date: dateIso,
            color,
        };
        onSave(ev);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[28rem]">
                <DialogHeader>
                    <DialogTitle>
                        {initial ? "Edit Event" : "Create Event"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            className="mt-1 rounded-lg"
                            placeholder="Event title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            className="mt-1 rounded-lg"
                            placeholder="Add a description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Color</label>
                        <div className="flex gap-3 mt-2">
                            {PRESET_COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`h-8 w-8 rounded-full ${COLOR_CLASS[c]} transition-transform hover:scale-105 ${c === color ? "ring-2 ring-offset-2 ring-primary scale-110" : ""}`}
                                    aria-label={c}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                        {initial && onDelete ? (
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    onDelete(initial.id);
                                    onOpenChange(false);
                                }}
                            >
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        ) : (
                            <div />
                        )}

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={save}>
                                {initial ? "Save" : "Create"}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
