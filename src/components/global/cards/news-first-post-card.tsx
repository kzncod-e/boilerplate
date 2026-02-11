"use client";

import React from "react";
import GlobalCard from "./global-card";
import ListPostCard from "./list-post-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Facebook,
    Twitter,
    MessageCircle,
    Heart,
    Share2,
    Clock,
    User,
} from "lucide-react";

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

export interface FirstPostCardProps {
    title: string;
    excerpt: string;
    category: string;
    author: string;
    authorAvatar?: string;
    publishDate: string;
    readTime: string;
    imageUrl?: string;
    relatedPosts?: RelatedPost[];
    className?: string;
}

const FirstPostCard: React.FC<FirstPostCardProps> = ({
    title,
    excerpt,
    category,
    author,
    authorAvatar,
    publishDate,
    readTime,
    imageUrl,
    relatedPosts = [],
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

    return (
        <div className={cn("space-y-6", className)}>
            {/* Main First Post Card */}
            <GlobalCard
                className="overflow-hidden pt-0"
                title={""}
                description={""}
            >
                {imageUrl && (
                    <div className="relative h-48 overflow-hidden rounded-lg mb-0">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                            <Badge
                                variant="secondary"
                                className="bg-white/90 text-gray-900"
                            >
                                {category}
                            </Badge>
                        </div>
                    </div>
                )}

                <div className={cn("space-y-4", imageUrl && "pt-4")}>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            {authorAvatar ? (
                                <img
                                    src={authorAvatar}
                                    alt={author}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="h-4 w-4 text-gray-600" />
                                </div>
                            )}
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {author}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {publishDate}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {readTime}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {excerpt}
                    </p>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">Like</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">Comment</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span className="text-sm">Share</span>
                        </button>
                    </div>
                </div>
            </GlobalCard>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Related Posts
                    </h3>

                    <div className="space-y-3">
                        {relatedPosts.map((post) => (
                            <ListPostCard
                                key={post.id}
                                post={post}
                                borderColor="info"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FirstPostCard;
