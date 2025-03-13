import Link from 'next/link'
import { Lightbulb } from 'lucide-react'

import { cn } from '@/lib/utils'

export default function Logo({
  fontSize = 'text-2xl',
  iconSize = 20,
}: {
  fontSize?: string
  iconSize?: number
}) {
  return (
    <Link
      href="/"
      className={cn(
        'text-2xl font-extrabold flex items-center gap-2',
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
        <Lightbulb size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          Mind
        </span>
        <span className="text-stone-700 dark:text-stone-300">Memo</span>
      </div>
    </Link>
  )
}
