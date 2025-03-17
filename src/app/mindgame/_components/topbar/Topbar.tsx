'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import TooltipWrapper from '@/components/TooltipWrapper'

interface Props {
  title: string
  subtitle?: string
  mindmapId: string
  hideButtons?: boolean
  isPublished?: boolean
}

export default function Topbar({ title, subtitle, mindmapId }: Props) {
  const router = useRouter()

  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
