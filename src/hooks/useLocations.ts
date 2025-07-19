import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export function useLocations() {
  return useQuery(api.locations.listLocations)
}
