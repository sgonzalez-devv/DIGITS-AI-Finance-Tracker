"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface TransactionInsightProps {
  icon: ReactNode
  title: string
  description: string
  color: "blue" | "green" | "purple" | "amber" | "red"
}

export default function TransactionInsight({ icon, title, description, color }: TransactionInsightProps) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
    amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={`border ${colorClasses[color]}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="mt-0.5">{icon}</div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

