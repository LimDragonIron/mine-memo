'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'

import { deleteMindMap } from '@/actions/mindmaps/DeleteMindMap'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  mindMapName: string
  mindMapId: string
}

export default function DeleteWorkflowDialog({
  open,
  setOpen,
  mindMapName,
  mindMapId,
}: Props) {
  const [confirmText, setConfirmText] = useState('')

  const deleteMutation = useMutation({
    mutationFn: deleteMindMap,
    onSuccess: () => {
      toast.success('MindMap deleted successfully', { id: mindMapId })
      setConfirmText('')
    },
    onError: () => {
      toast.error('Something went wrong!', { id: mindMapId })
    },
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, you will not be able to recover it.
          </AlertDialogDescription>
          <div className="flex flex-col py-4 gap-2">
            <p>
              If you are sure, enter <b>{mindMapName}</b> to confirm:
            </p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText('')}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== mindMapName || deleteMutation.isPending}
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={() => {
              toast.loading('Deleting mindmap...', { id: mindMapId })
              deleteMutation.mutate(mindMapId)
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
