"use client"
import { CardGrid } from '@/modules/card/components/card-grid'
import { CollapsibleCard } from '@/modules/card/components/collapsible-card'
import { HeaderCard } from '@/modules/card/components/header-card'
import { TaskCard } from '@/modules/card/components/header-footerCard'
import { Users, TrendingUp, Activity, Clock } from 'lucide-react'
import { dummyMetrics } from './constans/constan'
import MetricItem from './components/statistic-card'

export default function CardsPage() {
  return (
    <main className="min-h-screen  p-8">
      <div className=" mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Cards</h1>
          <p className="text-muted-foreground">
            Reusable dashboard components with dynamic props
          </p>
        </div>

        <CardGrid>
             {dummyMetrics.map((item, idx) => (
        <MetricItem key={idx} {...item} />
      ))}
          {/* StatCard Example */}
          {/* <StatCar
            title="Total Users"
            badge="This month"
            value="1,245"
            change={12}
            subStats={[
              { label: 'Active', value: '987' },
              { label: 'New', value: '258' },
              { label: 'Inactive', value: '128' },
            ]}
          /> */}

          {/* StatCard Example 2 */}
          {/* <StatCard
            title="Revenue"
            value="$45,231"
            change={-3}
            subStats={[
              { label: 'Target', value: '$50K' },
              { label: 'Avg', value: '$1.2K' },
              { label: 'Peak', value: '$5.8K' },
            ]}
          /> */}

          {/* HeaderCard Example */}
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
                    style={{ width: '65%' }}
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
                    style={{ width: '42%' }}
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
              { label: 'Code Review', value: 5 },
              { label: 'Bug Fixes', value: 12 },
              { label: 'Deployments', value: 3 },
            ]}
            primaryAction={{
              label: 'View All',
              onClick: () => console.log('View all tasks'),
            }}
            lastUpdated="Updated 2 hours ago"
          />

          {/* CollapsibleCard Example 1 */}
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

          {/* Another StatCard for variety */}
          {/* <StatCard
            title="Conversion Rate"
            badge="Last 30 days"
            value="3.24%"
            change={5}
          /> */}

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
        </CardGrid>
      </div>
    </main>
  )
}
