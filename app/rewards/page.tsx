"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Trophy,
  Star,
  Gift,
  Calendar,
  Flame,
  Award,
  Crown,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import StreakCalendar from "@/components/streak-calendar";
import RewardCard from "@/components/reward-card";
import LevelProgressBar from "@/components/level-progress-bar";

// Sample rewards data
const rewards = [
  {
    id: 1,
    title: "Budget Master",
    description: "Stay under budget for 30 consecutive days",
    points: 100,
    progress: 22,
    total: 30,
    icon: <Trophy className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Saving Streak",
    description: "Add to your savings account 5 days in a row",
    points: 50,
    progress: 3,
    total: 5,
    icon: <Flame className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "Goal Achiever",
    description: "Complete 3 financial goals",
    points: 200,
    progress: 1,
    total: 3,
    icon: <Award className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Expense Tracker",
    description: "Log all expenses for 14 consecutive days",
    points: 75,
    progress: 14,
    total: 14,
    icon: <Calendar className="h-6 w-6" />,
    completed: true,
  },
];

// Sample badges data
const badges = [
  {
    id: 1,
    title: "First Steps",
    description: "Created your first financial goal",
    icon: <Star className="h-6 w-6" />,
    earned: true,
  },
  {
    id: 2,
    title: "Streak Starter",
    description: "Maintained a 3-day streak",
    icon: <Flame className="h-6 w-6" />,
    earned: true,
  },
  {
    id: 3,
    title: "Budget Pro",
    description: "Stayed under budget for a full month",
    icon: <Trophy className="h-6 w-6" />,
    earned: false,
  },
  {
    id: 4,
    title: "Savings Champion",
    description: "Reached a savings milestone",
    icon: <Award className="h-6 w-6" />,
    earned: true,
  },
  {
    id: 5,
    title: "Goal Crusher",
    description: "Completed your first financial goal",
    icon: <Gift className="h-6 w-6" />,
    earned: false,
  },
  {
    id: 6,
    title: "Finance Master",
    description: "Reached level 10",
    icon: <Crown className="h-6 w-6" />,
    earned: false,
  },
];

export default function RewardsPage() {
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

  // Current user level data
  const userLevel = {
    level: 4,
    points: 325,
    nextLevel: 500,
    title: "Budget Apprentice",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />

      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Rewards & Achievements
            </h1>
            <p className="text-muted-foreground">
              Track your progress and earn rewards for good financial habits
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Level</CardTitle>
                <CardDescription>
                  Earn points by completing challenges and maintaining good
                  financial habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">
                        {userLevel.level}
                      </span>
                    </div>
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#levelGradient)"
                        strokeWidth="8"
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{
                          strokeDashoffset:
                            283 * (1 - userLevel.points / userLevel.nextLevel),
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient
                          id="levelGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="mt-2 text-center">
                    <h3 className="text-xl font-bold">{userLevel.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {userLevel.points} / {userLevel.nextLevel} points to level{" "}
                      {userLevel.level + 1}
                    </p>
                  </div>

                  <div className="mt-6 w-full max-w-md">
                    <LevelProgressBar level={userLevel.level} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Streak</CardTitle>
                <CardDescription>
                  Maintain your daily streak by logging in and tracking your
                  finances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">
                        Current Streak: 7 days
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Best: 14 days
                    </div>
                  </div>

                  <StreakCalendar />

                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Gift className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Streak Reward</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Maintain your streak for 3 more days to earn the
                          "10-Day Streak" badge and 50 points!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Challenges</CardTitle>
                <CardDescription>
                  Complete these challenges to earn points and badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewards.map((reward) => (
                    <RewardCard key={reward.id} reward={reward} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>
                  Achievements you've earned on your financial journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge) => (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer ${
                        badge.earned
                          ? "bg-gradient-to-br from-purple-500 to-blue-500"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                      onClick={() =>
                        setSelectedBadge(
                          badge.id === selectedBadge ? null : badge.id
                        )
                      }
                    >
                      <div
                        className={`rounded-full p-3 ${
                          badge.earned
                            ? "bg-white/20"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      >
                        <div
                          className={
                            badge.earned
                              ? "text-white"
                              : "text-slate-500 dark:text-slate-400"
                          }
                        >
                          {badge.icon}
                        </div>
                      </div>
                      <div
                        className={`mt-2 text-xs font-medium text-center ${
                          badge.earned
                            ? "text-white"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {badge.title}
                      </div>
                      {!badge.earned && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                          <div className="p-1 bg-slate-800 rounded-md text-white text-xs">
                            Locked
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <AnimatePresence>
              {selectedBadge !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Badge Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const badge = badges.find(
                          (b) => b.id === selectedBadge
                        );
                        if (!badge) return null;

                        return (
                          <div className="flex flex-col items-center text-center">
                            <div
                              className={`rounded-full p-4 ${
                                badge.earned
                                  ? "bg-gradient-to-br from-purple-500 to-blue-500"
                                  : "bg-slate-200 dark:bg-slate-700"
                              }`}
                            >
                              <div
                                className={
                                  badge.earned ? "text-white" : "text-slate-500"
                                }
                              >
                                {badge.icon}
                              </div>
                            </div>
                            <h3 className="mt-4 font-bold text-lg">
                              {badge.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {badge.description}
                            </p>

                            {badge.earned ? (
                              <div className="mt-4 p-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md text-sm">
                                Earned on April 12, 2025
                              </div>
                            ) : (
                              <div className="mt-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-md text-sm">
                                Complete the required actions to unlock this
                                badge
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
