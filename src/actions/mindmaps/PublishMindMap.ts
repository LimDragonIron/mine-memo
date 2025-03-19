'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { MindMapStatus } from '@/types/mindmap'
import { getSession } from '../auth'
import { MindMap, QuestionAnswer } from '@/types/appnode'

export async function publishMindMap({
  id,
  mindMapDefinition,
}: {
  id: string
  mindMapDefinition: string
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
    throw new Error('mindmap not found')
  }

  if (mindMap.status !== MindMapStatus.DRAFT) {
    throw new Error('mindmap is not a draft')
  }

  if (!mindmapVaildator(mindMapDefinition)) {
    throw new Error('Please fill in all the contents of the mind map.')
  }

  try {
    await prisma.mindMap.update({
      where: { id, userId },
      data: {
        definition: mindMapDefinition,
        status: MindMapStatus.PUBLISHED,
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }

  revalidatePath(`/mindmap/editor/${id}`)
}

function mindmapVaildator(mindMapString: string): boolean {
  let mindMap: MindMap
  try {
    mindMap = JSON.parse(mindMapString)
  } catch (error) {
    console.error('Invalid JSON string:', error)
    return false
  }

  const questionAnswers: QuestionAnswer[] = mindMap.nodes
    .filter((node) => node.data.type === 'QUESTION_NODE')
    .map((node) => ({
      question: node.data.inputs.question || '',
      answer: node.data.inputs.answer || '',
    }))
  

  if(questionAnswers.length == 0){
    return false
  }
  
  const result = validateQuestionAnswers(questionAnswers)

  return result
}

function validateQuestionAnswers(
  questionsAndAnswers: QuestionAnswer[]
): boolean {
  for (const qa of questionsAndAnswers) {
    if (!qa.question || !qa.answer) {
      return false
    }
  }
  return true
}
