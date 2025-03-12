"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AchievementBadgeProps {
  title: string
  description: string
  icon: ReactNode
  earned: boolean
}

export default function AchievementBadge({ title, description, icon, earned }: AchievementBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer ${
              earned ? "bg-gradient-to-br from-purple-500 to-blue-500" : "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <div className={`rounded-full p-3 ${earned ? "bg-white/20" : "bg-slate-300 dark:bg-slate-600"}`}>
              <div className={earned ? "text-white" : "text-slate-500 dark:text-slate-400"}>{icon}</div>
            </div>
            <div
              className={`mt-2 text-xs font-medium text-center ${
                earned ? "text-white" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {title}
            </div>
            {!earned && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <div className="p-1 bg-slate-800 rounded-md text-white text-xs">Locked</div>
              </div>
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            {!earned && <p className="text-xs mt-1 font-medium">Complete this achievement to unlock</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

