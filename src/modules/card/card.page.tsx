"use client";

import { CollapsibleCard } from "@/components/global/cards/collapsible-card";
import { HeaderCard } from "@/components/global/cards/header-card";
import { TaskCard } from "@/components/global/cards/header-footerCard";
import { Users, TrendingUp, Activity, Clock } from "lucide-react";
import { dummyMetrics } from "./constans/constan";
import MetricItem from "../../components/global/cards/statistic-card";
import SocmedAccounts from "@/components/global/cards/sosmed-card";
import { socmedAccountsDummy } from "@/mock/socmeds-data";
import { ScrollableCard } from "@/components/global/cards/scrollable-card";
import PageHeader from "@/components/global/page-header";
import { MultiActionAreaCard } from "@/components/global/cards/multi-action-area-card";

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
            footerTitle="Share this lizard"
            onClick={() => console.log("Card clicked")}
            onShare={() => console.log("Share clicked")}
          />
        </div>
      </div>
    </>
  );
}
