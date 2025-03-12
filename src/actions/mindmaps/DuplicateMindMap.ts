'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import {
  duplicateMindMapSchema,
  type duplicateMindMapSchemaType,
} from '@/schema/mindmaps'
import { MindMapStatus } from '@/types/mindmap'
import { getSession } from '../auth'

export async function duplicateMindMap(form: duplicateMindMapSchemaType) {
  const { success, data } = duplicateMindMapSchema.safeParse(form)

  if (!success) {
    throw new Error('Invalid form data')
  }

  const session = await getSession()

  if (!session) {
    throw new Error('Unauthenticated')
  }

  const sourceMindMap = await prisma.mindMap.findUnique({
    where: { id: data.mindMapId, userId: session.user.id! },
  })

  if (!sourceMindMap) {
    throw new Error('workflow not found')
  }

  const result = await prisma.mindMap.create({
    data: {
      userId: session.user.id!,
      name: data.name,
      description: data.description,
      status: MindMapStatus.DRAFT,
      definition: sourceMindMap.definition,
    },
  })

  if (!result) {
    throw new Error('Failed to duplicate workflow')
  }

  revalidatePath('/workflows')
}
