import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/episodes/new')({
  component: NewEpisodePage,
})

function NewEpisodePage() {
  const navigate = useNavigate()
  const episodes = useQuery(api.episodes.listEpisodes)
  const addEpisode = useMutation(api.episodes.addEpisode)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'planning' as const,
    airDate: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const episodeNumber = episodes ? episodes.length + 1 : 1
      await addEpisode({
        number: episodeNumber,
        title: formData.title,
        description: formData.description,
        status: formData.status,
        airDate: formData.airDate || undefined,
      })
      navigate({ to: '/episodes' })
    } catch (error) {
      console.error('Failed to create episode:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: '/episodes' })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Episode</h1>
          <p className="text-muted-foreground mt-1">
            Add a new episode to your series
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Episode Details</CardTitle>
          <CardDescription>
            Fill in the information for your new episode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter episode title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what happens in this episode"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="airDate">Air Date (Optional)</Label>
              <Input
                id="airDate"
                type="date"
                value={formData.airDate}
                onChange={(e) => setFormData({ ...formData, airDate: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Episode'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/episodes' })}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}