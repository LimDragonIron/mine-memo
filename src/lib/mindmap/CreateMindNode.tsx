import { AppNode } from '@/types/appnode'
import { TaskType } from '@/types/task'

export function createMindNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: 'MindMapNode',
    dragHandle: '.drag-handle',
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  }
}
