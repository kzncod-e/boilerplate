"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import GlobalCard from "../cards/global-card";

export const description = "Mentions trend by platform with gradient fill";

type PlatformKey = string; // e.g., "facebook" | "instagram" | "twitter"

type TrendPoint = {
    date: string; // YYYY-MM-DD
    count: number;
};

type TrendSeries = {
    platform: PlatformKey;
    trend: TrendPoint[];
};

// Map known platforms to theme color tokens; fallback cycles through chart palette
const platformColorToken: Record<string, string> = {
    facebook: "var(--chart-facebook)",
    instagram: "var(--chart-instagram)",
    twitter: "var(--chart-twitter)",
    x: "var(--chart-twitter)",
    youtube: "var(--chart-youtube)",
    tiktok: "var(--chart-tiktok)",
};

function toTitleCase(s: string) {
    return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SocmedAreaChart({
    title,
    politicianName,
    data,
}: {
    title: string;
    politicianName?: string;
    data: TrendSeries[] | undefined;
}) {
    const series = Array.isArray(data) ? data : [];

    // Collect all dates
    const dateSet = new Set<string>();
    for (const s of series) {
        for (const p of s.trend) {
            dateSet.add(p.date);
        }
    }

    const dates = Array.from(dateSet).sort();

    // Build date-indexed rows: { date, facebook, instagram, ... }
    const chartData = dates.map((date) => {
        const row: Record<string, string | number> = { date };
        for (const s of series) {
            const point = s.trend.find((p) => p.date === date);
            row[s.platform] = point ? point.count : 0;
        }
        return row;
    });

    // Build chartConfig dynamically for ChartContainer which exposes --color-<key>
    const allPlatforms = series.map((s) => s.platform);
    const fallbackTokens = [
        "var(--chart-1)",
        "var(--chart-2)",
        "var(--chart-3)",
        "var(--chart-4)",
        "var(--chart-5)",
    ];
    const chartConfig = allPlatforms.reduce((acc, platform, idx) => {
        const token =
            platformColorToken[platform.toLowerCase()] ??
            fallbackTokens[idx % fallbackTokens.length];
        acc[platform] = {
            label: toTitleCase(platform),
            color: token,
        } as ChartConfig[string];
        return acc;
    }, {} as ChartConfig);

    return (
        <GlobalCard title={title}>
            <ChartContainer
                config={chartConfig}
                className="h-[400px] w-full relative"
            >
                <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        top: 10,
                        left: -30,
                        right: 30,
                        bottom: 40,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        // angle={-60}
                        dy={35}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />
                    <defs>
                        {allPlatforms.map((platform) => (
                            <linearGradient
                                key={platform}
                                id={`fill-${platform}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={`var(--color-${platform})`}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={`var(--color-${platform})`}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        ))}
                    </defs>
                    {allPlatforms.map((platform) => (
                        <Area
                            key={platform}
                            dataKey={platform}
                            type="natural"
                            fill={`url(#fill-${platform})`}
                            fillOpacity={0.4}
                            stroke={`var(--color-${platform})`}
                            stackId="a"
                        />
                    ))}
                </AreaChart>
            </ChartContainer>
        </GlobalCard>
    );
}
