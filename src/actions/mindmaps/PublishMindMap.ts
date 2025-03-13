'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { MindMapStatus } from '@/types/mindmap'
import { getSession } from '../auth'

export async function publishMindMap({
  id,
  flowDefinition,
}: {
  id: string
  flowDefinition: string
}) {
  const session = await getSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const userId = session.user.id!

  const mindMap = await prisma.mindMap.findFirst({
    where: {
      id,
      userId,
    },
  })

  if (!mindMap) {
    throw new Error('workflow not found')
  }

  if (mindMap.status !== MindMapStatus.DRAFT) {
    throw new Error('workflow is not a draft')
  }

  await prisma.mindMap.update({
    where: { id, userId },
    data: {
      definition: flowDefinition,
      status: MindMapStatus.PUBLISHED,
    },
  })

  revalidatePath(`/workflow/editor/${id}`)
}
