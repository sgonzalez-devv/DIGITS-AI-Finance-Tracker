"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ArrowRight, TrendingUp, Calendar } from "lucide-react";
import ClientOnly from "@/components/client-only";

export default function FinancialGoalInsights() {
  // Sample goal data
  const goal = {
    id: 1,
    name: "Emergency Fund",
    target: 10000,
    current: 6500,
    projectedDate: "Dec 2023",
    originalDate: "Mar 2024",
    trend: "ahead",
    projectionData: [
      { month: "Jun", actual: 5000, projected: 5000 },
      { month: "Jul", actual: 5500, projected: 5400 },
      { month: "Aug", actual: 6000, projected: 5800 },
      { month: "Sep", actual: 6500, projected: 6200 },
      { month: "Oct", projected: 7200 },
      { month: "Nov", projected: 8500 },
      { month: "Dec", projected: 10000 },
    ],
  };

  // Calculate progress percentage
  const progressPercentage = Math.round((goal.current / goal.target) * 100);

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Goal Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{goal.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium">
                ${goal.current.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                of ${goal.target.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {goal.trend === "ahead" ? (
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Ahead of schedule
              </span>
            ) : (
              <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-full flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Slightly behind
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">
                Original Target Date
              </div>
              <div className="font-medium">{goal.originalDate}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">
                Projected Completion
              </div>
              <div
                className={`font-medium ${
                  goal.trend === "ahead"
                    ? "text-green-600 dark:text-green-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {goal.projectedDate}
              </div>
            </div>
          </div>
        </div>

        <ClientOnly>
          <div className="h-[200px]">
            <ChartContainer
              config={{
                actual: {
                  label: "Actual",
                  color: "hsl(var(--chart-1))",
                },
                projected: {
                  label: "Projected",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={goal.projectionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--color-actual)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="var(--color-projected)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </ClientOnly>

        <div className="space-y-2">
          <h4 className="font-medium">Recommendations</h4>
          <ul className="text-sm space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>
                Increase monthly contributions by $50 to reach your goal 1 month
                earlier
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>
                Consider automating transfers to maintain consistent progress
              </span>
            </li>
          </ul>
        </div>

        <Button className="w-full">
          View All Goals
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
