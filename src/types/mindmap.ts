import { LucideProps } from 'lucide-react'
import { TaskType, TaskParam } from './task'

export enum MindMapStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export type MindMapTask = {
  type: TaskType
  label: string
  icon: React.FC<LucideProps>
  isEntryPoint?: boolean
  inputs: TaskParam[]
  outputs: TaskParam[]
}
