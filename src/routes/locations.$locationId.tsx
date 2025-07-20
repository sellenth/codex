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
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { ArrowLeft } from 'lucide-react'
import { ImageGenerator } from '@/components/ImageGenerator'

export const Route = createFileRoute('/locations/$locationId')({
  component: EditLocationPage,
})

function EditLocationPage() {
  const { locationId } = Route.useParams()
  const navigate = useNavigate()
  const location = useQuery(api.locations.getLocation, { id: locationId as any })
  const updateLocation = useMutation(api.locations.updateLocation)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    ambiance: 'romantic' as const,
  })

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name,
        description: location.description,
        imageUrl: location.imageUrl || '',
        ambiance: location.ambiance as any,
      })
    }
  }, [location])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await updateLocation({
        id: locationId as any,
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl || undefined,
        ambiance: formData.ambiance,
      })
      navigate({ to: '/locations' })
    } catch (error) {
      console.error('Failed to update location:', error)
      setIsSubmitting(false)
    }
  }

  if (!location) return <div>Loading...</div>

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/locations' })}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Location</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
          <CardDescription>Edit the information for this location</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input id="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="Paste an image URL or generate one below" />
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Location preview" className="w-full max-h-48 object-cover rounded-md" />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ambiance">Ambiance</Label>
              <Select value={formData.ambiance} onValueChange={(value) => setFormData({ ...formData, ambiance: value as any })}>
                <SelectTrigger id="ambiance">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="romantic">Romantic</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="fun">Fun</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</Button>
              <Button type="button" variant="outline" onClick={() => navigate({ to: '/locations' })}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ImageGenerator
        onImageGenerated={(imageUrl) => setFormData({ ...formData, imageUrl })}
        defaultPrompt={formData.name ? `${formData.name} - ${formData.description}` : ''}
        aspectRatio="16:9"
      />
    </div>
  )
}
