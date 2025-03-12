"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Trophy } from "lucide-react"
import { useTheme } from "next-themes"

interface Milestone {
  amount: number
  title: string
  achieved: boolean
  reward: string
}

interface HighwayProgressProps {
  current: number
  target: number
  milestones: Milestone[]
}

export default function HighwayProgress({ current, target, milestones }: HighwayProgressProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false })
  const controls = useAnimation()
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationPosition, setCelebrationPosition] = useState(0)

  // Calculate progress percentage
  const progress = Math.min(Math.round((current / target) * 100), 100)

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: `${progress}%`,
        transition: { type: "spring", stiffness: 50, damping: 20 },
      })
    }
  }, [isInView, progress, controls])

  // Check if we just reached a milestone for celebration
  useEffect(() => {
    const justReachedMilestone = milestones.find(
      (milestone) => milestone.amount <= current && milestone.amount > current - 100,
    )

    if (justReachedMilestone) {
      const milestonePosition = (justReachedMilestone.amount / target) * 100
      setCelebrationPosition(milestonePosition)
      setShowCelebration(true)

      const timer = setTimeout(() => {
        setShowCelebration(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [current, milestones, target])

  return (
    <div ref={containerRef} className="relative h-[200px] w-full overflow-hidden">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-100 dark:from-blue-900 dark:to-slate-800" />

      {/* Sun or moon */}
      <div className={`absolute top-6 right-6 ${isDark ? "bg-gray-200" : "bg-yellow-300"} rounded-full h-10 w-10`}>
        {isDark && <div className="absolute top-1 right-2 bg-gray-500 rounded-full h-2 w-2" />}
      </div>

      {/* Clouds */}
      {!isDark &&
        Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${10 + i * 15}px`,
              left: `${50 + i * 120}px`,
              width: `${60 + i * 20}px`,
              height: "20px",
              opacity: 0.8,
            }}
          />
        ))}

      {/* Stars for dark mode */}
      {isDark &&
        Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              opacity: 0.8,
            }}
          />
        ))}

      {/* Highway */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gray-700 dark:bg-gray-800" />

      {/* Road markings */}
      <div className="absolute bottom-[30px] left-0 right-0 h-[2px] flex">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-full bg-yellow-400 dark:bg-yellow-500"
            style={{ width: "20px", marginRight: "20px" }}
          />
        ))}
      </div>

      {/* Milestone markers */}
      {milestones.map((milestone, index) => {
        const position = (milestone.amount / target) * 100
        return (
          <div key={index} className="absolute bottom-[60px]" style={{ left: `${position}%` }}>
            {/* Milestone flag */}
            <div className="relative">
              <div className="absolute bottom-0 w-[2px] h-[30px] bg-red-500" />
              <div className="absolute bottom-[15px] left-0 w-[20px] h-[15px] bg-red-500" />

              {/* Milestone tooltip */}
              <div className="absolute bottom-[40px] left-[-40px] w-[80px] text-center">
                <div className="bg-white dark:bg-slate-700 text-xs p-1 rounded shadow-md">
                  <div className="font-medium">{milestone.title}</div>
                  <div className="text-muted-foreground">${milestone.amount}</div>
                </div>
                {milestone.achieved && (
                  <div className="mt-1 flex justify-center">
                    <Trophy className="h-4 w-4 text-amber-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {/* Car */}
      <motion.div className="absolute bottom-[35px]" style={{ left: "-50px" }} animate={controls}>
        <div className="relative">
          {/* Car body */}
          <div className="w-[60px] h-[20px] bg-red-500 dark:bg-red-600 rounded-t-lg" />
          <div className="w-[80px] h-[15px] bg-red-600 dark:bg-red-700 rounded-md" />

          {/* Windows */}
          <div className="absolute top-[5px] left-[15px] w-[30px] h-[10px] bg-blue-300 dark:bg-blue-400 rounded-sm" />

          {/* Wheels */}
          <div className="absolute bottom-[-8px] left-[10px] w-[15px] h-[15px] bg-gray-800 rounded-full border-2 border-gray-300" />
          <div className="absolute bottom-[-8px] right-[10px] w-[15px] h-[15px] bg-gray-800 rounded-full border-2 border-gray-300" />
        </div>
      </motion.div>

      {/* Progress text */}
      <div className="absolute top-4 left-4 bg-white/80 dark:bg-slate-800/80 p-2 rounded-md shadow-md">
        <div className="text-sm font-medium">Progress: {progress}%</div>
        <div className="text-xs text-muted-foreground">
          ${current} of ${target}
        </div>
      </div>

      {/* Celebration animation */}
      {showCelebration && (
        <div className="absolute bottom-[80px]" style={{ left: `${celebrationPosition}%` }}>
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -50, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center"
          >
            <div className="text-center bg-white dark:bg-slate-700 p-2 rounded-lg shadow-lg">
              <div className="font-bold text-green-500">Milestone reached!</div>
              <div className="text-xs">+25 points</div>
            </div>

            {/* Confetti */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * -100,
                  opacity: 0,
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  ease: "easeOut",
                }}
                style={{
                  width: 5 + Math.random() * 5,
                  height: 5 + Math.random() * 5,
                  backgroundColor: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}

