'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ParamProps } from '@/types/appnode'

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

export default function ContextDialog({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const [editorContent, setEditorContent] = useState(value)
  const [isOpen, setIsOpen] = useState(false)

  const toolbarOptions = [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link'], // 이미지 옵션 제거
    ['clean'],
  ]

  const modules = {
    toolbar: toolbarOptions,
  }

  const handleEditorChange = (content: any) => {
    setEditorContent(content)
  }

  const onClickSave = () => {
    updateNodeParamValue(editorContent)
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <DialogTrigger className="flex" asChild>
        {value == undefined ? (
          <Button variant="outline">Create Answer</Button>
        ) : (
          <Button variant="outline">Edit Answer</Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-[800px] h-[600px] overflow-hidden">
        <DialogTitle>Title</DialogTitle>
        <VisuallyHidden>
          <DialogDescription></DialogDescription>
        </VisuallyHidden>
        <ReactQuill
          className="w-full h-[300px]"
          theme="snow"
          value={editorContent || ''}
          onChange={handleEditorChange}
          modules={modules}
        />
        <DialogFooter className="pt-4">
          <Button onClick={() => onClickSave()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
