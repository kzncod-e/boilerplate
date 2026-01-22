"use client";
import BaseLayout from "@/components/global/base-layout";
import PageHeader from "@/components/global/page-header";
import React from "react";
import GlobalCard from "../dashboard/components/global-card";
import SentimentAnalysisSection from "./components/sentiment-analysis";
import { LineChart } from "./components/line-charts";
import { SocmedAreaChart } from "@/components/global/charts/socmed-area-chart";
import { chartConfig, chartData } from "./constant/constant";

import { ChartPie } from "@/components/global/charts/pie-chart";
import { Dot } from "recharts";
import DotChart from "@/components/global/charts/dot-chart";

import {
  dummyBarChartConfig,
  dummyBarChartData,
  dummyLineChart,
  dummyLineChatConfig,
  dummyMultipleChartBar,
  dummyMultipleChartBarConfig,
  socmedAreaChartDummyData,
} from "@/constants/chart-data";
import { ChartLine } from "@/components/global/charts/line-chart";
import { TrendingUp } from "lucide-react";

import { BasicBarChart } from "@/components/global/charts/basic-chartbar";
import { ChartBarMulti } from "@/components/global/charts/multiple-barchart";

const browserData = [
  { browser: "Chrome", users: 275, color: "var(--chart-1)" },
  { browser: "Safari", users: 200, color: "var(--chart-2)" },
  { browser: "Firefox", users: 187, color: "var(--chart-3)" },
];
const ChartPage = () => {
  return (
    <BaseLayout>
      <PageHeader
        title="Chart page"
        description="reusable chart components with dynamic props"
      />

      <div className="flex flex-col gap-5">
        <GlobalCard title="Sentiment Analysis">
          <SentimentAnalysisSection />
        </GlobalCard>

        <GlobalCard title="example of area charts">
          <LineChart data={chartData} config={chartConfig} />
        </GlobalCard>
        <SocmedAreaChart
          data={socmedAreaChartDummyData}
          title="socmed area chart"
        />

        <ChartPie
          title="Browser Usage"
          description="Jan - Jun 2024"
          data={browserData}
          config={chartConfig}
          valueKey="users"
          labelKey="browser"
          fillKey="color"
        />

        <DotChart data={socmedAreaChartDummyData} />
        <BasicBarChart
          data={dummyBarChartData}
          config={dummyBarChartConfig}
          footer={
            <div className="flex flex-col gap-2 text-sm mt-4">
              <div className="flex gap-2 font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground">
                Showing data for the last period
              </div>
            </div>
          }
        />
        <ChartBarMulti
          title="multiple chart bar"
          data={dummyMultipleChartBar}
          config={dummyMultipleChartBarConfig}
          xKey="month"
          series={[{ key: "desktop" }, { key: "mobile" }]}
          footer={
            <>
              <div className="flex gap-2 font-medium">
                Trending up 5.2% <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground">Last 6 months traffic</div>
            </>
          }
        />

        <ChartLine
          title="User Growth"
          description="Jan - Jun 2024"
          data={dummyLineChart}
          config={dummyLineChatConfig}
          xKey="month"
          valueKey="users"
          footer={
            <>
              <div className="font-medium">Trending up this quarter 🚀</div>
              <div className="text-muted-foreground">Monthly active users</div>
            </>
          }
        />
      </div>
    </BaseLayout>
  );
};

export default ChartPage;
