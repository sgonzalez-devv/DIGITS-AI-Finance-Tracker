"use client"

import { XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data with predictions
const forecastData = [
  { month: "Jan", actual: 1870, predicted: null },
  { month: "Feb", actual: 1950, predicted: null },
  { month: "Mar", actual: 1750, predicted: null },
  { month: "Apr", actual: 1870, predicted: null },
  { month: "May", actual: 1650, predicted: null },
  { month: "Jun", actual: 1720, predicted: null },
  { month: "Jul", actual: null, predicted: 1680 },
  { month: "Aug", actual: null, predicted: 1620 },
  { month: "Sep", actual: null, predicted: 1590 },
  { month: "Oct", actual: null, predicted: 1550 },
  { month: "Nov", actual: null, predicted: 1520 },
  { month: "Dec", actual: null, predicted: 1500 },
]

export default function SpendingPredictionChart() {
  return (
    <ChartContainer
      config={{
        actual: {
          label: "Actual Spending",
          color: "hsl(var(--chart-1))",
        },
        predicted: {
          label: "Predicted Spending",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-actual)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-actual)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-predicted)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-predicted)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="actual"
            stroke="var(--color-actual)"
            fillOpacity={1}
            fill="url(#colorActual)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="predicted"
            stroke="var(--color-predicted)"
            fillOpacity={1}
            fill="url(#colorPredicted)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

