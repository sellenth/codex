import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Film, Clock, Users, MapPin } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { Episode, Scene } from '@/types/storyboard'

export const Route = createFileRoute('/episodes/$episodeId')({
  component: EpisodeDetailPage,
})

function EpisodeDetailPage() {
  const { episodeId } = Route.useParams()
  
  // Mock data - in real app, fetch based on episodeId
  const episode: Episode = {
    id: episodeId,
    number: parseInt(episodeId),
    title: episodeId === '5' ? 'Maya Arrives and Meets Dustin' : `Episode ${episodeId}`,
    description: 'Maya enters the villa and has her first encounter with Dustin. Sparks fly as they get to know each other by the pool.',
    scenes: [
      {
        id: '1',
        episodeId: episodeId,
        orderIndex: 1,
        title: 'Maya Arrives at the Villa',
        description: 'Maya makes her grand entrance',
        characterIds: ['2'],
        locationId: '2',
        script: 'Maya walks through the villa entrance...',
        duration: 120,
        status: 'draft',
      },
      {
        id: '2',
        episodeId: episodeId,
        orderIndex: 2,
        title: 'First Meeting by the Pool',
        description: 'Maya and Dustin meet for the first time',
        characterIds: ['1', '2'],
        locationId: '3',
        script: 'Dustin is lounging by the pool when Maya appears...',
        duration: 180,
        status: 'draft',
      },
    ],
    status: 'planning',
  }

  const getStatusColor = (status: Scene['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'generating':
        return 'bg-yellow-100 text-yellow-800'
      case 'generated':
        return 'bg-blue-100 text-blue-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/episodes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Episode {episode.number}</h1>
            <Badge className={episode.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
              {episode.status}
            </Badge>
          </div>
          <h2 className="text-xl text-muted-foreground mt-1">{episode.title}</h2>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Scene
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Episode Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{episode.description}</p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Film className="h-4 w-4 text-muted-foreground" />
              <span>{episode.scenes.length} Scenes</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {formatDuration(episode.scenes.reduce((acc, scene) => acc + scene.duration, 0))} Total
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Scenes</h3>
        {episode.scenes.map((scene, index) => (
          <Card key={scene.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-lg">{scene.title}</h4>
                    <Badge className={getStatusColor(scene.status)}>
                      {scene.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{scene.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit Scene
                </Button>
              </div>
              
              <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {scene.characterIds.length} Characters
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Location ID: {scene.locationId}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(scene.duration)}
                </div>
              </div>

              {scene.script && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm italic">"{scene.script}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}