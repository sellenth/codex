import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const listEpisodes = query({
  args: {},
  handler: async (ctx: any) => {
    return await ctx.db.query('episodes').collect()
  },
})

export const addEpisode = mutation({
  args: {
    number: v.number(),
    title: v.string(),
    description: v.string(),
    status: v.string(),
    airDate: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.insert('episodes', args)
  },
})
