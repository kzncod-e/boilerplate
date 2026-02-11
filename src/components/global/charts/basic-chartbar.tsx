"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import GlobalCard from "../cards/global-card";
import type { ChartConfig } from "@/components/ui/chart";
import { CardFooter } from "@/components/ui/card";
import { ReactNode } from "react";

export type BasicBarChartData = {
    label: string; // sebelumnya month
    value: number; // sebelumnya desktop
};

export interface BasicBarChartProps {
    title?: string;
    data: BasicBarChartData[];
    config: ChartConfig;
    footer?: ReactNode;
    valueKey?: string; // default "value"
}

export function BasicBarChart({
    title = "Basic Bar Chart",
    data,
    config,
    footer,
    valueKey = "value",
}: BasicBarChartProps) {
    return (
        <GlobalCard title={title}>
            <ChartContainer config={config}>
                <BarChart accessibilityLayer data={data}>
                    <CartesianGrid vertical={false} />

                    <XAxis
                        dataKey="label"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />

                    <YAxis tickLine={false} axisLine={false} width={60} />

                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />

                    <Bar
                        dataKey={valueKey}
                        fill={`var(--color-${valueKey})`}
                        radius={8}
                    />
                </BarChart>
            </ChartContainer>

            {footer && (
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    {footer}
                </CardFooter>
            )}
        </GlobalCard>
    );
}
