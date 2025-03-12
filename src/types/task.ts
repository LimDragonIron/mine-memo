export enum TaskType {
  ROOT_NODE = 'ROOT_NODE',
  QUESTION_NODE = 'QUESTION_NODE',
}

export enum TaskParamType {
  STRING = 'STRING',
  RICH_TEXT = 'RICHTEXT',
}

export interface TaskParam {
  name: string
  type: TaskParamType
  helperText?: string
  required?: boolean
  hideHandle?: boolean
  [key: string]: any
}
