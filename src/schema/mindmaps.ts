import { z } from 'zod'

export const createMindMapSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional(),
})

export type createMindMapSchemaType = z.infer<typeof createMindMapSchema>

export const duplicateMindMapSchema = createMindMapSchema.extend({
  mindMapId: z.string(),
})

export type duplicateMindMapSchemaType = z.infer<typeof duplicateMindMapSchema>
