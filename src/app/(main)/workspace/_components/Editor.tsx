'use client'

import { ReactFlowProvider } from '@xyflow/react'

export default function Editor() {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <section></section>
      </div>
    </ReactFlowProvider>
  )
}
