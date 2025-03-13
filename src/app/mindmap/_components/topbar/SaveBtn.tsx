'use client'

import { useReactFlow } from '@xyflow/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { updateMindMap } from '@/actions/mindmaps/UpdateMindMap'

export default function SaveBtn({ mindmapId }: { mindmapId: string }) {
  const { toObject } = useReactFlow()

  const saveMutation = useMutation({
    mutationFn: updateMindMap,
    onSuccess: () => {
      toast.success('Mindmap saved successfully', { id: 'save-mindmap' })
    },
    onError: () => {
      toast.error('Something went wrong!', { id: 'save-mindmap' })
    },
  })

  return (
    <Button
      disabled={saveMutation.isPending}
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const mindmapDefinition = JSON.stringify(toObject())
        toast.loading('Saving Mindmap...', { id: 'save-mindmap' })
        saveMutation.mutate({
          id: mindmapId,
          definition: mindmapDefinition,
        })
      }}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  )
}
