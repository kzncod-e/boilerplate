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
import SentimentAnalysisSection from "./components/sentiment-analysis";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-12 px-4">
      

      <div className="mt-16 text-center">

        
        <GlobalCard title="Sentiment Analysis">
          <SentimentAnalysisSection />
        </GlobalCard>
      </div>
    </div>
  );
}
