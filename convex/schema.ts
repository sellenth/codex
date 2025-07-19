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
})
