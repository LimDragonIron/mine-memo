import { TaskType } from '@/types/task'
import { MindMapTask } from '@/types/mindmap'

import { RootNodeTask } from './RootNode'
import { QuestionTask } from './QuestionNode'

type Registry = {
  [k in TaskType]: MindMapTask & { type: k }
}

export const TaskRegistry: Registry = {
  ROOT_NODE: RootNodeTask,
  QUESTION_NODE: QuestionTask,
}
