'use client'

import { MindMap } from '@prisma/client'
import { ReactFlowProvider } from '@xyflow/react'
import { MindMapStatus } from '@/types/mindmap'
import MindMapEditor from './MindMapEditor'
import Topbar from './topbar/TopBar'
import { FlowValidationContextProvider } from '@/components/context/FlowValidationContext'
import TaskMenu from './TaskMenu'

export default function Editor({ mindmap }: { mindmap: MindMap }) {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Topbar
            title="MindMap Editor"
            subtitle={mindmap.name}
            mindmapId={mindmap.id}
            isPublished={mindmap.status === MindMapStatus.PUBLISHED}
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <MindMapEditor mindmap={mindmap} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  )
}
