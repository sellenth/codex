import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const listLocations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('locations').collect()
  },
})

export const getLocation = query({
  args: { id: v.id('locations') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  },
})

export const addLocation = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    ambiance: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('locations', args)
  },
})

export const updateLocation = mutation({
  args: {
    id: v.id('locations'),
    name: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    ambiance: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args
    await ctx.db.patch(id, rest)
  },
})
