"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

interface RewardProps {
  id: number
  title: string
  description: string
  points: number
  progress: number
  total: number
  icon: ReactNode
  completed?: boolean
}

interface RewardCardProps {
  reward: RewardProps
}

export default function RewardCard({ reward }: RewardCardProps) {
  const percentage = Math.round((reward.progress / reward.total) * 100)
  const isComplete = reward.completed || percentage === 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`p-4 border rounded-lg ${
        isComplete ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-2 rounded-full ${
            isComplete
              ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          }`}
        >
          {reward.icon}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <h3 className="font-medium">{reward.title}</h3>
            <div className="text-sm font-medium">
              {isComplete ? (
                <span className="text-green-600 dark:text-green-400">Completed!</span>
              ) : (
                <span>
                  {reward.progress} / {reward.total}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{reward.description}</p>

          <div className="space-y-1">
            <Progress value={percentage} className={isComplete ? "bg-green-500" : ""} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>Progress</div>
              <div>{percentage}%</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-sm">
              <Gift className="h-4 w-4 text-purple-500" />
              <span>{reward.points} points</span>
            </div>

            {isComplete ? (
              <Button size="sm" variant="outline" className="text-green-600 border-green-200">
                Claim Reward
              </Button>
            ) : (
              <Button size="sm" variant="outline">
                View Details
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

