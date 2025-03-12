"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { ArrowRight, Download, Share2, Bookmark } from "lucide-react";
import ClientOnly from "@/components/client-only";

interface InsightDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  insight: any;
  isSaved: boolean;
  onToggleSave?: () => void;
  relatedActions: any[];
  onCompleteAction: (actionId: number) => void;
  completedActions: number[];
}

export default function InsightDetailDialog({
  open,
  onOpenChange,
  insight,
  isSaved,
  onToggleSave,
  relatedActions,
  onCompleteAction,
  completedActions,
}: InsightDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!insight) return null;

  // Sample data for charts
  const trendData = [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 1350 },
    { month: "Mar", value: 1400 },
    { month: "Apr", value: 1200 },
    { month: "May", value: 1500 },
    { month: "Jun", value: 1300 },
    { month: "Jul", value: 1450 },
    { month: "Aug", value: 1600 },
    { month: "Sep", value: 1750 },
    { month: "Oct", value: 1500 },
    { month: "Nov", value: 1400 },
    { month: "Dec", value: 1870 },
  ];

  const comparisonData = [
    { category: "Food", actual: 450, budget: 400 },
    { category: "Transport", actual: 200, budget: 250 },
    { category: "Entertainment", actual: 300, budget: 200 },
    { category: "Shopping", actual: 180, budget: 150 },
    { category: "Utilities", actual: 120, budget: 120 },
  ];

  // Recommendations based on insight
  const recommendations = [
    {
      id: 1,
      title: "Reduce dining out expenses",
      description:
        "Try cooking at home more often to reduce food expenses by 15-20%.",
      impact: "Medium",
      effort: "Low",
    },
    {
      id: 2,
      title: "Consolidate subscriptions",
      description:
        "Review and cancel unused streaming or subscription services.",
      impact: "Low",
      effort: "Low",
    },
    {
      id: 3,
      title: "Optimize transportation costs",
      description:
        "Consider carpooling or public transit to reduce fuel expenses.",
      impact: "Medium",
      effort: "Medium",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{insight.title}</DialogTitle>
          <DialogDescription>{insight.description}</DialogDescription>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full">
              {insight.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {insight.date}
            </span>
          </div>
        </DialogHeader>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Key Findings</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  Your spending in Entertainment is 50% higher than your budget
                </li>
                <li>
                  Food expenses have increased by 12% compared to last month
                </li>
                <li>
                  You've maintained utilities within budget for 3 consecutive
                  months
                </li>
                <li>Transportation costs are 20% below budget this month</li>
              </ul>
            </div>

            <ClientOnly>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    actual: {
                      label: "Actual",
                      color: "hsl(var(--chart-1))",
                    },
                    budget: {
                      label: "Budget",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={comparisonData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="actual"
                        fill="var(--color-actual)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="budget"
                        fill="var(--color-budget)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </ClientOnly>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Trend Analysis</h3>
              <p className="text-sm">
                Your spending has been increasing gradually over the past 6
                months, with notable spikes in August and December. The overall
                trend suggests a 15% annual increase if current patterns
                continue.
              </p>
            </div>

            <ClientOnly>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Spending",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-value)"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </ClientOnly>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{rec.title}</h3>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full">
                        Impact: {rec.impact}
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-full">
                        Effort: {rec.effort}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {rec.description}
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Apply This Recommendation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex gap-2">
            {onToggleSave && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onToggleSave}
              >
                <Bookmark
                  className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                />
                {isSaved ? "Unsave" : "Save"}
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
