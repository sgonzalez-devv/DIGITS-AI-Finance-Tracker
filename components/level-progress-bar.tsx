"use client"

import { motion } from "framer-motion"

interface LevelProgressBarProps {
  level: number
}

export default function LevelProgressBar({ level }: LevelProgressBarProps) {
  // Define level thresholds and titles
  const levels = [
    { level: 1, title: "Beginner", threshold: 0 },
    { level: 2, title: "Novice", threshold: 100 },
    { level: 3, title: "Apprentice", threshold: 250 },
    { level: 4, title: "Budget Apprentice", threshold: 500 },
    { level: 5, title: "Budget Master", threshold: 1000 },
    { level: 6, title: "Finance Adept", threshold: 2000 },
    { level: 7, title: "Finance Expert", threshold: 3500 },
    { level: 8, title: "Finance Guru", threshold: 5000 },
    { level: 9, title: "Finance Wizard", threshold: 7500 },
    { level: 10, title: "Finance Legend", threshold: 10000 },
  ]

  return (
    <div className="space-y-4">
      <div className="relative h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        {levels.map((levelData, index) => {
          // Skip the first level as it's the starting point
          if (index === 0) return null

          // Calculate position as percentage
          const position = (index / (levels.length - 1)) * 100

          return (
            <div
              key={index}
              className={`absolute top-0 bottom-0 w-1 ${
                levelData.level <= level ? "bg-purple-500" : "bg-slate-300 dark:bg-slate-600"
              }`}
              style={{ left: `${position}%` }}
            />
          )
        })}

        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-600 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${(level / (levels.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Current level indicator */}
        <motion.div
          className="absolute top-0 bottom-0 w-3 h-3 rounded-full bg-white border-2 border-purple-600"
          initial={{ left: 0 }}
          animate={{ left: `${(level / (levels.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transform: "translate(-50%, 0)" }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        {levels
          .filter((_, index) => index % 3 === 0 || index === levels.length - 1)
          .map((levelData) => (
            <div key={levelData.level} className="text-center">
              <div className={levelData.level <= level ? "text-primary font-medium" : ""}>{levelData.level}</div>
            </div>
          ))}
      </div>
    </div>
  )
}

