'use client'

import { MindMap } from '@prisma/client'
import GameCardList from './GameCard'
import Topbar from './topbar/Topbar'
import { useExtractQuestionAnswer } from '@/hooks/useExtractQuestionAnswer'

export default function Game({ mindMap }: { mindMap: MindMap }) {
  const resultObj = JSON.stringify(mindMap)
  const cards = useExtractQuestionAnswer(mindMap.definition)
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <Topbar
        title="MindMap Editor"
        subtitle={mindMap.name}
        mindmapId={mindMap.id}
      />
      <section className="flex justify-center items-center h-full overflow-auto">
        <GameCardList cards={cards} />
      </section>
    </div>
  )
}
