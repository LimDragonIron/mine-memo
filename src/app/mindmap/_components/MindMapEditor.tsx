'use client'

import { useCallback, useEffect } from 'react'
import { MindMap } from '@prisma/client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  MiniMap as Map,
} from '@xyflow/react'

import NodeComponent from '@/app/mindmap/_components/nodes/NodeComponent'
import DeletableEdge from '@/app/mindmap/_components/edges/DeletableEdge'

import '@xyflow/react/dist/style.css'
import { createMindNode } from '@/lib/mindmap/CreateMindNode'
import { TaskType } from '@/types/task'
import { AppNode } from '@/types/appnode'
import { TaskRegistry } from '@/lib/mindmap/task/Registry'
import DevTools from './Devtools'

const nodeTypes = {
  MindMapNode: NodeComponent,
}

const edgeTypes = {
  default: DeletableEdge,
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }

export default function MindMapEditor({ mindmap }: { mindmap: MindMap }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow()
  const proOptions = { hideAttribution: true }

  useEffect(() => {
    try {
      const flow = JSON.parse(mindmap.definition)
      if (!flow) return

      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])

      if (!flow.viewport) return

      const { x = 0, y = 0, zoom = 1 } = flow.viewport
      setViewport({ x, y, zoom })
    } catch (error) {}
  }, [mindmap.definition, setEdges, setNodes, setViewport])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const taskType = e.dataTransfer.getData('application/reactflow')
      if (typeof taskType === undefined || !taskType) return

      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY })

      const newNode = createMindNode(taskType as TaskType, position)
      setNodes((nds) => nds.concat(newNode))
    },
    [screenToFlowPosition, setNodes]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
      if (!connection.targetHandle) return

      // Remove input value if it is present on connection
      const node = nodes.find((nd) => nd.id === connection.target)
      if (!node) return

      const nodeInputs = node.data.inputs
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: '',
        },
      })
    },
    [setEdges, updateNodeData, nodes]
  )

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // Self-connection not allowed
      if (connection.source === connection.target) {
        return false
      }

      // Same taskParam type connection not allowed
      const source = nodes.find((node) => node.id === connection.source)
      const target = nodes.find((node) => node.id === connection.target)
      if (!source || !target) {
        console.error('Invalid connection: source or target node not found')
        return false
      }

      // Cycle connection not allowed
      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false
        visited.add(node.id)

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true
          if (hasCycle(outgoer, visited)) return true
        }
      }

      const detectedCycle = hasCycle(target)

      return !detectedCycle
    },
    [nodes, edges]
  )

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        proOptions={proOptions}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Map />
        {/* <DevTools /> */}
      </ReactFlow>
    </main>
  )
}
