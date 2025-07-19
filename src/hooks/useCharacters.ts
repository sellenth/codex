import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export function useCharacters() {
  return useQuery(api.characters.listCharacters)
}
