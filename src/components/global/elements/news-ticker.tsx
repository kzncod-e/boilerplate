"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";

export interface NewsItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  category?: string;
  priority?: "low" | "medium" | "high";
}

export interface NewsTickerProps {
  news: NewsItem[];
  variant?: "running" | "fade-bottom-top" | "fade-top-bottom" | "fade-in-out";
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  showControls?: boolean;
  autoPlay?: boolean;
  pauseOnHover?: boolean;
  showTimestamp?: boolean;
  showCategory?: boolean;
  maxItems?: number;
  className?: string;
}

const speedMap = {
  slow: "animate-pulse",
  normal: "animate-none",
  fast: "animate-none"
};

const NewsTicker: React.FC<NewsTickerProps> = ({
  news,
  variant = "running",
  speed = "normal",
  direction = "left",
  showControls = true,
  autoPlay = true,
  pauseOnHover = true,
  showTimestamp = true,
  showCategory = true,
  maxItems = 5,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const displayNews = news.slice(0, maxItems);

  useEffect(() => {
    if (isPlaying && !isPaused && variant !== "running") {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayNews.length);
      }, speed === "slow" ? 8000 : speed === "fast" ? 4000 : 6000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, variant, speed, displayNews.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + displayNews.length) % displayNews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayNews.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high": return "bg-red-500 text-white";
      case "medium": return "bg-yellow-500 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const renderRunningText = () => (
    <div className="relative overflow-hidden bg-gray-900 text-white py-3 flex items-center">
      <div 
        className={cn(
          "flex whitespace-nowrap animate-marquee",
          direction === "right" && "animate-marquee-reverse"
        )}
        style={{
          animationDuration: speed === "slow" ? "60s" : speed === "fast" ? "30s" : "45s"
        }}
      >
        {/* Duplicate the news items to create seamless loop */}
        {[...displayNews, ...displayNews, ...displayNews].map((item, index) => (
          <span key={`${item.id}-${index}`} className="mx-8 inline-flex items-center flex-shrink-0">
            {item.category && (
              <span className={cn("px-2 py-1 text-xs rounded mr-2", getPriorityColor(item.priority))}>
                {item.category}
              </span>
            )}
            <span className="font-medium">{item.title}</span>
            {item.description && (
              <span className="ml-2 text-gray-300">- {item.description}</span>
            )}
            {item.timestamp && (
              <span className="ml-4 text-gray-400 text-sm">{item.timestamp}</span>
            )}
            <span className="ml-8 text-gray-500">•</span>
          </span>
        ))}
      </div>
    </div>
  );

  const renderFadeBottomTop = () => (
    <div className="relative h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden flex items-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col justify-center">
          {displayNews.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "text-center px-4 transition-all duration-500 flex items-center justify-center absolute inset-0",
                index === currentIndex 
                  ? "opacity-100 transform translate-y-0" 
                  : index === (currentIndex - 1 + displayNews.length) % displayNews.length
                  ? "opacity-0 transform translate-y-full"
                  : "opacity-0 transform -translate-y-full"
              )}
            >
              <div className="flex items-center justify-center space-x-2">
                {item.category && (
                  <span className={cn("px-2 py-1 text-xs rounded", getPriorityColor(item.priority))}>
                    {item.category}
                  </span>
                )}
                <span className="font-medium">{item.title}</span>
                {item.timestamp && (
                  <span className="text-blue-100 text-sm">{item.timestamp}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFadeTopBottom = () => (
    <div className="relative h-12 bg-gradient-to-r from-green-600 to-teal-600 text-white overflow-hidden flex items-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col justify-center">
          {displayNews.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "text-center px-4 transition-all duration-500 flex items-center justify-center absolute inset-0",
                index === currentIndex 
                  ? "opacity-100 transform translate-y-0" 
                  : index === (currentIndex - 1 + displayNews.length) % displayNews.length
                  ? "opacity-0 transform -translate-y-full"
                  : "opacity-0 transform translate-y-full"
              )}
            >
              <div className="flex items-center justify-center space-x-2">
                {item.category && (
                  <span className={cn("px-2 py-1 text-xs rounded", getPriorityColor(item.priority))}>
                    {item.category}
                  </span>
                )}
                <span className="font-medium">{item.title}</span>
                {item.timestamp && (
                  <span className="text-green-100 text-sm">{item.timestamp}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFadeInOut = () => (
    <div className="relative h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white overflow-hidden flex items-center">
      <div className="absolute inset-0 flex items-center justify-center px-4">
        {displayNews.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-1000",
              index === currentIndex 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95"
            )}
          >
            <div className="text-center">
              {item.category && (
                <span className={cn("px-2 py-1 text-xs rounded mb-1 inline-block", getPriorityColor(item.priority))}>
                  {item.category}
                </span>
              )}
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-orange-100 text-sm">{item.description}</p>
              )}
              {item.timestamp && (
                <span className="text-orange-200 text-xs mt-1">{item.timestamp}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case "running":
        return renderRunningText();
      case "fade-bottom-top":
        return renderFadeBottomTop();
      case "fade-top-bottom":
        return renderFadeTopBottom();
      case "fade-in-out":
        return renderFadeInOut();
      default:
        return renderRunningText();
    }
  };

  return (
    <div className={cn("relative", className)}>
      {renderContent()}
      
      {showControls && variant !== "running" && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <button
            onClick={handlePrevious}
            className="p-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-colors"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={handleNext}
            className="p-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsTicker;