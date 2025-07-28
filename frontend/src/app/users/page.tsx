'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Plus, MoreHorizontal, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
  joinDate: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+1 (555) 987-6543',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-20'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'moderator',
    status: 'inactive',
    joinDate: '2024-01-08'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1 (555) 456-7890',
    role: 'user',
    status: 'pending',
    joinDate: '2024-03-01'
  }
]

const roleColors = {
  admin: 'bg-red-100 text-red-800',
  moderator: 'bg-blue-100 text-blue-800',
  user: 'bg-green-100 text-green-800'
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800'
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [users] = useState<User[]>(mockUsers)

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-2">
            Manage your application users and their permissions.
          </p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Users Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-2">
                    <Badge className={roleColors[user.role]}>
                      {user.role}
                    </Badge>
                    <Badge className={statusColors[user.status]}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">No users found matching your search.</p>
        </motion.div>
      )}
    </div>
  )
}