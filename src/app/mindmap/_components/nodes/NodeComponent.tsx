import { memo } from 'react';
import { NodeProps } from '@xyflow/react';

import NodeCard from '@/app/mindmap/_components/nodes/NodeCard';
import NodeHeader from '@/app/mindmap/_components/nodes/NodeHeader';
import { NodeInput, NodeInputs } from '@/app/mindmap/_components/nodes/NodeInput';

import { TaskRegistry } from '@/lib/mindmap/task/Registry';
import { AppNodeData } from '@/types/appnode';

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = 'NodeComponent';
