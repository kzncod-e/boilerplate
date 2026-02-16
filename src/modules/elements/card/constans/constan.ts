import type { RelatedPost } from "@/components/global/cards/news-first-post-card";
import type { TrendlineEvent } from "@/components/global/cards/news-trendline-card";
import type { VideoData } from "@/components/global/single-vid-thumbnail";
import type { MediaData } from "@/components/global/media-player-card";

export const dummyMetrics = [
    {
        title: "Total Users",
        description: "Compared to last month",
        numberValue: 1250,
        percentageOfChange: 12.7,
    },

    {
        title: "New Signups",
        description: "Today",
        numberValue: 45,
        percentageOfChange: 8.1,
    },
    {
        title: "Revenue",
        description: "This month",
        numberValue: 53200,
        percentageOfChange: 15.7,
    },
    {
        title: "Churn Rate",
        description: "Compared to last quarter",
        numberValue: 3,
        percentageOfChange: -1.2,
    },
    {
        title: "Server Uptime",
        description: "Last 24 hours",
        numberValue: 99,
        percentageOfChange: 0, // ini nanti badge-nya nggak muncul
    },
];

export const dummyRelatedPosts: RelatedPost[] = [
    {
        id: "1",
        platform: "twitter",
        author: "John Doe",
        content:
            "Breaking: Major technology breakthrough announced today! This changes everything we thought we knew about AI. #TechNews #Innovation",
        timestamp: "2 hours ago",
        likes: 245,
        comments: 89,
        shares: 156,
    },
    {
        id: "2",
        platform: "facebook",
        author: "Tech Insights",
        content:
            "The latest developments in artificial intelligence are reshaping industries. Read our comprehensive analysis of what this means for the future.",
        timestamp: "4 hours ago",
        likes: 523,
        comments: 127,
        shares: 89,
    },
];

export const dummyTrendlineEvents: TrendlineEvent[] = [
    {
        id: "1",
        date: "15 Jan",
        time: "09:00 AM",
        title: "Product Launch Announcement",
        description:
            "Official launch of our revolutionary AI-powered platform that transforms how businesses operate.",
        type: "milestone",
        status: "completed",
        category: "Product",
    },
    {
        id: "2",
        date: "15 Jan",
        time: "02:30 PM",
        title: "Market Analysis Update",
        description:
            "Q4 earnings report shows 45% growth in user acquisition and 32% increase in revenue.",
        type: "update",
        status: "completed",
        category: "Finance",
    },
    {
        id: "3",
        date: "16 Jan",
        time: "11:00 AM",
        title: "Security Alert",
        description:
            "Important security update available. All users are encouraged to update their applications immediately.",
        type: "alert",
        status: "ongoing",
        category: "Security",
    },
    {
        id: "4",
        date: "17 Jan",
        time: "03:00 PM",
        title: "Team Expansion",
        description:
            "Hiring 50 new engineers across multiple departments to support our rapid growth.",
        type: "info",
        status: "upcoming",
        category: "HR",
    },
];

export const dummyVideos: VideoData[] = [
    {
        id: "1",
        platform: "youtube",
        title: "Building Modern Web Applications with Next.js 14",
        thumbnail:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
        author: "Tech Academy",
        authorAvatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        views: 125000,
        likes: 8500,
        comments: 342,
        shares: 156,
        publishedAt: "2 days ago",
        duration: "15:24",
    },
    {
        id: "2",
        platform: "facebook",
        title: "The Future of Artificial Intelligence in Healthcare",
        thumbnail:
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop",
        author: "AI Research Lab",
        authorAvatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        views: 89000,
        likes: 6200,
        comments: 189,
        shares: 234,
        publishedAt: "1 week ago",
        duration: "22:15",
    },
    {
        id: "3",
        platform: "instagram",
        title: "10 Productivity Tips for Remote Workers",
        thumbnail:
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
        author: "Work Life Balance",
        authorAvatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        views: 234000,
        likes: 18900,
        comments: 567,
        shares: 445,
        publishedAt: "3 days ago",
        duration: "8:45",
    },
    {
        id: "4",
        platform: "twitter",
        title: "Understanding Blockchain Technology in 2024",
        thumbnail:
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
        author: "Crypto Insights",
        authorAvatar:
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
        views: 67000,
        likes: 4200,
        comments: 234,
        shares: 123,
        publishedAt: "5 days ago",
        duration: "18:30",
    },
    {
        id: "5",
        platform: "youtube",
        title: "Complete Guide to Cloud Computing",
        thumbnail:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
        author: "Cloud Experts",
        authorAvatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
        views: 345000,
        likes: 23400,
        comments: 892,
        shares: 678,
        publishedAt: "1 month ago",
        duration: "25:12",
    },
    {
        id: "6",
        platform: "facebook",
        title: "Mobile App Development Best Practices",
        thumbnail:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop",
        author: "Dev Studio",
        authorAvatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        views: 156000,
        likes: 9800,
        comments: 445,
        shares: 334,
        publishedAt: "2 weeks ago",
        duration: "19:45",
    },
];

export const dummyMedia: MediaData[] = [
    {
        id: "1",
        type: "video",
        title: "Live Stream - Tech Conference 2024",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail:
            "https://images.unsplash.com/photo-1592842201225-453bc7173af7?w=800&h=450&fit=crop",
        isLive: true,
        author: "Tech Channel",
        views: 15420,
    },
    {
        id: "2",
        type: "video",
        title: "Product Launch Video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail:
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop",
        duration: "15:30",
        author: "Company Official",
        views: 89500,
    },
    {
        id: "3",
        type: "audio",
        title: "Podcast Episode 42: AI Revolution",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        author: "Tech Talks Podcast",
        views: 12300,
    },
    {
        id: "4",
        type: "video",
        title: "Tutorial: Getting Started",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
        duration: "8:45",
        author: "Education Hub",
        views: 45600,
    },
];

export const dummyTaskItems = [
    { label: "Code Review", value: 5 },
    { label: "Bug Fixes", value: 12 },
    { label: "Deployments", value: 3 },
];
