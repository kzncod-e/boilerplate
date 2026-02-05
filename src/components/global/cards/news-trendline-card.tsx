"use client";

import React from "react";
import GlobalCard from "./global-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, Clock, TrendingUp, AlertCircle, CheckCircle, Info } from "lucide-react";

export interface TrendlineEvent {
  id: string;
  date: string;
  time?: string;
  title: string;
  description: string;
  type?: "milestone" | "alert" | "update" | "info";
  status?: "completed" | "ongoing" | "upcoming";
  category?: string;
}

export interface NewsTrendlineCardProps {
  title: string;
  description?: string;
  events: TrendlineEvent[];
  showDateHeaders?: boolean;
  maxHeight?: string;
  className?: string;
}

const NewsTrendlineCard: React.FC<NewsTrendlineCardProps> = ({
  title,
  description,
  events,
  showDateHeaders = true,
  maxHeight = "h-96",
  className
}) => {
  const getEventIcon = (type?: string, status?: string) => {
    if (status === "completed") return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === "ongoing") return <TrendingUp className="h-4 w-4 text-blue-500" />;
    if (status === "upcoming") return <Clock className="h-4 w-4 text-gray-500" />;
    
    switch (type) {
      case "milestone":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "update":
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEventColor = (type?: string, status?: string) => {
    if (status === "completed") return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20";
    if (status === "ongoing") return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20";
    if (status === "upcoming") return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20";
    
    switch (type) {
      case "milestone":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20";
      case "alert":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20";
      case "update":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20";
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20";
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>;
      case "ongoing":
        return <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Ongoing</Badge>;
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      default:
        return null;
    }
  };

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, TrendlineEvent[]>);

  return (
    <GlobalCard 
      className={cn("overflow-hidden", className)} 
      title={
        <div className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5" />
          {title}
        </div>
      }
      description={description}
    >
      <div className={cn("overflow-y-auto", maxHeight)}>
        <div className="relative">
          <div className="space-y-4 p-4">
            {Object.entries(groupedEvents).map(([date, dateEvents]) => (
              <div key={date} className="relative">
                {/* Date header on the left */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {date}
                    </div>
                  </div>
                  
                  {/* Timeline line and events */}
                  <div className="flex-1 relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                    
                    {/* Events for this date */}
                    <div className="space-y-3">
                      {dateEvents.map((event, index) => (
                        <div key={event.id} className="relative flex gap-3">
                          {/* Timeline dot */}
                          <div className="relative z-10 flex items-center justify-center w-6 h-6 bg-background border-2 border-gray-300 dark:border-gray-600 rounded-full">
                            <div className={cn(
                              "w-3 h-3 rounded-full",
                              event.status === "completed" ? "bg-green-500" :
                              event.status === "ongoing" ? "bg-blue-500" :
                              event.status === "upcoming" ? "bg-gray-400" :
                              event.type === "alert" ? "bg-red-500" :
                              event.type === "milestone" ? "bg-green-500" :
                              event.type === "update" ? "bg-blue-500" :
                              "bg-gray-500"
                            )} />
                          </div>
                          
                          {/* Event content */}
                          <div className="flex-1 pb-3">
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                    {event.title}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <Clock className="h-3 w-3" />
                                    {event.time || "All day"}
                                    {event.category && (
                                      <>
                                        <span>•</span>
                                        <span>{event.category}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                {getStatusBadge(event.status)}
                              </div>
                              
                              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlobalCard>
  );
};

export default NewsTrendlineCard;