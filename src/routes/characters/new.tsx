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
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/characters/new')({
  component: NewCharacterPage,
})

function NewCharacterPage() {
  const navigate = useNavigate()
  const addCharacter = useMutation(api.characters.addCharacter)

  const [formData, setFormData] = useState({
    name: '',
    age: 18,
    occupation: '',
    bio: '',
    imageUrl: '',
    status: 'single' as const,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await addCharacter({
        name: formData.name,
        age: formData.age,
        occupation: formData.occupation,
        bio: formData.bio,
        imageUrl: formData.imageUrl || undefined,
        status: formData.status,
      })
      navigate({ to: '/characters' })
    } catch (error) {
      console.error('Failed to create character:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/characters' })}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Character</h1>
          <p className="text-muted-foreground mt-1">Add a new contestant</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Character Details</CardTitle>
          <CardDescription>Fill in the information for your new character</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" value={formData.occupation} onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={4} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input id="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="coupled">Coupled</SelectItem>
                  <SelectItem value="eliminated">Eliminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create Character'}</Button>
              <Button type="button" variant="outline" onClick={() => navigate({ to: '/characters' })}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
