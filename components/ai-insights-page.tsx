"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, ArrowUp, ArrowDown, Lightbulb, PieChart } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import AdvancedInsightCard from "@/components/advanced-insight-card"
import SpendingPredictionChart from "@/components/spending-prediction-chart"

export default function AiInsightsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />

      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
            <p className="text-muted-foreground">Personalized financial analysis and recommendations</p>
          </div>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="spending">Spending</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AdvancedInsightCard
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                title="Spending Trend"
                description="Your spending has decreased by 12% compared to last month. Great job controlling your expenses!"
                actionText="View Details"
                color="green"
              />

              <AdvancedInsightCard
                icon={<PieChart className="h-5 w-5 text-blue-500" />}
                title="Budget Optimization"
                description="We've identified that you could save $85 monthly by adjusting your entertainment budget."
                actionText="See Suggestions"
                color="blue"
              />

              <AdvancedInsightCard
                icon={<Lightbulb className="h-5 w-5 text-amber-500" />}
                title="Savings Opportunity"
                description="Based on your income pattern, you could increase your emergency fund contributions by $150/month."
                actionText="Learn More"
                color="amber"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Financial Health Score</CardTitle>
                <CardDescription>An AI-generated assessment of your overall financial health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 283 * (1 - 0.78) }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">78</span>
                      <span className="text-sm text-muted-foreground">out of 100</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <ArrowUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Strengths</span>
                      </div>
                      <ul className="mt-2 text-sm space-y-1">
                        <li>• Regular savings habits</li>
                        <li>• Low debt-to-income ratio</li>
                        <li>• Consistent income</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <ArrowDown className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-medium">Improvement Areas</span>
                      </div>
                      <ul className="mt-2 text-sm space-y-1">
                        <li>• Emergency fund size</li>
                        <li>• Dining out expenses</li>
                        <li>• Subscription management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending Analysis</CardTitle>
                <CardDescription>Detailed breakdown of your spending patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Category Insights</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Dining Out</span>
                          <span className="text-sm font-medium">$320 (18% of total)</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                        <p className="text-xs text-red-500 mt-1">15% higher than recommended</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Groceries</span>
                          <span className="text-sm font-medium">$450 (24% of total)</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "24%" }}></div>
                        </div>
                        <p className="text-xs text-green-500 mt-1">Within optimal range</p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Entertainment</span>
                          <span className="text-sm font-medium">$180 (10% of total)</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                        <p className="text-xs text-amber-500 mt-1">Slightly above average</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Personalized Recommendations</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            Consider meal prepping on weekends to reduce your dining out expenses by up to 40%.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            You have 3 subscription services with overlapping content. Consolidating could save
                            $25/month.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            Your utility bills spike on weekends. Adjusting your thermostat by 2 degrees could reduce
                            costs by 15%.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Savings Optimization</CardTitle>
                <CardDescription>AI-powered strategies to maximize your savings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="font-medium mb-2">Savings Rate Analysis</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-300">15%</span>
                      </div>
                      <div>
                        <p className="text-sm">Your current savings rate is 15% of your income.</p>
                        <p className="text-sm text-blue-600 dark:text-blue-300 font-medium mt-1">
                          Recommendation: Increase to 20% to reach your goals faster.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Smart Allocation</h3>
                      <p className="text-sm mb-3">
                        Based on your goals and risk profile, here's the optimal allocation of your savings:
                      </p>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Emergency Fund</span>
                            <span className="text-xs">40%</span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Short-term Goals</span>
                            <span className="text-xs">30%</span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Long-term Goals</span>
                            <span className="text-xs">30%</span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Savings Accelerators</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-xs font-medium text-green-600 dark:text-green-300">
                            1
                          </div>
                          <p className="text-sm">Set up automatic transfers of $200 on paydays</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-xs font-medium text-green-600 dark:text-green-300">
                            2
                          </div>
                          <p className="text-sm">Use the 24-hour rule for purchases over $100</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-xs font-medium text-green-600 dark:text-green-300">
                            3
                          </div>
                          <p className="text-sm">Implement a "save the change" strategy</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Forecast</CardTitle>
                <CardDescription>AI predictions based on your current financial behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="h-[300px]">
                    <SpendingPredictionChart />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">6-Month Projection</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Savings Growth</span>
                          <span className="text-sm font-medium text-green-500">+$3,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Goal Completion</span>
                          <span className="text-sm font-medium">2 of 3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Financial Health Score</span>
                          <span className="text-sm font-medium">82/100 (+4)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">What-If Scenarios</h3>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <span>If you increase savings by 5%...</span>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <span>If you reduce dining expenses by 20%...</span>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <span>If you pay off your credit card debt...</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

