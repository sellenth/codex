import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  episodes: defineTable({
    number: v.number(),
    title: v.string(),
    description: v.string(),
    status: v.string(),
    airDate: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
  }),
  characters: defineTable({
    name: v.string(),
    age: v.number(),
    occupation: v.string(),
    bio: v.string(),
    promptDescription: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    status: v.string(),
  }),
  locations: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    ambiance: v.string(),
  }),
})
