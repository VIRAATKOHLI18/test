'use client'

import { Users, Activity, Database, TrendingUp } from 'lucide-react'
import StatsCard from '@/components/dashboard/StatsCard'
import RecentActivity from '@/components/dashboard/RecentActivity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

const stats = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12% from last month',
    changeType: 'positive' as const,
    icon: Users
  },
  {
    title: 'Active Sessions',
    value: '1,234',
    change: '+5% from last hour',
    changeType: 'positive' as const,
    icon: Activity
  },
  {
    title: 'Database Size',
    value: '45.2 GB',
    change: '+2.1 GB this week',
    changeType: 'neutral' as const,
    icon: Database
  },
  {
    title: 'Performance',
    value: '99.9%',
    change: 'Uptime this month',
    changeType: 'positive' as const,
    icon: TrendingUp
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your application.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Chart component will be integrated here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Connect your backend API to display real-time analytics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RecentActivity />
        </motion.div>
      </div>

      {/* Additional Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm text-muted-foreground">23%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm text-muted-foreground">67%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Disk Usage</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 text-left rounded-lg border hover:bg-accent transition-colors">
                  <Users className="h-6 w-6 mb-2 text-blue-600" />
                  <p className="font-medium">Manage Users</p>
                  <p className="text-xs text-muted-foreground">Add or edit users</p>
                </button>
                <button className="p-4 text-left rounded-lg border hover:bg-accent transition-colors">
                  <Database className="h-6 w-6 mb-2 text-green-600" />
                  <p className="font-medium">Database</p>
                  <p className="text-xs text-muted-foreground">View database stats</p>
                </button>
                <button className="p-4 text-left rounded-lg border hover:bg-accent transition-colors">
                  <Activity className="h-6 w-6 mb-2 text-purple-600" />
                  <p className="font-medium">Monitoring</p>
                  <p className="text-xs text-muted-foreground">System monitoring</p>
                </button>
                <button className="p-4 text-left rounded-lg border hover:bg-accent transition-colors">
                  <TrendingUp className="h-6 w-6 mb-2 text-orange-600" />
                  <p className="font-medium">Analytics</p>
                  <p className="text-xs text-muted-foreground">View detailed reports</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}