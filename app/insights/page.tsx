"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Sparkles,
  Target,
  Wallet,
  ChevronRight,
  ChevronDown,
  Award,
  Bookmark,
  Share2,
  FileBadge,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import InsightCard from "@/components/insight-card";
import FinancialHealthScore from "@/components/financial-health-score";
import SpendingInsights from "@/components/spending-insights";
import SavingsPotential from "@/components/savings-potential";
import FutureProjections from "@/components/future-projections";
import InsightDetailDialog from "@/components/insight-detail-dialog";
import FinancialTimelineView from "@/components/financial-timeline-view";
import InsightSummaryCard from "@/components/insight-summary-card";
import PredictiveScenarios from "@/components/predictive-scenarios";
import FinancialGoalInsights from "@/components/financial-goal-insights";
import InsightActionItem from "@/components/insight-action-item";
import InsightTrends from "@/components/insight-trends";
import InsightComparison from "@/components/insight-comparison";
import InsightAchievement from "@/components/insight-achievement";

// Sample insights data
const insightItems = [
  {
    id: 1,
    title: "Spending Pattern Detected",
    description:
      "Your restaurant spending increases by 40% on weekends. Consider setting a weekend dining budget.",
    category: "spending",
    impact: "medium",
    date: "2025-04-15",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "blue",
    saved: false,
    actionable: true,
    metrics: {
      weekdayAvg: 25,
      weekendAvg: 35,
      trend: "+40%",
    },
  },
  {
    id: 2,
    title: "Spending Pattern Detected",
    description:
      "Your restaurant spending increases by 40% on weekends. Consider setting a weekend dining budget.",
    category: "spending",
    impact: "medium",
    date: "2025-04-15",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "blue",
    saved: false,
    actionable: true,
    metrics: {
      weekdayAvg: 25,
      weekendAvg: 35,
      trend: "+40%",
    },
  },
  {
    id: 3,
    title: "Spending Pattern Detected",
    description:
      "Your restaurant spending increases by 40% on weekends. Consider setting a weekend dining budget.",
    category: "spending",
    impact: "medium",
    date: "2025-04-15",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "blue",
    saved: false,
    actionable: true,
    metrics: {
      weekdayAvg: 25,
      weekendAvg: 35,
      trend: "+40%",
    },
  },
  // ... other insight items
];

// Sample action items
const actionItems = [
  {
    id: 1,
    title: "Review streaming subscriptions",
    description:
      "Evaluate which services you use most and consider canceling others",
    impact: "Save $22/month",
    difficulty: "easy",
    timeEstimate: "15 min",
    completed: false,
    insightId: 2,
  },
  // ... other action items
];

