import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, MapPin } from 'lucide-react'
import type { Location } from '@/types/storyboard'

export const Route = createFileRoute('/locations')({
  component: LocationsPage,
})

function LocationsPage() {
  // Mock data for now
  const locations: Location[] = [
    {
      id: '1',
      name: 'Kitchen',
      description: 'Modern open-plan kitchen with island counter, perfect for cooking dates and morning chats.',
      imageUrl: 'https://via.placeholder.com/400x300',
      ambiance: 'casual',
    },
    {
      id: '2',
      name: 'Backyard',
      description: 'Spacious outdoor area with lounge seating, fire pit, and string lights for evening gatherings.',
      imageUrl: 'https://via.placeholder.com/400x300',
      ambiance: 'romantic',
    },
    {
      id: '3',
      name: 'Pool',
      description: 'Infinity pool with sun loungers and cabanas. The heart of daytime activities.',
      imageUrl: 'https://via.placeholder.com/400x300',
      ambiance: 'fun',
    },
    {
      id: '4',
      name: 'Beach',
      description: 'Private beach access with pristine sand and crystal-clear water for romantic walks.',
      imageUrl: 'https://via.placeholder.com/400x300',
      ambiance: 'romantic',
    },
    {
      id: '5',
      name: 'Fire Pit',
      description: 'Cozy fire pit area surrounded by comfortable seating for deep conversations.',
      imageUrl: 'https://via.placeholder.com/400x300',
      ambiance: 'dramatic',
    },
    {
      id: '6',
      name: 'Bedroom',
      description: 'Shared bedroom with multiple beds and private corners for intimate moments.',
      imageUrl: 'https://via.placeholder.com/400x300',
      ambiance: 'romantic',
    },
  ]

  const getAmbianceColor = (ambiance: Location['ambiance']) => {
    switch (ambiance) {
      case 'romantic':
        return 'bg-pink-100 text-pink-800'
      case 'casual':
        return 'bg-green-100 text-green-800'
      case 'dramatic':
        return 'bg-red-100 text-red-800'
      case 'fun':
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Locations</h1>
          <p className="text-muted-foreground mt-1">
            Available shooting locations for scenes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] relative bg-gray-100">
              {location.imageUrl ? (
                <img
                  src={location.imageUrl}
                  alt={location.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <MapPin className="h-20 w-20 text-gray-400" />
                </div>
              )}
              <Badge 
                className={`absolute top-2 right-2 ${getAmbianceColor(location.ambiance)}`}
              >
                {location.ambiance}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{location.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2">
                {location.description}
              </CardDescription>
              <Button variant="outline" className="w-full mt-4">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}