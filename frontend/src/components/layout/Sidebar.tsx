'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Shield,
  Database,
  Activity
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Overview',
    items: [
      { href: '/', label: 'Dashboard', icon: Home },
      { href: '/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/activity', label: 'Activity', icon: Activity },
    ]
  },
  {
    title: 'Management',
    items: [
      { href: '/users', label: 'Users', icon: Users },
      { href: '/content', label: 'Content', icon: FileText },
      { href: '/database', label: 'Database', icon: Database },
    ]
  },
  {
    title: 'System',
    items: [
      { href: '/security', label: 'Security', icon: Shield },
      { href: '/settings', label: 'Settings', icon: Settings },
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16">
      <div className="flex flex-col flex-grow bg-background border-r overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-8">
          {sidebarItems.map((section) => (
            <div key={section.title}>
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="mt-3 space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'mr-3 h-4 w-4 flex-shrink-0',
                          isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                        )}
                      />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}