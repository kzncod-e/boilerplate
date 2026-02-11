"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { CalendarIcon, Filter, Save } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";

import { format } from "date-fns";

import Image from "next/image";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const PageHeader = ({
    title,
    icon,
    badge,
    description,
    leftSectionCustomNode,
    rightSectionCustomNode,
}: {
    title: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    description?: string;
    leftSectionCustomNode?: React.ReactNode;
    rightSectionCustomNode?: React.ReactNode;
}) => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2025, 1, 13),
        to: new Date(2025, 1, 13),
    });

    return (
        <>
            <div className="border-b w-full pb-4 mb-3 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between w-full">
                        <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2 text-primary">
                            {icon}
                            {title}
                            {badge}
                        </h1>
                    </div>
                    {description && (
                        <p className="text-sm text-muted-foreground mb-2">
                            {description}
                        </p>
                    )}

                    {leftSectionCustomNode}
                </div>

                {rightSectionCustomNode}
            </div>
        </>
    );
};

export default PageHeader;
