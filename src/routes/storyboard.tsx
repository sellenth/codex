import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Wand2, Download, Eye, Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { Character, Location } from '@/types/storyboard'

export const Route = createFileRoute('/storyboard')({
  component: StoryboardPage,
})

function StoryboardPage() {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [script, setScript] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  // Mock data
  const characters: Character[] = [
    { id: '1', name: 'Dustin', age: 25, occupation: 'Personal Trainer', bio: '', imageUrl: 'https://via.placeholder.com/150', status: 'single' },
    { id: '2', name: 'Maya', age: 23, occupation: 'Social Media Influencer', bio: '', imageUrl: 'https://via.placeholder.com/150', status: 'single' },
    { id: '3', name: 'Blake', age: 27, occupation: 'Entrepreneur', bio: '', imageUrl: 'https://via.placeholder.com/150', status: 'single' },
    { id: '4', name: 'Sofia', age: 24, occupation: 'Fashion Designer', bio: '', imageUrl: 'https://via.placeholder.com/150', status: 'single' },
    { id: '5', name: 'Tyler', age: 26, occupation: 'Professional Surfer', bio: '', imageUrl: 'https://via.placeholder.com/150', status: 'single' },
  ]

  const locations: Location[] = [
    { id: '1', name: 'Kitchen', description: 'Modern open-plan kitchen', imageUrl: '', ambiance: 'casual' },
    { id: '2', name: 'Backyard', description: 'Outdoor lounge area', imageUrl: '', ambiance: 'romantic' },
    { id: '3', name: 'Pool', description: 'Infinity pool area', imageUrl: '', ambiance: 'fun' },
    { id: '4', name: 'Beach', description: 'Private beach', imageUrl: '', ambiance: 'romantic' },
    { id: '5', name: 'Fire Pit', description: 'Cozy fire pit area', imageUrl: '', ambiance: 'dramatic' },
  ]

  const toggleCharacter = (characterId: string) => {
    setSelectedCharacters(prev =>
      prev.includes(characterId)
        ? prev.filter(id => id !== characterId)
        : [...prev, characterId]
    )
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate generation
    setTimeout(() => {
      setGeneratedImage('https://via.placeholder.com/800x450')
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Storyboard Creator</h1>
        <p className="text-muted-foreground mt-1">
          Create scenes by selecting characters, locations, and writing scripts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scene Setup</CardTitle>
              <CardDescription>
                Configure your scene parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Select Characters (0-10)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {characters.map((character) => (
                    <div
                      key={character.id}
                      className={`relative border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedCharacters.includes(character.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleCharacter(character.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedCharacters.includes(character.id)}
                          onCheckedChange={() => toggleCharacter(character.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <img
                          src={character.imageUrl}
                          alt={character.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{character.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {character.occupation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="location">Select Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Choose a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        <div className="flex items-center gap-2">
                          <span>{location.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {location.ambiance}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="script">Scene Script</Label>
                <Textarea
                  id="script"
                  placeholder="Write the dialogue and action for this scene..."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={!selectedLocation || selectedCharacters.length === 0 || !script || isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Scene
                    </>
                  )}
                </Button>
                <Button variant="outline" disabled={!generatedImage}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button variant="outline" disabled={!generatedImage}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {generatedImage && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Scene</CardTitle>
                <CardDescription>
                  AI-generated preview of your scene
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={generatedImage}
                    alt="Generated scene"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scene Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Selected Characters ({selectedCharacters.length})
                </p>
                {selectedCharacters.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedCharacters.map(id => {
                      const character = characters.find(c => c.id === id)
                      return character ? (
                        <Badge key={id} variant="secondary">
                          {character.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">None selected</p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Location
                </p>
                {selectedLocation ? (
                  <Badge variant="secondary">
                    {locations.find(l => l.id === selectedLocation)?.name}
                  </Badge>
                ) : (
                  <p className="text-sm text-muted-foreground">Not selected</p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Script Length
                </p>
                <p className="text-sm">
                  {script.length} characters
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Generation Status
                </p>
                <Badge variant={generatedImage ? 'default' : 'outline'}>
                  {generatedImage ? 'Generated' : 'Not Generated'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Select 1-10 characters for your scene</p>
              <p>• Choose a location that matches the mood</p>
              <p>• Write clear, descriptive dialogue and actions</p>
              <p>• Generated images serve as the first frame for video</p>
              <p>• Use mock mode in settings to test without API calls</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}