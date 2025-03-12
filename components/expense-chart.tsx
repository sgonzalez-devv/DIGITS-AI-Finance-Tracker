"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const monthlyData = [
  { name: "Jan", expenses: 1200, income: 4500 },
  { name: "Feb", expenses: 1350, income: 4500 },
  { name: "Mar", expenses: 1400, income: 4700 },
  { name: "Apr", expenses: 1200, income: 5000 },
  { name: "May", expenses: 1500, income: 5200 },
  { name: "Jun", expenses: 1300, income: 5500 },
  { name: "Jul", expenses: 1450, income: 5700 },
  { name: "Aug", expenses: 1600, income: 5900 },
  { name: "Sep", expenses: 1750, income: 6000 },
  { name: "Oct", expenses: 1500, income: 6200 },
  { name: "Nov", expenses: 1400, income: 6300 },
  { name: "Dec", expenses: 1870, income: 6420 },
]

const categoryData = [
  { name: "Housing", value: 800 },
  { name: "Food", value: 350 },
  { name: "Transport", value: 250 },
  { name: "Entertainment", value: 200 },
  { name: "Shopping", value: 150 },
  { name: "Health", value: 120 },
]

export default function ExpenseChart() {
  return (
    <Tabs defaultValue="overview">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="space-y-4">
        <ChartContainer
          config={{
            expenses: {
              label: "Expenses",
              color: "hsl(var(--chart-1))",
            },
            income: {
              label: "Income",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2} />
              <Line type="monotone" dataKey="income" stroke="var(--color-income)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>

      <TabsContent value="categories">
        <ChartContainer
          config={{
            value: {
              label: "Amount",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>
    </Tabs>
  )
}

