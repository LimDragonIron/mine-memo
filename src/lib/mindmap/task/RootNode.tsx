import { MindMapTask } from '@/types/mindmap'
import { TaskParamType, TaskType } from '@/types/task'
import { HexagonIcon, LucideProps } from 'lucide-react'
import { JSX, RefAttributes } from 'react'

export const RootNodeTask = {
  type: TaskType.ROOT_NODE,
  label: 'Root',
  icon: (
    props: JSX.IntrinsicAttributes &
      Omit<LucideProps, 'ref'> &
      RefAttributes<SVGSVGElement>
  ) => <HexagonIcon className="stroke-pink-400" {...props} />,
  isEntryPoint: true,
  inputs: [
    {
      name: 'Root Node',
      type: TaskParamType.STRING,
      helperText: 'eg: "Mind Map Book"',
      required: true,
      hideHandle: true,
    },
  ] as const,
  outputs: [],
} satisfies MindMapTask
