import { Node } from '@xyflow/react'

import { TaskParam, TaskType } from '@/types/task'

export interface AppNodeData {
  type: TaskType
  inputs: Record<string, string>
  [key: string]: any
}

export interface AppNode extends Node {
  data: AppNodeData
}

export interface ParamProps {
  param: TaskParam
  value: string
  updateNodeParamValue: (newValue: string) => void
  disabled?: boolean
  nearParam?: string
}

export type AppNodeMissingInputs = {
  nodeId: string
  inputs: string[]
}

export type NodeType = 'ROOT_NODE' | 'QUESTION_NODE'

export interface MindMapNode {
  id: string
  type: 'MindMapNode'
  dragHandle: string
  data: {
    type: NodeType
    inputs: any
  }
  position: {
    x: number
    y: number
  }
  measured: {
    width: number
    height: number
  }
  selected: boolean
  dragging: boolean
}

export interface MindMap {
  nodes: MindMapNode[]
  edges: any[]
  viewport: {
    x: number
    y: number
    zoom: number
  }
}

export interface ClassifiedNodes {
  ROOT_NODE: MindMapNode[]
  QUESTION_NODE: MindMapNode[]
}

export interface QuestionAnswer {
  question: string
  answer: string
}
