'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { getSession } from '../auth'

export async function deleteMindMap(id: string) {
  const session = await getSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  await prisma.mindMap.delete({
    where: {
      id,
      userId: session.user.id!,
    },
  })

  revalidatePath('/mindmaps')
}
