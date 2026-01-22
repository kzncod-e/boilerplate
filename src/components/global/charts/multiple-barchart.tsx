"use client";

import { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import GlobalCard from "../cards/global-card";

/* ================= TYPES ================= */

type KeyOf<T> = Extract<keyof T, string>;

interface BarSeries<T> {
  key: KeyOf<T>;
  radius?: number;
}

interface ChartBarMultiProps<T extends Record<string, any>> {
  title?: string;

  data: T[];
  config: ChartConfig;

  /** key untuk X axis */
  xKey: KeyOf<T>;

  /** bar series (desktop, mobile, etc) */
  series: BarSeries<T>[];

  footer?: ReactNode;
}

/* ================= COMPONENT ================= */

export function ChartBarMulti<T extends Record<string, any>>({
  title = "Multiple Bar Chart",
  data,
  config,
  xKey,
  series,
  footer,
}: ChartBarMultiProps<T>) {
  return (
    <GlobalCard title={title}>
      <ChartContainer config={config}>
        <BarChart data={data} accessibilityLayer>
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey={xKey}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <YAxis tickLine={false} axisLine={false} width={60} />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />

          {series.map((item) => (
            <Bar
              key={String(item.key)}
              dataKey={item.key}
              fill={`var(--color-${String(item.key)})`}
              radius={item.radius ?? 4}
            />
          ))}
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
