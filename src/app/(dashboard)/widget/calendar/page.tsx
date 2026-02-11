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

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <FullCalendar />
        </div>
        <aside className="lg:col-span-1">
          <MiniCalendar />
        </aside>
      </div>
    </div>
  );
}
