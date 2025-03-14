import { Handle, Position, useEdges } from '@xyflow/react'

import NodeParamField from '@/app/mindmap/_components/nodes/NodeParamField'
import { ColorForHandle } from '@/app/mindmap/_components/nodes/Common'

import useFlowValidation from '@/hooks/useFlowValidation'
import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'

export function NodeInputs({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>
}

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParam
  nodeId: string
}) {
  const { invalidInputs } = useFlowValidation()
  const edges = useEdges()
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  )
  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name)

  return (
    <div
      className={cn(
        'flex justify-start relative p-3 bg-secondary w-full',
        hasErrors && 'bg-destructive/30'
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
    </div>
  )
}
