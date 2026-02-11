"use client";
import SentimentAnalysisSection from "../../elements/charts/components/sentiment-analysis";
import MentionsPercategory from "../components/table-card";
import { dummySocmedMentionData } from "@/mock/dashboard-data";
import { LineChart } from "../../elements/charts/components/line-charts";
import MetricItem from "../../../components/global/cards/statistic-card";
import { dummyMetrics } from "../../elements/card/constans/constan";
import {
    chartConfig,
    chartData,
} from "../../elements/charts/constants/constant";
import GlobalCard from "@/components/global/cards/global-card";
import PageHeader from "@/components/global/page-header";
import { SocmedAreaChart } from "@/components/global/charts/socmed-area-chart";
import { socmedAreaChartDummyData } from "@/mock/chart-data";
import SocmedTable from "../components/table-card";

export default function Dashboard() {
    return (
        <>
            <PageHeader
                title="Dashboard"
                description="Optimasi official boilerplate template"
            />

            <div className=" flex gap-10 flex-col ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    {dummyMetrics.map((item, idx) => (
                        <MetricItem key={idx} {...item} />
                    ))}
                </div>

                <GlobalCard title="Sentiment Analysis">
                    <SentimentAnalysisSection />
                </GlobalCard>
                <SocmedTable data={dummySocmedMentionData} />
                <GlobalCard title="example of area charts">
                    <LineChart data={chartData} config={chartConfig} />
                </GlobalCard>
                <SocmedAreaChart
                    data={socmedAreaChartDummyData}
                    title="socmed area chart"
                />
            </div>
        </>
    );
}
