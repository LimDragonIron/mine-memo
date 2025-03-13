import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getMindmemosForUser } from '@/actions/mindmaps/GetMindMapForUser'
import { AlertCircle, InboxIcon } from 'lucide-react'
import CreateMindMapialog from './_components/CreateMindMapDialog'
import MindMapCard from './_components/MindMapCard'

export default async function MindMapsPage() {
  return (
    <div className="flex-1 flex flex-col h-full pl-2 pr-2">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">MindMemos</h1>
          <p className="text-muted-foreground">Manage your Mind Memos</p>
        </div>
        <CreateMindMapialog />
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserMindMaps />
        </Suspense>
      </div>
    </div>
  )
}

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  )
}

async function UserMindMaps() {
  const mindmaps = await getMindmemosForUser()

  if (!mindmaps) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong! Please try again later.
        </AlertDescription>
      </Alert>
    )
  }

  if (mindmaps.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No MindMap created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first MindMap
          </p>
        </div>
        <CreateMindMapialog triggerText="Create your first Mind Map" />
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      {mindmaps.map((mindmap) => (
        <MindMapCard key={mindmap.id} mindmap={mindmap} />
      ))}
    </div>
  )
}
