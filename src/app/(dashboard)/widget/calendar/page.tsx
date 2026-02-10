"use client";

import React from "react";
import PageHeader from "@/components/global/page-header";
import FullCalendar from "@/components/calendar/FullCalendar";
import MiniCalendar from "@/components/calendar/MiniCalendar";

export default function Page() {
  return (
    <div>
      <PageHeader
        title="Calendar"
        description="Manage events with the calendar widget"
      />

      <div className="mt-6 grid grid-cols-1 ">
        <div className="lg:col-span-2">
          <FullCalendar />
        </div>
        {/* <aside className="lg:col-span-1">
          <MiniCalendar />
        </aside> */}
      </div>
    </div>
  );
}
