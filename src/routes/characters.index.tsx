import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, User } from 'lucide-react'
import type { Character } from '@/types/storyboard'
import { useCharacters } from '@/hooks/useCharacters'

export const Route = createFileRoute('/characters/')({
  component: CharactersPage,
})

function CharactersPage() {
  const characters = useCharacters() as Character[] | undefined

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
        <Link to="/characters/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Character
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(characters ?? []).map((character) => (
          <Card key={(character as any)._id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
              <Link to="/characters/$characterId" params={{ characterId: (character as any)._id }} className="w-full mt-4 inline-block">
                <Button variant="outline" className="w-full">View Profile</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}