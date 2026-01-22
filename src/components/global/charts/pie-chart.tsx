"use client";

import { ReactNode } from "react";
import { Cell, Pie, PieChart } from "recharts";

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

interface ChartPieProps<T extends Record<string, any>> {
  title?: string;
  description?: string;

  data: T[];
  config: ChartConfig;

  /** key yang berisi angka */
  valueKey: KeyOf<T>;

  /** key yang berisi label */
  labelKey: KeyOf<T>;

  /** optional key warna */
  fillKey?: KeyOf<T>;

  footer?: ReactNode;
  height?: number;
}

/* ================= COMPONENT ================= */

export function ChartPie<T extends Record<string, any>>({
  title = "Pie Chart",
  description,
  data,
  config,
  valueKey,
  labelKey,
  fillKey,
  footer,
  height = 250,
}: ChartPieProps<T>) {
  return (
    <GlobalCard
      title={title}
      description={description}
      className="flex flex-col"
    >
      <ChartContainer
        config={config}
        className="mx-auto aspect-square"
        style={{ maxHeight: height }}
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={data} dataKey={valueKey} nameKey={labelKey}>
            {data.map((item, index) => (
              <Cell
                key={`cell-${index}`}
                fill={fillKey ? (item[fillKey] as string) : "var(--chart-1)"}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>

      {footer && (
        <CardFooter className="flex-col gap-2 text-sm">{footer}</CardFooter>
      )}
    </GlobalCard>
  );
}
