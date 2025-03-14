'use client'

import { ParamProps } from '@/types/appnode'
import ContextDialog from '../../ContextDialog'

export default function RichTextParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
  nearParam,
}: ParamProps) {
  return (
    <div className="space-y-1 p-1 w-full">
      <div className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </div>
      <ContextDialog
        param={param}
        value={value}
        nearParam={nearParam}
        updateNodeParamValue={updateNodeParamValue}
        disabled={disabled}
      />
    </div>
  )
}
