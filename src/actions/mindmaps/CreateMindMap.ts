'use server'

import prisma from '@/lib/prisma'
import { createMindMapSchema, createMindMapSchemaType } from '@/schema/mindmaps'
import { getSession } from '../auth'
import { Edge } from '@xyflow/react'
import { AppNode } from '@/types/appnode'
import { TaskType } from '@/types/task'
import { createMindNode } from '@/lib/mindmap/CreateMindNode'
import { redirect } from 'next/navigation'
import { MindMapStatus } from '@/types/mindmap'

export async function createMindMap(from: createMindMapSchemaType) {
  const { success, data } = createMindMapSchema.safeParse(from)

  if (!success) {
    throw new Error('Invalid input')
  }

  const session = await getSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  }

  //Lets add the root node
  initialFlow.nodes.push(createMindNode(TaskType.ROOT_NODE))
  try {
    const result = await prisma.mindMap.create({
      data: {
        userId: session.user.id!,
        status: MindMapStatus.DRAFT,
        definition: JSON.stringify(initialFlow),
        ...data,
      },
    })

    if (!result) {
      throw new Error('Failed to create mindmap from Server')
    }

    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}
