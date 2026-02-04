"use client";

import React, { useState } from "react";
import PageHeader from "@/components/global/page-header";
import GlobalCard from "@/components/global/cards/global-card";
import NewsTicker, { NewsItem } from "@/components/global/elements/news-ticker";
import { BasicButton } from "@/components/global/buttons/basic-button";

export default function NewsTickerPage() {
  // Sample news data
  const sampleNews: NewsItem[] = [
    {
      id: "1",
      title: "Breaking: Major Technology Breakthrough Announced",
      description: "Scientists discover revolutionary new method",
      timestamp: "2 hours ago",
      category: "Technology",
      priority: "high"
    },
    {
      id: "2",
      title: "Stock Market Reaches All-Time High",
      description: "Investors celebrate record-breaking performance",
      timestamp: "3 hours ago",
      category: "Business",
      priority: "medium"
    },
    {
      id: "3",
      title: "New Climate Change Report Released",
      description: "Urgent action needed to prevent environmental crisis",
      timestamp: "5 hours ago",
      category: "Environment",
      priority: "high"
    },
    {
      id: "4",
      title: "Sports Championship Finals This Weekend",
      description: "Teams prepare for the biggest match of the year",
      timestamp: "1 day ago",
      category: "Sports",
      priority: "low"
    },
    {
      id: "5",
      title: "Healthcare Reform Bill Passed",
      description: "New legislation promises better medical access",
      timestamp: "1 day ago",
      category: "Politics",
      priority: "medium"
    },
    {
      id: "6",
      title: "Entertainment Industry Awards Ceremony",
      description: "Celebrities gather for annual celebration",
      timestamp: "2 days ago",
      category: "Entertainment",
      priority: "low"
    }
  ];

  const [speed, setSpeed] = useState<"slow" | "normal" | "fast">("normal");
  const [direction, setDirection] = useState<"left" | "right">("left");

  return (
    <div className="space-y-6 xl:max-w-[75vw]">
      <PageHeader
        title="News Ticker Examples"
        description="Multiple news ticker styles and animations with customizable options"
      />

      {/* Running Text News Ticker */}
      <GlobalCard
        title="Running Text News Ticker"
        description="Continuous scrolling news from left to right or right to left"
      >
        <div className="space-y-4 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Speed:</span>
            <BasicButton
              size="sm"
              variant={speed === "slow" ? "primary" : "outline"}
              onClick={() => setSpeed("slow")}
            >
              Slow
            </BasicButton>
            <BasicButton
              size="sm"
              variant={speed === "normal" ? "primary" : "outline"}
              onClick={() => setSpeed("normal")}
            >
              Normal
            </BasicButton>
            <BasicButton
              size="sm"
              variant={speed === "fast" ? "primary" : "outline"}
              onClick={() => setSpeed("fast")}
            >
              Fast
            </BasicButton>
            <span className="text-sm font-medium ml-4">Direction:</span>
            <BasicButton
              size="sm"
              variant={direction === "left" ? "primary" : "outline"}
              onClick={() => setDirection("left")}
            >
              Left
            </BasicButton>
            <BasicButton
              size="sm"
              variant={direction === "right" ? "primary" : "outline"}
              onClick={() => setDirection("right")}
            >
              Right
            </BasicButton>
          </div>
        </div>
        <div className="mt-4">
          <NewsTicker
            news={sampleNews}
            variant="running"
            speed={speed}
            direction={direction}
            showControls={false}
          />
        </div>
      </GlobalCard>

      {/* Fade Bottom to Top */}
      <GlobalCard
        title="Fade Bottom to Top"
        description="News items slide up from bottom with fade effect"
      >
        <NewsTicker
          news={sampleNews}
          variant="fade-bottom-top"
          speed="normal"
          showControls={true}
          maxItems={4}
        />
      </GlobalCard>

      {/* Fade Top to Bottom */}
      <GlobalCard
        title="Fade Top to Bottom"
        description="News items slide down from top with fade effect"
      >
        <NewsTicker
          news={sampleNews}
          variant="fade-top-bottom"
          speed="normal"
          showControls={true}
          maxItems={4}
        />
      </GlobalCard>

      {/* Fade In Out */}
      <GlobalCard
        title="Fade In Out"
        description="News items fade in and out with scaling effect"
      >
        <NewsTicker
          news={sampleNews}
          variant="fade-in-out"
          speed="normal"
          showControls={true}
          maxItems={3}
        />
      </GlobalCard>

      {/* Compact Version */}
      <GlobalCard
        title="Compact News Ticker"
        description="Smaller version without timestamps and descriptions"
      >
        <NewsTicker
          news={sampleNews.slice(0, 7)}
          variant="running"
          speed="fast"
          showTimestamp={false}
          showCategory={true}
          maxItems={3}
        />
      </GlobalCard>

      {/* Custom Styled Version */}
      <GlobalCard
        title="Custom Styled News Ticker"
        description="News ticker with custom styling and limited items"
      >
        <div className="rounded-lg overflow-hidden shadow-lg">
          <NewsTicker
            news={sampleNews.filter(item => item.priority === "high")}
            variant="fade-in-out"
            speed="slow"
            showControls={true}
            showTimestamp={true}
            showCategory={true}
            maxItems={2}
            className="rounded-lg"
          />
        </div>
      </GlobalCard>

      {/* Multiple Tickers */}
      <GlobalCard
        title="Multiple News Tickers"
        description="Different categories with separate tickers"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Technology News</h3>
            <NewsTicker
              news={sampleNews.filter(item => item.category === "Technology")}
              variant="running"
              speed="normal"
              showControls={false}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Business News</h3>
            <NewsTicker
              news={sampleNews.filter(item => item.category === "Business")}
              variant="fade-bottom-top"
              speed="slow"
              showControls={true}
            />
          </div>
        </div>
      </GlobalCard>
    </div>
  );
}