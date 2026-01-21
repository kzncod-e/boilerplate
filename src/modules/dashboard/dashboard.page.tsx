"use client";
import { CheckSquare, List, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SentimentAnalysisSection from "../charts/components/sentiment-analysis";
import { stats } from "@/constants/card-data";

import MentionsPercategory from "./components/table-card";
import { dummySocmedMentionData } from "@/constants/dashboard";
import { LineChart } from "../charts/components/line-charts";
import MetricItem from "../../components/global/cards/statistic-card";
import { dummyMetrics } from "../card/constans/constan";
import { chartConfig, chartData } from "../charts/constant/constant";
import GlobalCard from "@/components/global/cards/global-card";
import PageHeader from "@/components/global/page-header";
import BaseLayout from "@/components/global/base-layout";
import { SocmedAreaChart } from "@/components/global/charts/socmed-area-chart";
import { socmedAreaChartDummyData } from "@/constants/sosmed-data";

export default function Dashboard() {
  return (
    <BaseLayout>
      <PageHeader
        title="Optimasi template"
        description="optimasi official template"
      />

      <div className=" flex gap-10 flex-col ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dummyMetrics.map((item, idx) => (
            <MetricItem key={idx} {...item} />
          ))}
        </div>

        <GlobalCard title="Sentiment Analysis">
          <SentimentAnalysisSection />
        </GlobalCard>
        <MentionsPercategory data={dummySocmedMentionData} />
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
}
