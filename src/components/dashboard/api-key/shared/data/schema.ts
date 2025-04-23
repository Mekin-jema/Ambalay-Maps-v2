import { z } from 'zod'

const clientStatusSchema = z.union([
  z.literal('Active'),
  z.literal('Inactive'),
])

export type UserStatus = z.infer<typeof clientStatusSchema>

const clientActionSchema = z.union([
  z.literal('view'),
  z.literal('copy'),
  z.literal('delete'),
])

export type UserRole = z.infer<typeof clientActionSchema>

const clientSchema = z.object({
  id: z.string().uuid(),
  apiKey: z.string(), // can later add a regex if API key pattern needs validation
  user: z.string(),
  realm: z.string(),
  createdAt: z.string(), // 'timeago' format, e.g., "2 hours ago"
  status: clientStatusSchema,
  actions: z.array(clientActionSchema),
  selected: z.boolean(),
})
export type User = z.infer<typeof clientSchema>

export const clientListSchema = z.array(clientSchema)
