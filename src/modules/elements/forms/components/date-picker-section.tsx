"use client";

import { useState } from "react";
import { FormField } from "@/components/global/forms/basic-form";
import { DatePicker } from "@/components/global/forms/date-picker-form";
import GlobalCard from "@/components/global/cards/global-card";
import { BasicButton } from "@/components/global/buttons/basic-button";

export default function DatePickerSection() {
    const [singleDate, setSingleDate] = useState<Date | null>(null);
    const [dateRange, setDateRange] = useState<
        [Date | null, Date | null] | null
    >(null);

    return (
        <GlobalCard
            title="Date Picker"
            description="Single and range date selection with calendar"
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Single Date">
                        <DatePicker
                            mode="single"
                            value={singleDate}
                            onChange={(value) => {
                                if (value instanceof Date || value === null) {
                                    setSingleDate(value);
                                }
                            }}
                            placeholder="Select a date"
                        />
                    </FormField>

                    <FormField label="Date Range">
                        <DatePicker
                            mode="range"
                            value={dateRange}
                            onChange={(value) => {
                                if (Array.isArray(value) || value === null) {
                                    setDateRange(value);
                                }
                            }}
                            placeholder="Select date range"
                        />
                    </FormField>
                </div>

                <FormField label="Date Range with Two Calendars">
                    <DatePicker
                        mode="range"
                        value={dateRange}
                        onChange={(value) => {
                            if (Array.isArray(value) || value === null) {
                                setDateRange(value);
                            }
                        }}
                        placeholder="Select date range"
                        showTwoCalendars={true}
                    />
                </FormField>

                <div className="flex gap-3">
                    <BasicButton
                        onClick={() => {
                            const now = new Date();
                            setSingleDate(now);
                            setDateRange([
                                now,
                                new Date(
                                    now.getTime() + 7 * 24 * 60 * 60 * 1000,
                                ),
                            ]);
                        }}
                    >
                        Set Today
                    </BasicButton>
                    <BasicButton
                        variant="outline"
                        onClick={() => {
                            setSingleDate(null);
                            setDateRange(null);
                        }}
                    >
                        Clear Dates
                    </BasicButton>
                </div>
            </div>
        </GlobalCard>
    );
}
