import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Film, Calendar, Clock } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { Episode } from '@/types/storyboard'
import { useEpisodes } from '@/hooks/useEpisodes'

export const Route = createFileRoute('/episodes')({
  component: EpisodesPage,
})

function EpisodesPage() {
  const episodes = useEpisodes() as Episode[] | undefined
  const mockEpisodes: Episode[] = [
    {
      id: '1',
      number: 1,
      title: 'Dustin Intro',
      description: 'Meet Dustin, our first contestant arriving at the Love Island villa.',
      scenes: [],
      status: 'completed',
      airDate: '2024-01-15',
      thumbnailUrl: 'https://via.placeholder.com/400x225',
    },
    {
      id: '2',
      number: 2,
      title: 'Maya and Blake Intro',
      description: 'Maya and Blake make their grand entrance and shake things up.',
      scenes: [],
      status: 'completed',
      airDate: '2024-01-16',
      thumbnailUrl: 'https://via.placeholder.com/400x225',
    },
    {
      id: '3',
      number: 3,
      title: 'Sofia and Tyler Intro',
      description: 'Sofia and Tyler arrive, bringing new energy to the villa.',
      scenes: [],
      status: 'completed',
      airDate: '2024-01-17',
      thumbnailUrl: 'https://via.placeholder.com/400x225',
    },
    {
      id: '4',
      number: 4,
      title: 'Dustin Arrives on the Island',
      description: 'Dustin officially enters the villa and meets the other contestants.',
      scenes: [],
      status: 'completed',
      airDate: '2024-01-18',
      thumbnailUrl: 'https://via.placeholder.com/400x225',
    },
    {
      id: '5',
      number: 5,
      title: 'Maya Arrives and Meets Dustin',
      description: 'Maya enters the villa and has her first encounter with Dustin.',
      scenes: [],
      status: 'planning',
      thumbnailUrl: 'https://via.placeholder.com/400x225',
    },
  ]

  const episodesToShow = episodes ?? mockEpisodes

  const getStatusColor = (status: Episode['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800'
      case 'production':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBD'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Episodes</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track episode production
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Episode
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {episodesToShow.map((episode) => (
          <Card key={episode.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex">
              <div className="w-48 h-32 bg-gray-100 flex-shrink-0">
                {episode.thumbnailUrl ? (
                  <img
                    src={episode.thumbnailUrl}
                    alt={episode.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Film className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Episode {episode.number}</h3>
                      <Badge className={getStatusColor(episode.status)}>
                        {episode.status}
                      </Badge>
                    </div>
                    <h4 className="text-lg font-medium mt-1">{episode.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {episode.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(episode.airDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {episode.scenes.length} scenes
                  </div>
                </div>
                <Link
                  to="/episodes/$episodeId"
                  params={{ episodeId: episode.id }}
                  className="inline-flex mt-3"
                >
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}