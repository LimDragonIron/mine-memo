import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getMindmemosForUser } from '@/serverAction/mindmemos/get-mindmemos-for-user';
import { InboxIcon } from 'lucide-react';

export default async function MindMapsPage() {
  
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">MindMemos</h1>
          <p className="text-muted-foreground">Manage your Mind Memos</p>
        </div>
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserMindMaps />
        </Suspense>
      </div>
    </div>
  );
}

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

async function UserMindMaps() {
  const mindmaps = await getMindmemosForUser();
  
  if (mindmaps.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No MindMap created yet</p>
          <p className="text-sm text-muted-foreground">Click the button below to create your first MindMap</p>
        </div>
        
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {mindmaps.map((mindmap) => (
        <div key={mindmap.id}>
          <h2>{mindmap.title}</h2>
        </div>
      ))}
    </div>
  );
}