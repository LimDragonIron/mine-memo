import { ClassifiedNodes, MindMap } from '@/types/appnode'
import { useMemo } from 'react'

function classifyNodes(mindMap: MindMap): ClassifiedNodes {
  const classifiedNodes: ClassifiedNodes = {
    ROOT_NODE: [],
    QUESTION_NODE: [],
  }

  mindMap.nodes.forEach((node) => {
    if (node.data.type === 'ROOT_NODE') {
      classifiedNodes.ROOT_NODE.push(node)
    } else if (node.data.type === 'QUESTION_NODE') {
      classifiedNodes.QUESTION_NODE.push(node)
    }
  })

  return classifiedNodes
}

export function useClassifyNodes(mindMap: MindMap): ClassifiedNodes {
  return useMemo(() => classifyNodes(mindMap), [mindMap])
}
