"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface AdvancedInsightCardProps {
  icon: ReactNode
  title: string
  description: string
  actionText: string
  color: "blue" | "green" | "purple" | "amber" | "red"
}

export default function AdvancedInsightCard({ icon, title, description, actionText, color }: AdvancedInsightCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
    amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={`border ${colorClasses[color]}`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">{icon}</div>
            <div className="space-y-2">
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
              <Button variant="link" className="p-0 h-auto" size="sm">
                {actionText}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

