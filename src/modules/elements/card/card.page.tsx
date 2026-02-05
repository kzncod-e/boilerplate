"use client";

import { CollapsibleCard } from "@/components/global/cards/collapsible-card";
import { HeaderCard } from "@/components/global/cards/header-card";
import { TaskCard } from "@/components/global/cards/header-footer-card";
import { Users, TrendingUp, Activity, Clock } from "lucide-react";
import { dummyMetrics } from "./constans/constan";
import MetricItem from "../../../components/global/cards/statistic-card";
import SocmedAccounts from "@/components/global/cards/sosmed-card";
import { socmedAccountsDummy } from "@/mock/socmeds-data";
import { ScrollableCard } from "@/components/global/cards/scrollable-card";
import PageHeader from "@/components/global/page-header";
import { MultiActionAreaCard } from "@/components/global/cards/multi-action-area-card";
import FirstPostCard, { RelatedPost } from "@/components/global/cards/news-first-post-card";
import NewsTrendlineCard, { TrendlineEvent } from "@/components/global/cards/news-trendline-card";

export default function CardsPage() {
  // Sample data for First Post Card
  const relatedPosts: RelatedPost[] = [
    {
      id: "1",
      platform: "twitter",
      author: "John Doe",
      content: "Breaking: Major technology breakthrough announced today! This changes everything we thought we knew about AI. #TechNews #Innovation",
      timestamp: "2 hours ago",
      likes: 245,
      comments: 89,
      shares: 156
    },
    {
      id: "2",
      platform: "facebook",
      author: "Tech Insights",
      content: "The latest developments in artificial intelligence are reshaping industries. Read our comprehensive analysis of what this means for the future.",
      timestamp: "4 hours ago",
      likes: 523,
      comments: 127,
      shares: 89
    }
  ];

  // Sample data for News Trendline Card
  const trendlineEvents: TrendlineEvent[] = [
    {
      id: "1",
      date: "15 Jan",
      time: "09:00 AM",
      title: "Product Launch Announcement",
      description: "Official launch of our revolutionary AI-powered platform that transforms how businesses operate.",
      type: "milestone",
      status: "completed",
      category: "Product"
    },
    {
      id: "2",
      date: "15 Jan",
      time: "02:30 PM",
      title: "Market Analysis Update",
      description: "Q4 earnings report shows 45% growth in user acquisition and 32% increase in revenue.",
      type: "update",
      status: "completed",
      category: "Finance"
    },
    {
      id: "3",
      date: "16 Jan",
      time: "11:00 AM",
      title: "Security Alert",
      description: "Important security update available. All users are encouraged to update their applications immediately.",
      type: "alert",
      status: "ongoing",
      category: "Security"
    },
    {
      id: "4",
      date: "17 Jan",
      time: "03:00 PM",
      title: "Team Expansion",
      description: "Hiring 50 new engineers across multiple departments to support our rapid growth.",
      type: "info",
      status: "upcoming",
      category: "HR"
    }
  ];

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
                <p className="text-xs text-muted-foreground">65% of capacity</p>
              </div>
            }
            rightContent={
              <div className="space-y-2">
                <p className="text-sm font-medium">Memory Usage</p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "42%" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">42% of capacity</p>
              </div>
            }
          />

          {/* TaskCard Example */}
          <TaskCard
            title="Tasks & Activities"
            description="Pending items"
            items={[
              { label: "Code Review", value: 5 },
              { label: "Bug Fixes", value: 12 },
              { label: "Deployments", value: 3 },
            ]}
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
                  Our REST API provides endpoints for managing users, posts, and
                  comments.
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
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Enable notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Auto-save changes</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" />
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
                <p className="text-xs text-muted-foreground">User Growth</p>
              </div>
            }
            rightContent={
              <div className="text-center space-y-1">
                <p className="text-2xl font-bold">42%</p>
                <p className="text-xs text-muted-foreground">Revenue Growth</p>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">News & Timeline Cards</h2>
          
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
              relatedPosts={relatedPosts}
            />

            {/* News Trendline Card Example */}
            <NewsTrendlineCard
              title="Company Timeline"
              description="Key events and milestones in our journey"
              events={trendlineEvents}
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
              relatedPosts={relatedPosts.slice(0, 1)}
            />

            {/* News Trendline Card without date headers */}
            <NewsTrendlineCard
              title="Project Roadmap"
              description="Upcoming features and improvements"
              events={trendlineEvents.slice(2)}
              showDateHeaders={false}
              maxHeight="h-80"
            />
          </div>
        </div>
      </div>
    </>
  );
}
