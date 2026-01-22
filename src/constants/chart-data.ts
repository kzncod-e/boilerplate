import type { ChartConfig } from "@/components/ui/chart";
export const dummyBarChartData = [
  { label: "January", value: 120 },
  { label: "February", value: 260 },
  { label: "March", value: 180 },
  { label: "April", value: 320 },
  { label: "May", value: 210 },
  { label: "June", value: 400 },
];

export const dummyBarChartConfig = {
  value: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const socmedAreaChartDummyData: {
  platform: string;
  trend: { date: string; count: number }[];
}[] = [
  {
    platform: "facebook",
    trend: [
      { date: "2025-01-01", count: 1 },
      { date: "2025-01-02", count: 1 },
      { date: "2025-01-03", count: 1 },
      { date: "2025-01-04", count: 2 },
      { date: "2025-01-05", count: 2 },
      { date: "2025-01-06", count: 3 },
      { date: "2025-01-07", count: 3 },
    ],
  },
  {
    platform: "instagram",
    trend: [
      { date: "2025-01-01", count: 2 },
      { date: "2025-01-02", count: 2 },
      { date: "2025-01-03", count: 2 },
      { date: "2025-01-04", count: 3 },
      { date: "2025-01-05", count: 3 },
      { date: "2025-01-06", count: 4 },
      { date: "2025-01-07", count: 5 },
    ],
  },
  {
    platform: "twitter",
    trend: [
      { date: "2025-01-01", count: 8},
      { date: "2025-01-02", count: 1 },
      { date: "2025-01-03", count: 1 },
      { date: "2025-01-04", count: 1 },
      { date: "2025-01-05", count: 2 },
      { date: "2025-01-06", count: 2 },
      { date: "2025-01-07", count: 3 },
    ],
  },
  {
    platform: "tiktok",
    trend: [
      { date: "2025-01-01", count: 3 },
      { date: "2025-01-02", count: 3 },
      { date: "2025-01-03", count: 4 },
      { date: "2025-01-04", count: 5 },
      { date: "2025-01-05", count: 6 },
      { date: "2025-01-06", count: 7 },
      { date: "2025-01-07", count: 9 },
    ],
  },
];

export const dummyLineChart = [
  { month: "January", users: 120 },
  { month: "February", users: 280 },
  { month: "March", users: 190 },
  { month: "April", users: 90 },
  { month: "May", users: 240 },
  { month: "June", users: 310 },
];



export const dummyLineChatConfig = {
  users: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
