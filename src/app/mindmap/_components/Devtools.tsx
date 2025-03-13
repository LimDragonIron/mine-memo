import {
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  type HTMLAttributes,
} from 'react'
import { Panel } from '@xyflow/react'

import NodeInspector from './devtools/NodeInspector'
import ChangeLogger from './devtools/ChangeLogger'
import ViewportLogger from './devtools/ViewportLogger'

export default function DevTools() {
  const [nodeInspectorActive, setNodeInspectorActive] = useState(true)
  const [changeLoggerActive, setChangeLoggerActive] = useState(true)
  const [viewportLoggerActive, setViewportLoggerActive] = useState(true)

  return (
    <div className="react-flow__devtools">
      <Panel position="top-right">
        <DevToolButton
          setActive={setNodeInspectorActive}
          active={nodeInspectorActive}
          title="Toggle Node Inspector"
        >
          Node Inspector
        </DevToolButton>
        <DevToolButton
          setActive={setChangeLoggerActive}
          active={changeLoggerActive}
          title="Toggle Change Logger"
        >
          Change Logger
        </DevToolButton>
        <DevToolButton
          setActive={setViewportLoggerActive}
          active={viewportLoggerActive}
          title="Toggle Viewport Logger"
        >
          Viewport Logger
        </DevToolButton>
      </Panel>
      {changeLoggerActive && <ChangeLogger />}
      {nodeInspectorActive && <NodeInspector />}
      {viewportLoggerActive && <ViewportLogger />}
    </div>
  )
}

function DevToolButton({
  active,
  setActive,
  children,
  ...rest
}: {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  children: ReactNode
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={() => setActive((a) => !a)}
      className={active ? 'active' : ''}
      {...rest}
    >
      {children}
    </button>
  )
}
