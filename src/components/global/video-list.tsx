"use client";

import React from "react";
import GlobalCard from "./cards/global-card";
import SingleVidThumbnail, { VideoData } from "./single-vid-thumbnail";
import NewsPagination from "@/components/global/pagination/pagination";
import { cn } from "@/lib/utils";

export interface VideoListProps {
  title: string;
  description?: string;
  videos: VideoData[];
  pagination?: {
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
    itemsPerPage?: number;
    onPageChange?: (page: number) => void;
    showTotalItems?: boolean;
  };
  className?: string;
  gridCols?: "1" | "2" | "3" | "4";
}

const VideoList: React.FC<VideoListProps> = ({
  title,
  description,
  videos,
  pagination,
  className,
  gridCols = "3"
}) => {
  const getGridCols = (cols: string) => {
    switch (cols) {
      case "1":
        return "grid-cols-1";
      case "2":
        return "grid-cols-1 md:grid-cols-2";
      case "3":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "4":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <GlobalCard 
      className={cn("w-full", className)} 
      title={title}
      description={description}
    >
      <div className="space-y-6">
        {/* Video Grid */}
        <div className={cn(
          "grid gap-2",
          getGridCols(gridCols)
        )}>
          {videos.map((video) => (
            <SingleVidThumbnail
              key={video.id}
              video={video}
            />
          ))}
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <NewsPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={pagination.onPageChange}
              showTotalItems={pagination.showTotalItems}
            />
          </div>
        )}
      </div>
    </GlobalCard>
  );
};

export default VideoList;
