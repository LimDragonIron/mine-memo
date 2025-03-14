'use client'

import { useId } from 'react'

import { Label } from '@/components/ui/label'

import { ParamProps } from '@/types/appnode'
import ContextDialog from '../../ContextDialog'

export default function RichTextParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const id = useId()
  return (
    <div className="space-y-1 p-1 w-full">
      <div className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </div>
      <ContextDialog
        param={param}
        value={value}
        updateNodeParamValue={updateNodeParamValue}
        disabled={disabled}
      />
    </div>
  )
}
