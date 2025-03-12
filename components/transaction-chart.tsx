"use client"

import { useState } from "react"
import { format, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Bar, BarChart } from "recharts"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ClientOnly from "@/components/client-only"

interface TransactionChartProps {
  transactions: any[]
}

export default function TransactionChart({ transactions }: TransactionChartProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [chartType, setChartType] = useState<"daily" | "monthly">("daily")

  // Navigate to previous/next month
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => {
    const nextDate = new Date(currentDate)
    nextDate.setMonth(nextDate.getMonth() + 1)
    if (nextDate <= new Date()) {
      setCurrentDate(nextDate)
    }
  }

  // Prepare data for daily chart
  const getDailyChartData = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

    return days.map((day) => {
      const dayTransactions = transactions.filter((t) => isSameDay(new Date(t.date), day))

      const income = dayTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

      const expenses = dayTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

      return {
        date: format(day, "MMM dd"),
        income,
        expenses,
      }
    })
  }

  // Prepare data for monthly chart
  const getMonthlyChartData = () => {
    const monthsData = []

    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(new Date(), i)
      const monthStart = startOfMonth(monthDate)
      const monthEnd = endOfMonth(monthDate)

      const monthTransactions = transactions.filter((t) => {
        const transactionDate = new Date(t.date)
        return transactionDate >= monthStart && transactionDate <= monthEnd
      })

      const income = monthTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

      const expenses = monthTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

      monthsData.push({
        date: format(monthDate, "MMM yyyy"),
        income,
        expenses,
      })
    }

    return monthsData
  }

  const dailyData = getDailyChartData()
  const monthlyData = getMonthlyChartData()

  return (
    <ClientOnly>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Tabs
            defaultValue="daily"
            value={chartType}
            onValueChange={(value) => setChartType(value as "daily" | "monthly")}
          >
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>

          {chartType === "daily" && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{format(currentDate, "MMMM yyyy")}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
                disabled={
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear()
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Tabs value={chartType}>
          <TabsContent value="daily">
            <ChartContainer
              config={{
                income: {
                  label: "Income",
                  color: "hsl(var(--chart-1))",
                },
                expenses: {
                  label: "Expenses",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} interval={Math.floor(dailyData.length / 10)} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="monthly">
            <ChartContainer
              config={{
                income: {
                  label: "Income",
                  color: "hsl(var(--chart-1))",
                },
                expenses: {
                  label: "Expenses",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-income)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="var(--color-expenses)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </div>
    </ClientOnly>
  )
}

