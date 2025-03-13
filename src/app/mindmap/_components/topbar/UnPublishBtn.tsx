'use client'

import { DownloadIcon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { unpublishMindMap } from '@/actions/mindmaps/UnPublishMindMap'

export default function UnpublishBtn({ mindmapId }: { mindmapId: string }) {
  const mutation = useMutation({
    mutationFn: unpublishMindMap,
    onSuccess: () => {
      toast.success('Workflow unpublished', { id: mindmapId })
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
        toast.loading('Unpublishing workflow...', { id: mindmapId })
        mutation.mutate(mindmapId)
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-500" />
      Unpublish
    </Button>
  )
}
