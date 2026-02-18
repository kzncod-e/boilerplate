"use client";

import { CollapsibleCard } from "@/components/global/cards/collapsible-card";
import { HeaderCard } from "@/components/global/cards/header-card";
import { TaskCard } from "@/components/global/cards/header-footer-card";
import { Users, TrendingUp, Activity, Clock } from "lucide-react";
import {
    dummyMetrics,
    dummyRelatedPosts,
    dummyTrendlineEvents,
    dummyVideos,
    dummyMedia,
    dummyTaskItems,
} from "./constans/constan";
import MetricItem from "../../../components/global/cards/statistic-card";
import SocmedAccounts from "@/components/global/cards/sosmed-card";
import { socmedAccountsDummy } from "@/mock/socmeds-data";
import { ScrollableCard } from "@/components/global/cards/scrollable-card";
import PageHeader from "@/components/global/page-header";
import { MultiActionAreaCard } from "@/components/global/cards/multi-action-area-card";
import FirstPostCard from "@/components/global/cards/news-first-post-card";
import NewsTrendlineCard from "@/components/global/cards/news-trendline-card";
import VideoList from "@/components/global/video-list";
import MediaPlayerCard from "@/components/global/media-player-card";
import FunctionalCard from "@/components/global/cards/functionaly-card";
import { Trash2, Share, Eye, Archive, RefreshCw, Bell, Lock } from "lucide-react";

