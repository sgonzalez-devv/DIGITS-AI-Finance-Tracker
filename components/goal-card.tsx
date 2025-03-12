"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Trophy } from "lucide-react"

interface GoalCardProps {
  title: string
  current: number
  target: number
  color: "blue" | "purple" | "amber" | "green"
}

export default function GoalCard({ title, current, target, color }: GoalCardProps) {
  const percentage = Math.min(Math.round((current / target) * 100), 100)
  const isComplete = percentage === 100

  const colorClasses = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
    green: "bg-green-500",
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{percentage}%</div>
      </div>
      <div className="relative">
        <Progress value={percentage} className={`h-2 ${isComplete ? colorClasses[color] : ""}`} />
        {isComplete && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -right-1 -top-1"
          >
            <Trophy className="h-4 w-4 text-amber-500" />
          </motion.div>
        )}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <div>${current.toLocaleString()}</div>
        <div>${target.toLocaleString()}</div>
      </div>
    </div>
  )
}

