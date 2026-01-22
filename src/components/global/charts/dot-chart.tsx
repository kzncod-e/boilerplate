"use client";

import React, { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendDataType } from "@/interfaces/sosmed";
import GlobalCard from "../cards/global-card";

type Props = {
  data?: TrendDataType[];
};

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

function formatDateLabel(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("id-ID", { month: "short" });
  return `${day} ${month}`;
}

export default function DotChart({ data }: Props) {
  const { chartData, chartConfig, seriesKeys } = useMemo(() => {
    const platforms = (data || []).map((d) => String(d.platform));
    const uniquePlatforms = Array.from(new Set(platforms));

    const configEntries = uniquePlatforms.reduce<
      Record<string, { label: string; color: string }>
    >((acc, platform, idx) => {
      const key = platform;
      acc[key] = {
        label: platform,
        color: COLORS[idx % COLORS.length],
      };
      return acc;
    }, {});

    const byDate = new Map<string, Record<string, number>>();
    (data || []).forEach((item) => {
      item.trend.forEach((pt) => {
        const date = pt.date;
        const prev = byDate.get(date) || ({ date: date } as any);
        prev[item.platform as string] =
          (prev[item.platform as string] || 0) + (pt.count || 0);
        byDate.set(date, prev);
      });
    });

    const rows = Array.from(byDate.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([, row]) => row as any);

    return {
      chartData: rows,
      chartConfig: configEntries as ChartConfig,
      seriesKeys: uniquePlatforms,
    };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">Tidak ada data tren.</div>
    );
  }

  return (
    <GlobalCard title={"example of dot chart"}>
      <ChartContainer config={chartConfig} className="max-h-[400px] min-w-full">
        <LineChart
          accessibilityLayer
          data={chartData as any[]}
          margin={{
            top: 10,
            left: -30,
            right: 30,
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
            tickFormatter={(value: string) => formatDateLabel(value)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          {seriesKeys.map((key) => (
            <Line
              key={key}
              dataKey={key}
              type="monotone"
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </GlobalCard>
  );
}
