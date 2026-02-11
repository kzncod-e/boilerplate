"use client";

import React from "react";
import PageHeader from "@/components/global/page-header";
import FullCalendar from "@/components/calendar/full-calendar";
import MiniCalendar from "@/components/calendar/mini-calendar";

export default function Page() {
    return (
        <div>
            <PageHeader
                title="Calendar"
                description="Manage events with the calendar widget"
            />

            <div className="mt-6 space-y-6">
                <FullCalendar />
                <aside className="max-w-sm">
                    <MiniCalendar />
                </aside>
            </div>
        </div>
    );
}
