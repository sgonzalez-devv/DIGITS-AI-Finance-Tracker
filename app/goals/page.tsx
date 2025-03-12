"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trophy, Target, Sparkles } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import HighwayProgress from "@/components/highway-progress"
import AddGoalDialog from "@/components/add-goal-dialog"
import GoalMilestones from "@/components/goal-milestones"
import AchievementBadge from "@/components/achievement-badge"

// Sample goals data
const goals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "Build a safety net for unexpected expenses",
    current: 3000,
    target: 5000,
    category: "savings",
    milestones: [
      { amount: 1000, title: "First Step", achieved: true, reward: "Bronze Badge" },
      { amount: 2500, title: "Halfway There", achieved: true, reward: "50 Points" },
      { amount: 4000, title: "Almost There", achieved: false, reward: "Silver Badge" },
      { amount: 5000, title: "Goal Complete", achieved: false, reward: "Gold Badge + 100 Points" },
    ],
  },
  {
    id: 2,
    title: "New Laptop",
    description: "Save for a MacBook Pro for work",
    current: 800,
    target: 1500,
    category: "purchase",
    milestones: [
      { amount: 500, title: "Started Saving", achieved: true, reward: "25 Points" },
      { amount: 1000, title: "More Than Halfway", achieved: false, reward: "Tech Enthusiast Badge" },
      { amount: 1500, title: "Purchase Ready", achieved: false, reward: "Smart Shopper Badge + 75 Points" },
    ],
  },
  {
    id: 3,
    title: "Vacation Fund",
    description: "Trip to Bali next summer",
    current: 250,
    target: 2000,
    category: "travel",
    milestones: [
      { amount: 500, title: "Planning Phase", achieved: false, reward: "Traveler Badge" },
      { amount: 1000, title: "Halfway to Paradise", achieved: false, reward: "50 Points" },
      { amount: 1500, title: "Almost Packed", achieved: false, reward: "Adventurer Badge" },
      { amount: 2000, title: "Bon Voyage", achieved: false, reward: "Explorer Badge + 100 Points" },
    ],
  },
]

// Sample achievements data
const achievements = [
  {
    id: 1,
    title: "First Goal Created",
    description: "Created your first financial goal",
    icon: <Target className="h-6 w-6" />,
    earned: true,
  },
  {
    id: 2,
    title: "Consistent Saver",
    description: "Added to your savings 3 days in a row",
    icon: <Sparkles className="h-6 w-6" />,
    earned: true,
  },
  {
    id: 3,
    title: "Milestone Master",
    description: "Reached 5 goal milestones",
    icon: <Trophy className="h-6 w-6" />,
    earned: false,
  },
  {
    id: 4,
    title: "Budget Champion",
    description: "Stayed under budget for 3 consecutive months",
    icon: <Trophy className="h-6 w-6" />,
    earned: false,
  },
]

export default function GoalsPage() {
  const [selectedGoal, setSelectedGoal] = useState(goals[0])
  const [showAddGoal, setShowAddGoal] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />

      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
            <p className="text-muted-foreground">Track your progress and celebrate milestones</p>
          </div>
          <Button onClick={() => setShowAddGoal(true)} className="mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add New Goal
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-purple-500" />
                  Your Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {goals.map((goal) => (
                  <Button
                    key={goal.id}
                    variant={selectedGoal.id === goal.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedGoal(goal)}
                  >
                    <div className="flex flex-col items-start">
                      <span>{goal.title}</span>
                      <span className="text-xs text-muted-foreground">
                        ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                      </span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                  Achievements
                </CardTitle>
                <CardDescription>Badges you've earned on your financial journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      title={achievement.title}
                      description={achievement.description}
                      icon={achievement.icon}
                      earned={achievement.earned}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGoal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>{selectedGoal.title}</CardTitle>
                    <CardDescription>{selectedGoal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <HighwayProgress
                        current={selectedGoal.current}
                        target={selectedGoal.target}
                        milestones={selectedGoal.milestones}
                      />
                    </div>

                    <GoalMilestones milestones={selectedGoal.milestones} current={selectedGoal.current} />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">Current progress:</span>
                      <span className="ml-2 font-medium">
                        {Math.round((selectedGoal.current / selectedGoal.target) * 100)}%
                      </span>
                    </div>
                    <Button>Add Funds</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>

            <Card>
              <CardHeader>
                <CardTitle>Goal Insights</CardTitle>
                <CardDescription>AI-powered analysis of your saving patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                      <Sparkles className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                    </div>
                    <div>
                      <h4 className="font-medium">Savings Acceleration</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        At your current rate, you'll reach your Emergency Fund goal by August 2025. If you increase your
                        monthly contribution by just $50, you could reach it 6 weeks earlier!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                      <Target className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    </div>
                    <div>
                      <h4 className="font-medium">Spending Pattern</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        We've noticed you tend to save more at the beginning of the month. Setting up automatic
                        transfers could help maintain consistent progress toward your goals.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AddGoalDialog open={showAddGoal} onOpenChange={setShowAddGoal} />
    </div>
  )
}

