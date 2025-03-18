'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuestionAnswer } from '@/types/appnode'

interface CardListProps {
  cards: QuestionAnswer[]
}

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0])
  const [showDescription, setShowDescription] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(30)

  useEffect(() => {
    setShowDescription(false)
    setTimer(30)

    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) return prev - 1
        clearInterval(timerInterval)
        setShowDescription(true)
        return 0
      })
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [page])

  const paginate = (newDirection: number) => {
    setPage((prev) => [
      (prev[0] + newDirection + cards.length) % cards.length,
      newDirection,
    ])
  }

  return (
    <div className="flex w-full h-full items-start justify-center bg-gray-900 text-white">
      <div className="flex flex-col gap-3 h-full w-full md:w-1/2 justify-center items-center">
        <div className="flex w-full h-2/3 overflow-hidden relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(event, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x
                if (swipe < -1000) {
                  paginate(1)
                } else if (swipe > 1000) {
                  paginate(-1)
                }
              }}
              className="absolute w-full h-full p-4"
            >
              <div className="relative w-full bg-gray-800 p-5 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-2">
                  {cards[page].question}
                </h2>
                <div className="absolute top-5 right-5 bg-gray-700 text-gray-300 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                  {timer}
                </div>
                {showDescription ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-300 overflow-y-auto max-h-48 w-full justify-center flex"
                  >
                    <div
                      className="w-full ql-editor"
                      dangerouslySetInnerHTML={{ __html: cards[page].answer }}
                    />
                  </motion.div>
                ) : (
                  <div className="h-4"></div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-between w-full px-4 items-center">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
            onClick={() => paginate(-1)}
          >
            Previous
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
            onClick={() => paginate(1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardList
