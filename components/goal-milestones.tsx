"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"

interface Milestone {
  amount: number
  title: string
  achieved: boolean
  reward: string
}

interface GoalMilestonesProps {
  milestones: Milestone[]
  current: number
}

export default function GoalMilestones({ milestones, current }: GoalMilestonesProps) {
  // Sort milestones by amount
  const sortedMilestones = [...milestones].sort((a, b) => a.amount - b.amount)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Milestones</h3>
      <div className="space-y-2">
        {sortedMilestones.map((milestone, index) => {
          const isAchieved = current >= milestone.amount

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 border rounded-lg flex items-center gap-4 ${
                isAchieved
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              }`}
            >
              <div>
                {isAchieved ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{milestone.title}</h4>
                  <span className="text-sm font-medium">${milestone.amount.toLocaleString()}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Reward: {milestone.reward}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

