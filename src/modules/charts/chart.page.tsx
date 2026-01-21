"use client";
import BaseLayout from "@/components/global/base-layout";
import PageHeader from "@/components/global/page-header";
import React from "react";
import GlobalCard from "../dashboard/components/global-card";
import SentimentAnalysisSection from "./components/sentiment-analysis";
import { LineChart } from "./components/line-charts";
import { SocmedAreaChart } from "@/components/global/charts/socmed-area-chart";
import { chartConfig, chartData } from "./constant/constant";
import { socmedAreaChartDummyData } from "@/constants/sosmed-data";

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
      </div>
    </BaseLayout>
  );
};

export default ChartPage;