export default function InsightsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const [showInsightDetail, setShowInsightDetail] = useState(false);
  const [savedInsights, setSavedInsights] = useState<number[]>([]);
  const [completedActions, setCompletedActions] = useState<number[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        setIsScrolled(window.scrollY > headerRef.current.offsetHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize saved insights
  useEffect(() => {
    const initialSaved = insightItems
      .filter((insight) => insight.saved)
      .map((insight) => insight.id);

    setSavedInsights(initialSaved);

    // Initialize completed actions
    const initialCompleted = actionItems
      .filter((action) => action.completed)
      .map((action) => action.id);

    setCompletedActions(initialCompleted);
  }, []);

  // Handle saving/unsaving insights
  const toggleSaveInsight = (insightId: number) => {
    setSavedInsights((prev) =>
      prev.includes(insightId)
        ? prev.filter((id) => id !== insightId)
        : [...prev, insightId]
    );

    toast({
      title: savedInsights.includes(insightId)
        ? "Insight removed from saved"
        : "Insight saved",
      description: savedInsights.includes(insightId)
        ? "The insight has been removed from your saved items."
        : "The insight has been saved for future reference.",
    });
  };

  // Handle completing action items
  const toggleCompleteAction = (actionId: number) => {
    setCompletedActions((prev) =>
      prev.includes(actionId)
        ? prev.filter((id) => id !== actionId)
        : [...prev, actionId]
    );

    if (!completedActions.includes(actionId)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      toast({
        title: "Action completed!",
        description: "Great job taking steps to improve your finances!",
      });
    }
  };

  // Open insight detail dialog
  const openInsightDetail = (insight: any) => {
    setSelectedInsight(insight);
    setShowInsightDetail(true);
  };

  // Filter insights based on active tab
  const filteredInsights = insightItems.filter((insight) => {
    if (activeTab === "overview") return true;
    if (activeTab === "spending") return insight.category === "spending";
    if (activeTab === "savings") return insight.category === "savings";
    if (activeTab === "achievements") return insight.category === "achievement";
    if (activeTab === "alerts") return insight.category === "alert";
    if (activeTab === "saved") return savedInsights.includes(insight.id);
    return true;
  });

  // Filter action items based on completed status
  const filteredActions = actionItems.filter((action) => {
    if (activeTab === "completed") return completedActions.includes(action.id);
    if (activeTab === "pending") return !completedActions.includes(action.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />

      {/* Confetti animation for completed actions */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: window.innerHeight + 20,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: "easeOut",
              }}
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                backgroundColor: [
                  "#8b5cf6",
                  "#3b82f6",
                  "#10b981",
                  "#f59e0b",
                  "#ef4444",
                ][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      {/* Hero section with 3D visualization */}
      <div
        ref={headerRef}
        className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center"></div>
        </div>

        <div className="container relative z-10 py-12 md:py-16 px-4 md:px-6">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-800/50 backdrop-blur-sm text-sm font-medium">
                <Sparkles className="mr-2 h-4 w-4 text-purple-300" />
                <span>AI-Powered Financial Intelligence</span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight">
                Your Financial{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
                  Insights
                </span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg text-blue-100 max-w-xl">
                Discover personalized insights, opportunities, and
                recommendations to optimize your financial health and achieve
                your goals faster.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  className="bg-white text-purple-900 hover:bg-blue-50"
                  onClick={() =>
                    window.scrollTo({
                      top: headerRef.current?.offsetHeight || 0,
                      behavior: "smooth",
                    })
                  }
                >
                  Explore Insights
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Report
                </Button>
              </div>
            </div>

            <div className="relative h-[250px] md:h-[350px] lg:h-[400px] mx-auto w-full max-w-[400px]">
              <FinancialHealthScore score={78} />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              className="text-slate-50 dark:text-slate-900"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Sticky navigation bar that appears on scroll */}
      <div
        className={cn(
          "sticky top-16 z-30 w-full transition-all duration-300 border-b backdrop-blur-md",
          isScrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="container py-2 px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h2 className="text-lg md:text-xl font-bold">Financial Insights</h2>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList className="w-full sm:w-auto overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="spending">Spending</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <main className="container py-8 md:py-12 px-4 md:px-6">
        {/* Main tabs navigation */}
        <div className="mb-6 md:mb-8">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Your Insights</h2>
              <TabsList className="w-full sm:w-auto overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="spending">Spending</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-8">
              {/* Summary Cards */}
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                <InsightSummaryCard
                  title="Potential Savings"
                  value="$267"
                  description="Monthly savings opportunities"
                  trend="+12% from last month"
                  icon={<Wallet className="h-5 w-5" />}
                  color="green"
                />

                <InsightSummaryCard
                  title="Financial Health"
                  value="78/100"
                  description="Your current financial score"
                  trend="+5 points in 30 days"
                  icon={<Activity className="h-5 w-5" />}
                  color="blue"
                />

                <InsightSummaryCard
                  title="Action Items"
                  value={`${completedActions.length}/${actionItems.length}`}
                  description="Completed financial actions"
                  trend="2 high-impact items pending"
                  icon={<CheckCircle className="h-5 w-5" />}
                  color="purple"
                />
              </div>

              {/* Main content grid */}
              <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                  {/* Featured insight */}
                  <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <CardContent className="p-0">
                      <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <Badge className="bg-white/20 hover:bg-white/30 text-white">
                            Featured Insight
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                          >
                            <Bookmark className="h-5 w-5" />
                          </Button>
                        </div>

                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                          Optimize Your Subscriptions
                        </h3>
                        <p className="text-sm md:text-base text-blue-100">
                          You're currently spending $45.97 monthly on 3
                          streaming services with overlapping content. By
                          consolidating to just 2 services, you could save $22
                          every month.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-1">
                          <Button
                            size="sm"
                            className="bg-white text-blue-600 hover:bg-blue-50"
                            onClick={() => openInsightDetail(insightItems[1])}
                          >
                            View Details
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white text-white hover:bg-white/10"
                            onClick={() => toggleCompleteAction(1)}
                          >
                            Take Action
                          </Button>
                        </div>
                      </div>

                      <div className="bg-black/20 p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="grid grid-cols-3 gap-2 md:gap-4 w-full sm:w-auto">
                            <div className="text-center">
                              <div className="text-xs md:text-sm text-blue-200">
                                Current Cost
                              </div>
                              <div className="text-base md:text-xl lg:text-2xl font-bold">
                                $45.97
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-xs md:text-sm text-blue-200">
                                Potential Cost
                              </div>
                              <div className="text-base md:text-xl lg:text-2xl font-bold">
                                $23.97
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-xs md:text-sm text-blue-200">
                                Annual Savings
                              </div>
                              <div className="text-base md:text-xl lg:text-2xl font-bold">
                                $264
                              </div>
                            </div>
                          </div>

                          <div className="hidden md:block">
                            <Badge className="bg-green-500 hover:bg-green-600 text-white">
                              High Impact
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Spending Insights */}
                  <SpendingInsights />

                  {/* Action Items */}
                  <Card className="border-0 shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 md:p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-base md:text-lg">
                          Action Items
                        </h3>
                        <Tabs defaultValue="pending" className="w-auto">
                          <TabsList className="bg-white/20">
                            <TabsTrigger
                              value="pending"
                              className="text-xs data-[state=active]:bg-white data-[state=active]:text-purple-700"
                            >
                              Pending
                            </TabsTrigger>
                            <TabsTrigger
                              value="completed"
                              className="text-xs data-[state=active]:bg-white data-[state=active]:text-purple-700"
                            >
                              Completed
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>

                    <div className="p-3 md:p-4 max-h-[350px] md:max-h-[400px] overflow-y-auto">
                      <div className="space-y-3">
                        {filteredActions.length > 0 ? (
                          filteredActions.map((action) => (
                            <InsightActionItem
                              key={action.id}
                              action={action}
                              isCompleted={completedActions.includes(action.id)}
                              onToggleComplete={() =>
                                toggleCompleteAction(action.id)
                              }
                              onViewInsight={() => {
                                const insight = insightItems.find(
                                  (i) => i.id === action.insightId
                                );
                                if (insight) openInsightDetail(insight);
                              }}
                            />
                          ))
                        ) : (
                          <div className="text-center py-6 md:py-8 text-muted-foreground">
                            <CheckCircle className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 text-green-500 opacity-50" />
                            <p>All actions completed!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* Financial Timeline */}
                  <FinancialTimelineView />
                </div>

                <div className="space-y-4 md:space-y-6">
                  {/* Savings Potential */}
                  <SavingsPotential />

                  {/* Goal Insights */}
                  <FinancialGoalInsights />

                  {/* Recent Insights */}
                  <Card className="border-0 shadow-md h-[475px]">
                    <div className="p-4 border-b">
                      <h3 className="font-bold">Recent Insights</h3>
                    </div>
                    <div className="p-4 max-h-[400px] overflow-y-auto">
                      <div className="space-y-3">
                        {insightItems.slice(0, 5).map((insight) => (
                          <div
                            key={insight.id}
                            className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                            onClick={() => openInsightDetail(insight)}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-full bg-${insight.color}-100 dark:bg-${insight.color}-900/30 text-${insight.color}-600 dark:text-${insight.color}-400`}
                              >
                                {insight.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm">
                                  {insight.title}
                                </h4>
                                <p className="text-xs text-muted-foreground truncate">
                                  {insight.description}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Achievement Showcase */}
              <div className="grid gap-4 md:gap-6 grid-cols-3 mt-4 md:mt-6">
                <InsightAchievement
                  title="Budget Master"
                  description="Stayed under budget for 3 consecutive months"
                  icon={<Award className="h-6 w-6" />}
                  metric="$120 saved"
                  date="April 3, 2025"
                />

                <InsightAchievement
                  title="Savings Milestone"
                  description="Reached 83% of emergency fund goal"
                  icon={<Target className="h-6 w-6" />}
                  metric="$5,000 saved"
                  date="April 12, 2025"
                />

                <InsightAchievement
                  title="Income Growth"
                  description="8% increase in monthly income"
                  icon={<TrendingUp className="h-6 w-6" />}
                  metric="+$256/month"
                  date="April 10, 2025"
                />
              </div>

              {/* Predictive Scenarios */}
              <PredictiveScenarios />

              <div className="grid grid-cols-2 gap-4">
                {/* Future Projections */}
                <FutureProjections />

                {/* Insight Trends */}
                <InsightTrends />
              </div>

              {/* Comparison Insights */}
              <div className="grid gap-4 md:gap-6 md:grid-cols-2 mt-4 md:mt-6">
                <InsightComparison
                  title="Income vs. Expenses"
                  description="Monthly comparison of your income and expenses"
                  data={[
                    { month: "Jan", income: 3200, expenses: 2800 },
                    { month: "Feb", income: 3200, expenses: 2750 },
                    { month: "Mar", income: 3400, expenses: 2900 },
                    { month: "Apr", income: 3456, expenses: 3050 },
                  ]}
                />

                <InsightComparison
                  title="Savings Growth"
                  description="Your savings growth over time"
                  data={[
                    { month: "Jan", actual: 400, projected: 350 },
                    { month: "Feb", actual: 450, projected: 400 },
                    { month: "Mar", actual: 500, projected: 450 },
                    { month: "Apr", actual: 406, projected: 500 },
                  ]}
                  valueKeys={["actual", "projected"]}
                  colors={["green", "blue"]}
                />
              </div>
            </TabsContent>

            {/* Other Tab Contents */}
            <TabsContent value="spending" className="space-y-6">
              <h3 className="text-2xl font-bold">Spending Insights</h3>
              <p className="text-muted-foreground">
                Discover patterns and opportunities in your spending habits.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInsights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    isSaved={savedInsights.includes(insight.id)}
                    onToggleSave={() => toggleSaveInsight(insight.id)}
                    onClick={() => openInsightDetail(insight)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="savings" className="space-y-6">
              <h3 className="text-2xl font-bold">Savings Insights</h3>
              <p className="text-muted-foreground">
                Opportunities to increase your savings and optimize your
                finances.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInsights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    isSaved={savedInsights.includes(insight.id)}
                    onToggleSave={() => toggleSaveInsight(insight.id)}
                    onClick={() => openInsightDetail(insight)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <h3 className="text-2xl font-bold">Financial Achievements</h3>
              <p className="text-muted-foreground">
                Celebrate your financial wins and milestones.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInsights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    isSaved={savedInsights.includes(insight.id)}
                    onToggleSave={() => toggleSaveInsight(insight.id)}
                    onClick={() => openInsightDetail(insight)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <h3 className="text-2xl font-bold">Financial Alerts</h3>
              <p className="text-muted-foreground">
                Important notifications about your financial activity.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInsights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    isSaved={savedInsights.includes(insight.id)}
                    onToggleSave={() => toggleSaveInsight(insight.id)}
                    onClick={() => openInsightDetail(insight)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <h3 className="text-2xl font-bold">Saved Insights</h3>
              <p className="text-muted-foreground">
                Insights you've saved for future reference.
              </p>

              {filteredInsights.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredInsights.map((insight) => (
                    <InsightCard
                      key={insight.id}
                      insight={insight}
                      isSaved={savedInsights.includes(insight.id)}
                      onToggleSave={() => toggleSaveInsight(insight.id)}
                      onClick={() => openInsightDetail(insight)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                  <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="text-lg font-medium">No saved insights</h4>
                  <p className="text-muted-foreground mt-1">
                    Save insights by clicking the bookmark icon on any insight
                    card.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Insight Detail Dialog */}
      <InsightDetailDialog
        open={showInsightDetail}
        onOpenChange={setShowInsightDetail}
        insight={selectedInsight}
        isSaved={
          selectedInsight ? savedInsights.includes(selectedInsight.id) : false
        }
        onToggleSave={
          selectedInsight
            ? () => toggleSaveInsight(selectedInsight.id)
            : undefined
        }
        relatedActions={
          selectedInsight
            ? actionItems.filter(
                (action) => action.insightId === selectedInsight.id
              )
            : []
        }
        onCompleteAction={toggleCompleteAction}
        completedActions={completedActions}
      />
    </div>
  );
}

// Helper icon components
function Activity(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}
