"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface InsightCardProps {
  insight: {
    id: number
    title: string
    description: string
    category: string
    impact: string
    date: string
    icon: React.ReactNode
    color: string
  }
  isSaved: boolean
  onToggleSave: () => void
  onClick: () => void
}

export default function InsightCard({ insight, isSaved, onToggleSave, onClick }: InsightCardProps) {
  // Get impact badge color
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">High Impact</Badge>
      case "medium":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Medium Impact</Badge>
      case "low":
        return <Badge className="bg-slate-500 hover:bg-slate-600 text-white">Low Impact</Badge>
      case "positive":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Positive</Badge>
      case "warning":
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Warning</Badge>
      default:
        return <Badge>Info</Badge>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className={`p-1 bg-${insight.color}-500`}></div>
          <div className="p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div
                className={`p-2 rounded-full bg-${insight.color}-100 dark:bg-${insight.color}-900/30 text-${insight.color}-600 dark:text-${insight.color}-400`}
              >
                {insight.icon}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "text-muted-foreground hover:text-foreground",
                  isSaved && "text-amber-500 hover:text-amber-600",
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleSave()
                }}
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>

            <div>
              <h3 className="font-bold text-lg">{insight.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{insight.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              {getImpactBadge(insight.impact)}

              <Button variant="ghost" size="sm" className="text-primary hover:text-primary" onClick={onClick}>
                Details
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

