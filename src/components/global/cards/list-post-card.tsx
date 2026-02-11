"use client";

import React from "react";
import { BaseCardWrapper } from "./base-wrapper-card";
import { cn } from "@/lib/utils";
import { Facebook, Twitter, MessageCircle, Heart, Share2 } from "lucide-react";

export interface RelatedPost {
    id: string;
    platform: "twitter" | "facebook";
    author: string;
    avatar?: string;
    content: string;
    timestamp: string;
    likes?: number;
    comments?: number;
    shares?: number;
}

export interface ListPostCardProps {
    post: RelatedPost;
    borderColor?: "warning" | "info" | "success" | "danger" | "muted" | string;
    className?: string;
}

const ListPostCard: React.FC<ListPostCardProps> = ({
    post,
    borderColor = "muted",
    className,
}) => {
    const getPlatformIcon = (platform: "twitter" | "facebook") => {
        return platform === "twitter" ? (
            <Twitter className="h-4 w-4" />
        ) : (
            <Facebook className="h-4 w-4" />
        );
    };

    const getPlatformColor = (platform: "twitter" | "facebook") => {
        return platform === "twitter"
            ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300"
            : "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300";
    };

    const getBorderColor = (color: string) => {
        const colorMap: Record<string, string> = {
            warning: "border-l-yellow-500",
            info: "border-l-blue-500",
            success: "border-l-green-500",
            danger: "border-l-red-500",
            muted: "border-l-gray-500",
        };

        return colorMap[color] || color;
    };

    return (
        <BaseCardWrapper
            key={post.id}
            className={cn("border-l-4", getBorderColor(borderColor), className)}
            padding="sm"
        >
            <div className="flex items-start gap-3">
                <div
                    className={cn(
                        "p-2 rounded-lg border",
                        getPlatformColor(post.platform),
                    )}
                >
                    {getPlatformIcon(post.platform)}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {post.author}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {post.timestamp}
                        </span>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                        {post.content}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        {post.likes !== undefined && (
                            <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {post.likes}
                            </div>
                        )}
                        {post.comments !== undefined && (
                            <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {post.comments}
                            </div>
                        )}
                        {post.shares !== undefined && (
                            <div className="flex items-center gap-1">
                                <Share2 className="h-3 w-3" />
                                {post.shares}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BaseCardWrapper>
    );
};

export default ListPostCard;
