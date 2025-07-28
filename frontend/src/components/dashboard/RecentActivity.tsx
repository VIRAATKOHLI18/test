'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target: string
  timestamp: string
  type: 'create' | 'update' | 'delete' | 'login'
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    user: { name: 'John Doe', initials: 'JD' },
    action: 'created',
    target: 'new user account',
    timestamp: '2 minutes ago',
    type: 'create'
  },
  {
    id: '2',
    user: { name: 'Sarah Wilson', initials: 'SW' },
    action: 'updated',
    target: 'profile settings',
    timestamp: '5 minutes ago',
    type: 'update'
  },
  {
    id: '3',
    user: { name: 'Mike Johnson', initials: 'MJ' },
    action: 'deleted',
    target: 'old backup file',
    timestamp: '10 minutes ago',
    type: 'delete'
  },
  {
    id: '4',
    user: { name: 'Emily Davis', initials: 'ED' },
    action: 'logged in',
    target: 'admin panel',
    timestamp: '15 minutes ago',
    type: 'login'
  }
]

const typeColors = {
  create: 'bg-green-100 text-green-800',
  update: 'bg-blue-100 text-blue-800',
  delete: 'bg-red-100 text-red-800',
  login: 'bg-gray-100 text-gray-800'
}

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback className="text-xs">
                  {activity.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity.user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.action} {activity.target}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary" 
                  className={typeColors[activity.type]}
                >
                  {activity.type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}