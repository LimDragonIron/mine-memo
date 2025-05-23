'use client'

import { useCallback } from 'react'
import { useReactFlow } from '@xyflow/react'

import { TaskParam, TaskParamType } from '@/types/task'
import { AppNode } from '@/types/appnode'

import StringParam from '@/app/mindmap/_components/nodes/param/StringParam'
import RichTextParam from '@/app/mindmap/_components/nodes/param/RichTextParam'

export default function NodeParamField({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParam
  nodeId: string
  disabled: boolean
}) {
  const { updateNodeData, getNode } = useReactFlow()
  const node = getNode(nodeId) as AppNode
  const value = node?.data.inputs?.[param.name]
  const nearValue = node?.data.inputs?.['question']

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      })
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs]
  )

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      )
    case TaskParamType.RICH_TEXT:
      return (
        <RichTextParam
          param={param}
          value={value}
          nearParam={nearValue}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      )
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      )
  }
}
