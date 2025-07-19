import { Link, Outlet } from '@tanstack/react-router'
import {
  Users,
  MapPin,
  Film,
  Clapperboard,
  Settings,
  Sparkles,
  Heart,
  Menu,
  X
} from 'lucide-react'
import * as React from 'react'

const navigation = [
  { name: 'Characters', href: '/characters', icon: Users },
  { name: 'Locations', href: '/locations', icon: MapPin },
  { name: 'Episodes', href: '/episodes', icon: Film },
  { name: 'Storyboard', href: '/storyboard', icon: Clapperboard },
  { name: 'fal.ai', href: '/fal', icon: Sparkles },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Layout() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold">Attraction Island Storyboard</span>
            </Link>

            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <nav className="hidden md:flex items-center gap-6">
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
          {menuOpen && (
            <nav className="flex flex-col gap-2 py-2 md:hidden">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary px-2 py-1"
                    activeProps={{
                      className: 'text-primary',
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}