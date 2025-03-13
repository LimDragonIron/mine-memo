'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { MindMapStatus } from '@/types/mindmap'
import { getSession } from '../auth'

export async function updateMindMap({
  id,
  definition,
}: {
  id: string
  definition: string
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
    throw new Error('MindMap not found')
  }

  await prisma.mindMap.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  })

  revalidatePath('/mindmaps')
}
