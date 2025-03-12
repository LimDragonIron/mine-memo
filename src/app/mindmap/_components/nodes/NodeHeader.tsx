'use client'

import { useReactFlow } from '@xyflow/react'
import { CopyIcon, GripVerticalIcon, TrashIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { TaskType } from '@/types/task'
import { AppNode } from '@/types/appnode'
import { createMindNode } from '@/lib/mindmap/CreateMindNode'
import { TaskRegistry } from '@/lib/mindmap/task/Registry'

export default function NodeHeader({
  taskType,
  nodeId,
}: {
  taskType: TaskType
  nodeId: string
}) {
  const task = TaskRegistry[taskType]
  const { deleteElements, getNode, addNodes } = useReactFlow()

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          {!task.isEntryPoint && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  deleteElements({ nodes: [{ id: nodeId }] })
                }}
              >
                <TrashIcon size={12} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const node = getNode(nodeId) as AppNode
                  const newX = node.position.x
                  const newY = node.position.y
                  const newNode = createMindNode(node.data.type, {
                    x: newX,
                    y: newY + node.measured?.height! + 20,
                  })
                  addNodes([newNode])
                }}
              >
                <CopyIcon size={12} />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="drag-handle cursor-grab active:cursor-grabbing"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
