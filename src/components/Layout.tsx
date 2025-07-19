import { Link, Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { 
  Users, 
  MapPin, 
  Film, 
  Clapperboard, 
  Settings,
  Heart
} from 'lucide-react'

const navigation = [
  { name: 'Characters', href: '/characters', icon: Users },
  { name: 'Locations', href: '/locations', icon: MapPin },
  { name: 'Episodes', href: '/episodes', icon: Film },
  { name: 'Storyboard', href: '/storyboard', icon: Clapperboard },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold">Love Island Storyboard</span>
            </Link>
            
            <nav className="flex items-center gap-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    activeProps={{
                      className: 'text-primary',
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}