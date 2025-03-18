'use client'
import React, { useEffect, useState } from 'react'
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
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ParamProps } from '@/types/appnode'

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

export default function ContextDialog({
  param,
  value,
  updateNodeParamValue,
  nearParam,
  disabled,
}: ParamProps) {
  const [editorContent, setEditorContent] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const fontSizeArr = [
    '8px',
    '9px',
    '10px',
    '12px',
    '14px',
    '16px',
    '20px',
    '24px',
    '32px',
    '42px',
    '54px',
    '68px',
    '84px',
    '98px',
  ]

  const toolbarOptions = [
    [
      { header: '1' },
      { header: '2' },
      { header: '3' },
      { header: '4' },
      { header: '5' },
      { header: '6' },
      { font: [] },
    ],
    [{ size: fontSizeArr }],
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

  useEffect(() => {
    // Quill을 동적으로 로드합니다.
    const loadQuill = async () => {
      const { Quill } = await import('react-quill-new')

      // Quill 모듈을 커스터마이징하는 예제
      const Size = Quill.import('attributors/style/size') as any
      Size.whitelist = fontSizeArr
      Quill.register(Size, true)
    }

    loadQuill()
  }, [])

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
        <DialogTitle>{nearParam}</DialogTitle>
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
