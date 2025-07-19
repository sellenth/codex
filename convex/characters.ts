import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const listCharacters = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('characters').collect()
  },
})

export const getCharacter = query({
  args: { id: v.id('characters') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  },
})

export const addCharacter = mutation({
  args: {
    name: v.string(),
    age: v.number(),
    occupation: v.string(),
    bio: v.string(),
    imageUrl: v.optional(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('characters', args)
  },
})

export const updateCharacter = mutation({
  args: {
    id: v.id('characters'),
    name: v.string(),
    age: v.number(),
    occupation: v.string(),
    bio: v.string(),
    imageUrl: v.optional(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args
    await ctx.db.patch(id, rest)
  },
})
