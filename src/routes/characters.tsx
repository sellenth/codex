import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, User } from 'lucide-react'
import type { Character } from '@/types/storyboard'

export const Route = createFileRoute('/characters')({
  component: CharactersPage,
})

function CharactersPage() {
  // Mock data for now
  const characters: Character[] = [
    {
      id: '1',
      name: 'Dustin',
      age: 25,
      occupation: 'Personal Trainer',
      bio: 'Fitness enthusiast looking for his perfect match. Loves adventure and spontaneous trips.',
      imageUrl: 'https://via.placeholder.com/300x400',
      status: 'single',
    },
    {
      id: '2',
      name: 'Maya',
      age: 23,
      occupation: 'Social Media Influencer',
      bio: 'Living life to the fullest! Looking for someone who can keep up with my energy.',
      imageUrl: 'https://via.placeholder.com/300x400',
      status: 'single',
    },
    {
      id: '3',
      name: 'Blake',
      age: 27,
      occupation: 'Entrepreneur',
      bio: 'Built my own business from scratch. Now looking to build something special with someone.',
      imageUrl: 'https://via.placeholder.com/300x400',
      status: 'single',
    },
    {
      id: '4',
      name: 'Sofia',
      age: 24,
      occupation: 'Fashion Designer',
      bio: 'Creative soul with a passion for style. Seeking someone who appreciates the finer things.',
      imageUrl: 'https://via.placeholder.com/300x400',
      status: 'single',
    },
    {
      id: '5',
      name: 'Tyler',
      age: 26,
      occupation: 'Professional Surfer',
      bio: 'Beach lover and thrill seeker. Looking for someone to ride the waves of life with.',
      imageUrl: 'https://via.placeholder.com/300x400',
      status: 'single',
    },
  ]

  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'single':
        return 'bg-blue-100 text-blue-800'
      case 'coupled':
        return 'bg-pink-100 text-pink-800'
      case 'eliminated':
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Characters</h1>
          <p className="text-muted-foreground mt-1">
            Manage contestant profiles and information
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Character
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Card key={character.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[3/4] relative bg-gray-100">
              {character.imageUrl ? (
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <User className="h-20 w-20 text-gray-400" />
                </div>
              )}
              <Badge 
                className={`absolute top-2 right-2 ${getStatusColor(character.status)}`}
              >
                {character.status}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{character.name}</CardTitle>
              <CardDescription>
                {character.age} • {character.occupation}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {character.bio}
              </p>
              <Button variant="outline" className="w-full mt-4">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}