export default function CardsPage() {
    return (
        <>
            <PageHeader
                title="Cards page"
                description="reusable card components with dynamic props"
            />

            <div className=" flex flex-col w-full gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {dummyMetrics.map((item, idx) => (
                        <MetricItem key={idx} {...item} />
                    ))}
                </div>
                <SocmedAccounts accounts={socmedAccountsDummy} />

                {/* HeaderCard Example */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                    <HeaderCard
                        icon={Activity}
                        title="Performance Metrics"
                        description="Real-time dashboard insights"
                        leftContent={
                            <div className="space-y-2">
                                <p className="text-sm font-medium">CPU Usage</p>
                                <div className="w-full bg-secondary rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{ width: "65%" }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    65% of capacity
                                </p>
                            </div>
                        }
                        rightContent={
                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    Memory Usage
                                </p>
                                <div className="w-full bg-secondary rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{ width: "42%" }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    42% of capacity
                                </p>
                            </div>
                        }
                    />

                    {/* TaskCard Example */}
                    <TaskCard
                        title="Tasks & Activities"
                        description="Pending items"
                        items={dummyTaskItems}
                        primaryAction={{
                            label: "View All",
                            onClick: () => console.log("View all tasks"),
                        }}
                        lastUpdated="Updated 2 hours ago"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                    <CollapsibleCard
                        title="API Documentation"
                        previewText="Click to expand..."
                        expandedContent={
                            <div className="space-y-2 text-sm">
                                <p>
                                    Our REST API provides endpoints for managing
                                    users, posts, and comments.
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground">
                                    <li>GET /api/users - Fetch all users</li>
                                    <li>POST /api/users - Create new user</li>
                                    <li>PUT /api/users/:id - Update user</li>
                                </ul>
                            </div>
                        }
                    />

                    {/* CollapsibleCard Example 2 */}
                    <CollapsibleCard
                        title="Advanced Settings"
                        previewText="Configure options..."
                        expandedContent={
                            <div className="space-y-3 text-sm">
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="w-4 h-4"
                                    />
                                    <span>Enable notifications</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="w-4 h-4"
                                    />
                                    <span>Auto-save changes</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4"
                                    />
                                    <span>Dark mode</span>
                                </label>
                            </div>
                        }
                    />
                </div>
                {/* CollapsibleCard Example 1 */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                    {/* HeaderCard with Icon */}
                    <HeaderCard
                        icon={TrendingUp}
                        title="Growth Trends"
                        description="Month-over-month comparison"
                        leftContent={
                            <div className="text-center space-y-1">
                                <p className="text-2xl font-bold">156%</p>
                                <p className="text-xs text-muted-foreground">
                                    User Growth
                                </p>
                            </div>
                        }
                        rightContent={
                            <div className="text-center space-y-1">
                                <p className="text-2xl font-bold">42%</p>
                                <p className="text-xs text-muted-foreground">
                                    Revenue Growth
                                </p>
                            </div>
                        }
                        footerText="Data from January 2024"
                    />

                    {/* CollapsibleCard with Custom Content */}
                    <CollapsibleCard
                        title="System Status"
                        previewText="All systems operational"
                        defaultOpen={false}
                        expandedContent={
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span>API Server</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                        Operational
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Database</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                        Operational
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Cache Layer</span>
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                                        Degraded
                                    </span>
                                </div>
                            </div>
                        }
                    />
                </div>
                {/* scrollablecard with custom content */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                    <ScrollableCard
                        title="Recent Activity"
                        description="Last 30 days"
                        height="h-[300px]"
                    >
                        <ul className="space-y-3">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <li key={i} className="text-sm">
                                    Activity #{i + 1}
                                </li>
                            ))}
                        </ul>
                    </ScrollableCard>

                    <MultiActionAreaCard
                        title="Lizard"
                        description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                        image="https://github.com/shadcn.png"
                        footerTitle="Reptile Information"
                        onClick={() => console.log("Card clicked")}
                        onShare={() => console.log("Share clicked")}
                    />
                </div>

                {/* News Cards Section */}
                <div className="grid grid-cols-1 gap-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        News & Timeline Cards
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* First Post Card Example */}
                        <FirstPostCard
                            title="Revolutionary AI Breakthrough Transforms Industry Landscape"
                            excerpt="Scientists have announced a groundbreaking development in artificial intelligence that promises to revolutionize how we interact with technology. This breakthrough represents years of research and collaboration across multiple institutions, bringing us closer to truly intelligent systems that can understand and respond to human needs in unprecedented ways."
                            category="Technology"
                            author="Dr. Sarah Johnson"
                            publishDate="January 15, 2024"
                            readTime="5 min read"
                            imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
                            relatedPosts={dummyRelatedPosts}
                        />

                        {/* News Trendline Card Example */}
                        <NewsTrendlineCard
                            title="Company Timeline"
                            description="Key events and milestones in our journey"
                            events={dummyTrendlineEvents}
                            showDateHeaders={true}
                            maxHeight="h-96"
                        />
                    </div>

                    {/* Additional Examples */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* First Post Card without image */}
                        <FirstPostCard
                            title="Market Trends: What's Next for Digital Transformation"
                            excerpt="As we move further into 2024, digital transformation continues to reshape industries across the globe. Companies are increasingly adopting cloud technologies, AI-driven solutions, and automation to stay competitive in an ever-evolving marketplace."
                            category="Business"
                            author="Michael Chen"
                            publishDate="January 14, 2024"
                            readTime="3 min read"
                            relatedPosts={dummyRelatedPosts.slice(0, 1)}
                        />

                        {/* News Trendline Card without date headers */}
                        <NewsTrendlineCard
                            title="Project Roadmap"
                            description="Upcoming features and improvements"
                            events={dummyTrendlineEvents.slice(2)}
                            showDateHeaders={false}
                            maxHeight="h-80"
                        />
                    </div>
                </div>

                {/* Video List Section */}
                <div className="grid grid-cols-1 gap-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Video Content Gallery
                    </h2>

                    <VideoList
                        title="Featured Videos"
                        description="Discover the latest content from our creators across multiple platforms"
                        videos={dummyVideos}
                        pagination={{
                            currentPage: 1,
                            totalPages: 5,
                            totalItems: 24,
                            itemsPerPage: 6,
                            onPageChange: (page) => console.log(`Navigate to page ${page}`),
                            showTotalItems: true
                        }}
                        gridCols="3"
                    />
                </div>

                {/* Media Player Section */}
                <div className="grid grid-cols-1 gap-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Media Player Gallery
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {dummyMedia.map((media) => (
                            <MediaPlayerCard
                                key={media.id}
                                media={media}
                                onPlay={() => console.log(`Playing: ${media.title}`)}
                                onPause={() => console.log(`Paused: ${media.title}`)}
                                onEnded={() => console.log(`Ended: ${media.title}`)}
                            />
                        ))}
                    </div>
                </div>

                {/* Functional Card Section */}
                <div className="grid grid-cols-1 gap-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Functional Cards - All Modes in One Component
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Dropdown Mode (Original) */}
                        <FunctionalCard
                            title="Dropdown Mode"
                            description="Original dropdown menu style"
                            optionMode="dropdown"
                            onSetting={() => console.log("Dropdown: Settings clicked")}
                            onEdit={() => console.log("Dropdown: Edit clicked")}
                            onCopy={(content) => console.log("Dropdown copied:", content)}
                            onDownload={() => console.log("Dropdown: Download clicked")}
                        >
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                                        <p className="text-2xl font-bold">12,345</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                                        <p className="text-2xl font-bold">$45,678</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-sm text-blue-600 dark:text-blue-400">Performance: 94% optimal</p>
                                </div>
                            </div>
                        </FunctionalCard>

                        {/* Popover Mode */}
                        <FunctionalCard
                            title="Popover Mode"
                            description="Options appear in a popover dropdown"
                            optionMode="popover"
                            onSetting={() => console.log("Popover: Settings clicked")}
                            onEdit={() => console.log("Popover: Edit clicked")}
                            onCopy={(content) => console.log("Popover copied:", content)}
                            onDownload={() => console.log("Popover: Download clicked")}
                        >
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-sm text-blue-600 dark:text-blue-400">Click the menu icon to see options in popover mode</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                                        <p className="text-lg font-semibold">Popover</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Dropdown style</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                                        <p className="text-lg font-semibold">Clean</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Minimal space</p>
                                    </div>
                                </div>
                            </div>
                        </FunctionalCard>

                        {/* Expand Mode */}
                        <FunctionalCard
                            title="Expand Mode"
                            description="Options expand horizontally below the header"
                            optionMode="expand"
                            options={{
                                setting: true,
                                edit: true,
                                copy: true,
                                download: true,
                                custom: [
                                    {
                                        label: "Archive",
                                        icon: <Archive className="h-4 w-4" />,
                                        onClick: () => console.log("Expand: Archive clicked"),
                                    },
                                    {
                                        label: "Refresh",
                                        icon: <RefreshCw className="h-4 w-4" />,
                                        onClick: () => console.log("Expand: Refresh clicked"),
                                    },
                                ],
                            }}
                            onSetting={() => console.log("Expand: Settings clicked")}
                            onEdit={() => console.log("Expand: Edit clicked")}
                            onCopy={(content) => console.log("Expand copied:", content)}
                            onDownload={() => console.log("Expand: Download clicked")}
                        >
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <p className="text-sm text-green-600 dark:text-green-400">Click the menu icon to expand options horizontally</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                                        <p className="text-lg font-semibold">Expand</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Horizontal bar</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                                        <p className="text-lg font-semibold">Direct</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Quick access</p>
                                    </div>
                                </div>
                            </div>
                        </FunctionalCard>

                        {/* Inline Mode */}
                        <FunctionalCard
                            title="Inline Mode"
                            description="Options are always visible without clicking"
                            optionMode="inline"
                            onSetting={() => console.log("Inline: Settings clicked")}
                            onEdit={() => console.log("Inline: Edit clicked")}
                            onCopy={(content) => console.log("Inline copied:", content)}
                            onDownload={() => console.log("Inline: Download clicked")}
                        >
                            <div className="space-y-4">
                                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <p className="text-sm text-purple-600 dark:text-purple-400">Options are always visible - no click needed!</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                                        <p className="text-lg font-semibold">Always Visible</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Direct access</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                                        <p className="text-lg font-semibold">No Toggle</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Instant actions</p>
                                    </div>
                                </div>
                            </div>
                        </FunctionalCard>

                        {/* Custom Options - Dropdown */}
                        <FunctionalCard
                            title="Custom Options"
                            description="Card with custom actions only"
                            optionMode="dropdown"
                            options={{
                                setting: false,
                                edit: false,
                                copy: false,
                                download: false,
                                custom: [
                                    {
                                        label: "View Details",
                                        icon: <Eye className="h-4 w-4" />,
                                        onClick: () => console.log("Custom: View details clicked"),
                                    },
                                    {
                                        label: "Share",
                                        icon: <Share className="h-4 w-4" />,
                                        onClick: () => console.log("Custom: Share clicked"),
                                    },
                                    {
                                        label: "Delete",
                                        icon: <Trash2 className="h-4 w-4" />,
                                        onClick: () => console.log("Custom: Delete clicked"),
                                        variant: "destructive",
                                    },
                                ],
                            }}
                            onCopy={(content) => console.log("Custom copied:", content)}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <p className="font-medium">John Doe</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">Active</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <p className="font-medium">Jane Smith</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">jane@example.com</p>
                                    </div>
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs rounded-full">Pending</span>
                                </div>
                            </div>
                        </FunctionalCard>

                        {/* Minimal Options - Inline */}
                        <FunctionalCard
                            title="Minimal Inline"
                            description="Only essential options always visible"
                            optionMode="inline"
                            options={{
                                setting: false,
                                edit: true,
                                copy: true,
                                download: false,
                            }}
                            onEdit={() => console.log("Minimal: Edit clicked")}
                            onCopy={(content) => console.log("Minimal copied:", content)}
                        >
                            <div className="p-6 text-center">
                                <p className="text-gray-600 dark:text-gray-400">Minimal inline mode with only edit and copy options always visible.</p>
                            </div>
                        </FunctionalCard>
                    </div>
                </div>
            </div>
        </>
    );
}
