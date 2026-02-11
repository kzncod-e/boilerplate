"use client";

import { ReactNode } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import GlobalCard from "../cards/global-card";

/* ================= TYPES ================= */

type KeyOf<T> = Extract<keyof T, string>;

interface ChartLineProps<T extends Record<string, any>> {
    title?: string;
    description?: string;

    data: T[];
    config: ChartConfig;

    /** key untuk X axis */
    xKey: KeyOf<T>;

    /** key untuk value line (bisa multiple nanti) */
    valueKey: KeyOf<T>;

    footer?: ReactNode;

    height?: number;
}

/* ================= COMPONENT ================= */

export function ChartLine<T extends Record<string, any>>({
    title,
    description,
    data,
    config,
    xKey,
    valueKey,
    footer,
    height = 300,
}: ChartLineProps<T>) {
    return (
        <GlobalCard
            description={description}
            title={title ? title : "basic line chart"}
        >
            <ChartContainer config={config}>
                <LineChart data={data} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />

                    <XAxis
                        dataKey={xKey}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                    />

                    <YAxis tickLine={false} axisLine={false} />

                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />

                    <Line
                        dataKey={valueKey}
                        type="natural"
                        stroke={`var(--color-${String(valueKey)})`}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ChartContainer>

            {footer && (
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    {footer}
                </CardFooter>
            )}
        </GlobalCard>
    );
}
