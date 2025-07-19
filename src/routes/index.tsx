import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Users, MapPin, Film, Clapperboard } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const stats = [
    { label: 'Total Characters', value: '10', icon: Users, color: 'text-blue-500' },
    { label: 'Episodes Completed', value: '4', icon: Film, color: 'text-green-500' },
    { label: 'Couples Formed', value: '0', icon: Heart, color: 'text-pink-500' },
    { label: 'Active Scenes', value: '12', icon: Clapperboard, color: 'text-purple-500' },
  ]

  const recentEpisodes = [
    { id: '1', title: 'Dustin Intro', status: 'completed' },
    { id: '2', title: 'Maya and Blake Intro', status: 'completed' },
    { id: '3', title: 'Sofia and Tyler Intro', status: 'completed' },
    { id: '4', title: 'Dustin Arrives on the Island', status: 'completed' },
    { id: '5', title: 'Maya Arrives and Meets Dustin', status: 'planning' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Love Island Storyboard</h1>
        <p className="text-muted-foreground mt-2">
          Production management tool for creating Love Island episodes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Episodes</CardTitle>
            <CardDescription>
              Latest episodes in production
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEpisodes.map((episode) => (
                <Link
                  key={episode.id}
                  to="/episodes/$episodeId"
                  params={{ episodeId: episode.id }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <div className="font-medium">{episode.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Episode {episode.id}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    episode.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {episode.status}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              to="/storyboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Clapperboard className="h-5 w-5 text-purple-500" />
              <div>
                <div className="font-medium">Create New Scene</div>
                <div className="text-sm text-muted-foreground">
                  Start storyboarding a new scene
                </div>
              </div>
            </Link>
            <Link
              to="/characters"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">Manage Characters</div>
                <div className="text-sm text-muted-foreground">
                  View and edit character profiles
                </div>
              </div>
            </Link>
            <Link
              to="/locations"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <MapPin className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium">Browse Locations</div>
                <div className="text-sm text-muted-foreground">
                  Explore available shooting locations
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}