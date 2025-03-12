"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp, Calendar, DollarSign } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import ClientOnly from "@/components/client-only"

export default function InsightTrends() {
  const [projectionType, setProjectionType] = useState("savings")

  // Sample data for savings projection
  const savingsData = [
    { month: "Apr", current: 5000, optimized: 5000 },
    { month: "May", current: 5300, optimized: 5450 },
    { month: "Jun", current: 5600, optimized: 5900 },
    { month: "Jul", current: 5900, optimized: 6400 },
    { month: "Aug", current: 6200, optimized: 6900 },
    { month: "Sep", current: 6500, optimized: 7400 },
    { month: "Oct", current: 6800, optimized: 7950 },
    { month: "Nov", current: 7100, optimized: 8500 },
    { month: "Dec", current: 7400, optimized: 9100 },
  ]

  // Sample data for expenses projection
  const expensesData = [
    { month: "Apr", current: 2050, optimized: 2050 },
    { month: "May", current: 2100, optimized: 1900 },
    { month: "Jun", current: 2150, optimized: 1800 },
    { month: "Jul", current: 2200, optimized: 1750 },
    { month: "Aug", current: 2250, optimized: 1700 },
    { month: "Sep", current: 2300, optimized: 1650 },
    { month: "Oct", current: 2350, optimized: 1600 },
    { month: "Nov", current: 2400, optimized: 1550 },
    { month: "Dec", current: 2450, optimized: 1500 },
  ]

  // Sample data for net worth projection
  const netWorthData = [
    { month: "Apr", current: 25000, optimized: 25000 },
    { month: "May", current: 25800, optimized: 26200 },
    { month: "Jun", current: 26600, optimized: 27500 },
    { month: "Jul", current: 27400, optimized: 28800 },
    { month: "Aug", current: 28200, optimized: 30200 },
    { month: "Sep", current: 29000, optimized: 31600 },
    { month: "Oct", current: 29800, optimized: 33100 },
    { month: "Nov", current: 30600, optimized: 34600 },
    { month: "Dec", current: 31400, optimized: 36200 },
  ]

  // Get data based on projection type
  const getDataByType = () => {
    switch (projectionType) {
      case "savings":
        return savingsData
      case "expenses":
        return expensesData
      case "networth":
        return netWorthData
      default:
        return savingsData
    }
  }

  // Get insights based on projection type
  const getInsightByType = () => {
    switch (projectionType) {
      case "savings":
        return {
          icon: <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />,
          title: "Savings Growth Insight",
          description:
            "By implementing our recommended actions, you could increase your savings by $1,700 by year end - that's a 23% boost!",
          color: "green",
        }
      case "expenses":
        return {
          icon: <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
          title: "Expense Reduction Insight",
          description:
            "Our optimization suggestions could reduce your monthly expenses by $950 by December - a 39% reduction in spending!",
          color: "blue",
        }
      case "networth":
        return {
          icon: <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
          title: "Net Worth Projection",
          description:
            "Following our financial plan could grow your net worth to $36,200 by year-end, compared to $31,400 on your current path.",
          color: "purple",
        }
      default:
        return {
          icon: <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />,
          title: "Financial Projection",
          description: "Our AI projections show significant potential for financial optimization.",
          color: "green",
        }
    }
  }

  const insight = getInsightByType()
  const data = getDataByType()

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2 flex flex-row justify-between items-center flex-wrap gap-2">
        <CardTitle>Insight Trends</CardTitle>
        <Tabs value={projectionType} onValueChange={setProjectionType} className="w-auto">
          <TabsList>
            <TabsTrigger value="savings">Spending</TabsTrigger>
            <TabsTrigger value="expenses">Income</TabsTrigger>
            <TabsTrigger value="networth">Savings</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <ClientOnly>
            <ChartContainer
              config={{
                current: {
                  label: "Current Path",
                  color: "hsl(var(--chart-1))",
                },
                optimized: {
                  label: "Optimized Path",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="var(--color-current)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="optimized"
                    stroke="var(--color-optimized)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ClientOnly>

          <div
            className={`p-4 bg-${insight.color}-50 dark:bg-${insight.color}-900/20 border border-${insight.color}-200 dark:border-${insight.color}-800 rounded-lg`}
            style={{
              backgroundColor: `var(--${insight.color}-50, ${insight.color === "green" ? "#f0fdf4" : insight.color === "blue" ? "#eff6ff" : "#faf5ff"})`,
              borderColor: `var(--${insight.color}-200, ${insight.color === "green" ? "#bbf7d0" : insight.color === "blue" ? "#bfdbfe" : "#e9d5ff"})`,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-full bg-${insight.color}-100 dark:bg-${insight.color}-800`}
                style={{
                  backgroundColor: `var(--${insight.color}-100, ${insight.color === "green" ? "#dcfce7" : insight.color === "blue" ? "#dbeafe" : "#f3e8ff"})`,
                }}
              >
                {insight.icon}
              </div>
              <div>
                <h4 className="font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          </div>

          <Button className="w-full">See Your Personalized Plan</Button>
        </div>
      </CardContent>
    </Card>
  )
}

