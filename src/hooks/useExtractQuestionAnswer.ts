import { useMemo } from 'react'
import DOMPurify from 'isomorphic-dompurify'

import { MindMap, QuestionAnswer } from '@/types/appnode'

function extractQuestionAndAnswer(mindMapString: string): QuestionAnswer[] {
  let mindMap: MindMap
  try {
    mindMap = JSON.parse(mindMapString)
  } catch (error) {
    console.error('Invalid JSON string:', error)
    return []
  }

  const questionAnswers: QuestionAnswer[] = mindMap.nodes
    .filter((node) => node.data.type === 'QUESTION_NODE')
    .map((node) => ({
      question: node.data.inputs.question || '',
      answer: DOMPurify.sanitize(node.data.inputs.answer || ''),
    }))

  return questionAnswers
}

export function useExtractQuestionAnswer(
  mindMapString: string
): QuestionAnswer[] {
  return useMemo(() => extractQuestionAndAnswer(mindMapString), [mindMapString])
}
