'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MindMap } from '@prisma/client'
import {
  ChevronRightIcon,
  ClockIcon,
  CoinsIcon,
  CornerDownRightIcon,
  FileTextIcon,
  MoreVerticalIcon,
  MoveRightIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

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
import { Badge } from '@/components/ui/badge'
import TooltipWrapper from '@/components/TooltipWrapper'
import DeleteMindMapDialog from '@/app/(main)/mindmaps/_components/DeleteMindMapDialog'

import DuplicateWorkflowDialog from '@/app/(main)/mindmaps/_components/DuplicateMindMapDialog'

import { cn } from '@/lib/utils'
import { MindMapStatus } from '@/types/mindmap'

const statusColors = {
  [MindMapStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [MindMapStatus.PUBLISHED]: 'bg-primary',
}

export default function WorkflowCard({ mindmap }: { mindmap: MindMap }) {
  const isDraft = mindmap.status === MindMapStatus.DRAFT

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30 group/card">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center just space-x-3">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              statusColors[mindmap.status as MindMapStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <TooltipWrapper content={mindmap.description}>
                <Link
                  href={`/mindmap/editor/${mindmap.id}`}
                  className="flex items-center hover:underline"
                >
                  {mindmap.name}
                </Link>
              </TooltipWrapper>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
              <DuplicateWorkflowDialog mindMapId={mindmap.id} />
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/mindmap/editor/${mindmap.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'flex items-center gap-2'
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
