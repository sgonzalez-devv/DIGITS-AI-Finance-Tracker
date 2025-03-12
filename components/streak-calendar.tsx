"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"

export default function StreakCalendar() {
  // Sample streak data for the last 30 days
  // 0 = no activity, 1 = activity but streak broken, 2 = streak maintained
  const streakData = [
    0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0,
  ].reverse()

  // Group data into weeks
  const weeks = []
  for (let i = 0; i < streakData.length; i += 7) {
    weeks.push(streakData.slice(i, i + 7))
  }

  // Get day names
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"]

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((day, i) => (
          <div key={i} className="text-xs text-center text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-1">
          {week.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
              className={`
                h-8 rounded-md flex items-center justify-center
                ${day === 0 ? "bg-slate-100 dark:bg-slate-800" : ""}
                ${day === 1 ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" : ""}
                ${day === 2 ? "bg-gradient-to-br from-orange-500 to-red-500 text-white" : ""}
              `}
            >
              {day === 2 && <Flame className="h-4 w-4" />}
              {day === 1 && <div className="h-2 w-2 rounded-full bg-amber-500" />}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}

