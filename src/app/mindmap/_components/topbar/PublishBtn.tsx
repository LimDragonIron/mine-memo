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
      toast.success('Workflow published', { id: mindmapId })
    },
    onError: () => {
      toast.error('Something went wrong!', { id: mindmapId })
    },
  })

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading('Publishing workflow...', { id: mindmapId })
        mutation.mutate({
          id: mindmapId,
          flowDefinition: JSON.stringify(toObject()),
        })
      }}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  )
}
