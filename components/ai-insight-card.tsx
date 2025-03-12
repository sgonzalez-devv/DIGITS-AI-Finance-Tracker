"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, RefreshCw } from "lucide-react"

// Sample insights
const insights = [
  "Based on your spending patterns, you could save $120 monthly by reducing restaurant expenses.",
  "You've been consistent with your savings goal! You're on track to reach your emergency fund target by August.",
  "Your transportation costs increased by 15% this month. Consider carpooling or public transit to reduce expenses.",
  "Great job reducing your entertainment expenses! You've spent 20% less than last month.",
]

export default function AiInsightCard() {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const getNewInsight = async () => {
    setIsLoading(true)

    // Simulate API call for new insight
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Cycle through insights
    setCurrentInsight((currentInsight + 1) % insights.length)
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base">
          <Brain className="mr-2 h-5 w-5 text-purple-500" />
          AI Financial Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[100px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInsight}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-muted-foreground flex-1"
            >
              {insights[currentInsight]}
            </motion.div>
          </AnimatePresence>

          <Button variant="outline" size="sm" className="mt-4 self-end" onClick={getNewInsight} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Insight
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

