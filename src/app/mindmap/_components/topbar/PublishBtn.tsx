'use client'

import { UploadIcon } from 'lucide-react'
import { useReactFlow } from '@xyflow/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { publishMindMap } from '@/actions/mindmaps/PublishMindMap'

export default function PublishBtn({ mindmapId }: { mindmapId: string }) {
  const { toObject } = useReactFlow()

  const mutation = useMutation({
    mutationFn: publishMindMap,
    onSuccess: () => {
      toast.success('Mindmap published', { id: mindmapId })
    },
    onError: (error) => {
      toast.error(error.message, { id: mindmapId })
    },
  })

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading('Publishing Mindmap...', { id: mindmapId })
        mutation.mutate({
          id: mindmapId,
          mindMapDefinition: JSON.stringify(toObject()),
        })
      }}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  )
}
