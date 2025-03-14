import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Card {
  title: string
  description: string
}

interface CardListProps {
  cards: Card[]
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
    <div className="relative w-full h-2/3 flex items-center justify-center">
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
          dragElastic={1}
          onDragEnd={(event, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x
            if (swipe < -1000) {
              paginate(1)
            } else if (swipe > 1000) {
              paginate(-1)
            }
          }}
          className="absolute w-5/6 max-w-lg"
        >
          <div className="bg-white p-5 rounded-lg shadow-md h-full flex flex-col items-center justify-center relative">
            <h2 className="text-xl font-bold mb-2">{cards[page].title}</h2>
            {showDescription ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-700"
              >
                {cards[page].description}
              </motion.p>
            ) : (
              <div className="h-4"></div>
            )}
            <div className="absolute top-5 right-5 bg-gray-200 text-gray-800 rounded-full p-2 w-10 h-10 flex items-center justify-center">
              {timer}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between mt-6 absolute bottom-4 w-full px-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={() => paginate(-1)}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={() => paginate(1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CardList
