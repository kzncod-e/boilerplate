"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Eye, Heart, MessageCircle, Share2, Calendar } from "lucide-react";
import GlobalCard from "./cards/global-card";
import { getPlatformIcon, getPlatformColor, formatViews, formatEngagement } from "@/lib/video-helpers";

export interface VideoData {
  id: string;
  platform: "youtube" | "facebook" | "instagram" | "twitter";
  title: string;
  thumbnail: string;
  author: string;
  authorAvatar?: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  publishedAt: string;
  duration?: string;
}

export interface SingleVidThumbnailProps {
  video: VideoData;
  className?: string;
}

const SingleVidThumbnail: React.FC<SingleVidThumbnailProps> = ({
  video,
  className
}) => {
  const PlatformIcon = getPlatformIcon(video.platform);

  return (
    <GlobalCard className={cn("overflow-hidden pt-0 border border-slate-100 dark:border-slate-100/10", className)} title={""} description={""}>
      <div className="space-y-4">
        {/* Thumbnail with overlay */}
        <div className="relative group cursor-pointer">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          
          {/* Duration badge */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          )}
          
          {/* Play button overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
            <div className="bg-white/90 rounded-full p-3">
              <PlatformIcon className="h-6 w-6 text-black" />
            </div>
          </div>
        </div>

        {/* Video info */}
        <div className="space-y-3">
          {/* Platform and views */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn(
                "p-1.5 rounded border",
                getPlatformColor(video.platform)
              )}>
                <PlatformIcon className="h-4 w-4" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {video.platform}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Eye className="h-3 w-3" />
              {formatViews(video.views)} views
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 leading-6">
            {video.title}
          </h3>

          {/* Author info */}
          <div className="flex items-center gap-3">
            {video.authorAvatar ? (
              <img
                src={video.authorAvatar}
                alt={video.author}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
              </div>
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {video.author}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              • {video.publishedAt}
            </span>
          </div>

          {/* Engagement metrics */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {formatEngagement(video.likes)}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {formatEngagement(video.comments)}
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="h-3 w-3" />
              {formatEngagement(video.shares)}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {video.publishedAt}
            </div>
          </div>
        </div>
      </div>
    </GlobalCard>
  );
};

export default SingleVidThumbnail;
