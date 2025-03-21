'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MindMap } from '@prisma/client'
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import TooltipWrapper from '@/components/TooltipWrapper'

import DuplicateWorkflowDialog from '@/app/(main)/mindmaps/_components/DuplicateMindMapDialog'

import { cn } from '@/lib/utils'
import { MindMapStatus } from '@/types/mindmap'
import DeleteWorkflowDialog from '@/app/(main)/mindmaps/_components/DeleteMindMapDialog'

const statusColors = {
  [MindMapStatus.DRAFT]:
    'bg-yellow-400 text-yellow-600 dark:bg-yellow-600 dark:text-yellow-800',
  [MindMapStatus.PUBLISHED]: 'bg-primary dark:bg-primary-dark',
}

export default function WorkflowCard({ mindmap }: { mindmap: MindMap }) {
  const isDraft = mindmap.status === MindMapStatus.DRAFT

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30 group/card bg-white dark:bg-gray-800">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center just space-x-3">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              statusColors[mindmap.status as MindMapStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="h-5 w-5 text-black dark:text-white" />
            ) : (
              <Link href={`/mindgame/${mindmap.id}`}>
                <PlayIcon className="h-5 w-5 text-white dark:text-black" />
              </Link>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <TooltipWrapper content={mindmap.description}>
                <Link
                  href={`/mindmap/editor/${mindmap.id}`}
                  className="flex items-center hover:underline text-black dark:text-white"
                >
                  {mindmap.name}
                </Link>
              </TooltipWrapper>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                  Draft
                </span>
              )}
              <DuplicateWorkflowDialog mindMapId={mindmap.id} />
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isDraft ? (
            ''
          ) : (
            <Link
              href={`/mindgame/${mindmap.id}`}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
              )}
            >
              <PlayIcon size={16} />
              Play
            </Link>
          )}
          <Link
            href={`/mindmap/editor/${mindmap.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <MindMapActions mindMapId={mindmap.id} mindMapName={mindmap.name} />
        </div>
      </CardContent>
    </Card>
  )
}

function MindMapActions({
  mindMapId,
  mindMapName,
}: {
  mindMapName: string
  mindMapId: string
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        mindMapName={mindMapName}
        mindMapId={mindMapId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <TooltipWrapper content="More actions">
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev)
            }}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
