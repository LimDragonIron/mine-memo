'use client'

import { MindMap } from '@prisma/client'
import GameCardList from './GameCard'

const generateRandomCards = (numCards: number) => {
  return Array.from({ length: numCards }, (_, index) => ({
    title: `Card ${index + 1}`,
    description: `This is the description for Card ${index + 1}.`,
  }))
}

export default function Game({ mindMap }: { mindMap: MindMap }) {
  const cards = generateRandomCards(10)
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <section className="flex justify-center items-center h-full overflow-auto">
        <GameCardList cards={cards} />
      </section>
    </div>
  )
}
