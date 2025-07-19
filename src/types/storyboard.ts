export interface Character {
  id: string
  name: string
  age: number
  occupation: string
  bio: string
  imageUrl: string
  status: 'single' | 'coupled' | 'eliminated'
}

export interface Location {
  id: string
  name: string
  description: string
  imageUrl: string
  ambiance: 'romantic' | 'casual' | 'dramatic' | 'fun'
}

export interface Scene {
  id: string
  episodeId: string
  orderIndex: number
  title: string
  description: string
  characterIds: string[]
  locationId: string
  script: string
  generatedImageUrl?: string
  generatedVideoUrl?: string
  generatedAudioUrl?: string
  duration: number // in seconds
  status: 'draft' | 'generating' | 'generated' | 'approved'
}

export interface Episode {
  id: string
  number: number
  title: string
  description: string
  scenes: Scene[]
  status: 'planning' | 'production' | 'completed'
  airDate?: string
  thumbnailUrl?: string
}

export interface GenerationSettings {
  mockMode: boolean
  apiKeys: {
    openai?: string
    anthropic?: string
    elevenlabs?: string
    falai?: string
  }
  defaultModels: {
    chat: 'openai' | 'anthropic'
    speech: 'elevenlabs'
    image: 'falai'
    video: 'falai'
  }
}