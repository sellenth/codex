export interface AttractionCharacter {
  id: string
  name: string
  age: number
  occupation: string
  location: string
  personality: string
  bio: string
  veo3Description: string
  imageUrl?: string
  status: 'active' | 'coupled' | 'eliminated' | 'winner'
  coupledWith?: string
  eliminatedEpisode?: number
  arrivalEpisode: number
}

export interface AttractionScene {
  id: string
  episodeId: string
  orderIndex: number
  title: string
  description: string
  characterIds: string[]
  locationId: string
  sceneType: 'intro' | 'challenge' | 'date' | 'confession' | 'elimination' | 'drama' | 'comedy'
  veo3Prompt?: string
  narratorScript: string
  generatedVideoUrl?: string
  generatedAudioUrl?: string
  duration: number // in seconds (target 30s)
  status: 'draft' | 'generating' | 'generated' | 'approved'
}

export interface AttractionEpisode {
  id: string
  number: number
  title: string
  description: string
  scenes: AttractionScene[]
  plotPoints: string[] // Key events that happened
  status: 'planning' | 'production' | 'completed' | 'published'
  publishDate?: string
  thumbnailUrl?: string
  socialMediaStats?: {
    views: number
    likes: number
    shares: number
    comments: number
  }
}

export interface Challenge {
  id: string
  name: string
  description: string
  type: 'physical' | 'mental' | 'romantic' | 'trust'
  winnerIds?: string[]
  episodeId: string
}

export interface Couple {
  id: string
  partner1Id: string
  partner2Id: string
  formedEpisode: number
  endedEpisode?: number
  status: 'active' | 'broken' | 'winner'
  compatibilityScore?: number
}

export interface PlotSummary {
  episodeRange: { start: number, end: number }
  keyEvents: string[]
  activeCharacters: string[]
  activeCouples: string[]
  upcomingDrama: string[]
}

export interface PromptTemplate {
  id: string
  name: string
  type: 'veo3' | 'narrator'
  template: string
  variables: string[] // e.g., ['characterName', 'location', 'action']
  exampleOutput?: string
}

export interface AttractionIslandData {
  characters: AttractionCharacter[]
  episodes: AttractionEpisode[]
  challenges: Challenge[]
  couples: Couple[]
  plotSummaries: PlotSummary[]
  promptTemplates: PromptTemplate[]
  settings: {
    showName: string
    season: number
    prizeAmount: string
    islandName: string
    hostName?: string
  }
}