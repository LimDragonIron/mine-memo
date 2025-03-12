import { CircleHelpIcon, LucideProps } from 'lucide-react'
import { TaskParamType, TaskType } from '@/types/task'
import { MindMapTask } from '@/types/mindmap'
import { JSX, RefAttributes } from 'react'

export const QuestionTask = {
  type: TaskType.QUESTION_NODE,
  label: 'Question Element',
  isEntryPoint: false,
  icon: (
    props: JSX.IntrinsicAttributes &
      Omit<LucideProps, 'ref'> &
      RefAttributes<SVGSVGElement>
  ) => <CircleHelpIcon className="stroke-orange-400" {...props} />,
  inputs: [
    {
      name: '질문',
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: '내용',
      type: TaskParamType.RICH_TEXT,
      required: true,
    },
  ] as const,
  outputs: [] as const,
} satisfies MindMapTask
