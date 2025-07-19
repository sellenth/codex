import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export function useEpisodes() {
  return useQuery(api.episodes.listEpisodes)
}
