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
import GlobalCard from "@/components/global-card";
import SentimentAnalysisSection from "../charts/components/sentiment-analysis";
import { stats } from "@/constants/cardData";
import { StatisticCard } from "./components/statistic-card";
import MentionsPercategory from "./components/table-card";
import { dummySocmedMentionData } from "@/constants/dashboard";
import { LineChart } from "../charts/components/line-charts";

export default function Dashboard() {
  return (
    <div className="container mx-auto  px-4">
      <div className="flex items-center p-6 justify-center">

      <h1 className="tracking-tight flex items-center gap-3 font-semibold text-3xl text-primary">Optimasi Template</h1>
      </div>

      <div className=" flex gap-10 flex-col text-center">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, idx) => (
        <StatisticCard key={idx} {...item} />
      ))}
    </div>
        
        <GlobalCard title="Sentiment Analysis">
          <SentimentAnalysisSection />
        </GlobalCard>
          <MentionsPercategory data={dummySocmedMentionData} />
          <LineChart/>
      </div>
    </div>
  );
}
