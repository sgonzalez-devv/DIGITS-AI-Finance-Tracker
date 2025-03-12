"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Plus, Sparkles, Trophy } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import ExpenseChart from "@/components/expense-chart"
import GoalCard from "@/components/goal-card"
import TransactionList from "@/components/transaction-list"
import AddTransactionDialog from "@/components/add-transaction-dialog"
import AiInsightCard from "@/components/ai-insight-card"

export default function DashboardPage() {
  const [showAddTransaction, setShowAddTransaction] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />

      <main className="container py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your finances.</p>
          </div>
          <Button onClick={() => setShowAddTransaction(true)} className="mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <div className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,550.00</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$6,420.00</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,870.00</div>
              <p className="text-xs text-muted-foreground">-4.3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450.00</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7 mt-6">
          <div className="md:col-span-7 lg:col-span-5 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Overview</CardTitle>
                <CardDescription>Your spending patterns for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activities</CardDescription>
                </div>
                <Tabs defaultValue="all">
                  <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="all" className="flex-1 sm:flex-none">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="income" className="flex-1 sm:flex-none">
                      Income
                    </TabsTrigger>
                    <TabsTrigger value="expense" className="flex-1 sm:flex-none">
                      Expense
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsContent value="all">
                    <TransactionList />
                  </TabsContent>
                  <TabsContent value="income">
                    <TransactionList />
                  </TabsContent>
                  <TabsContent value="expense">
                    <TransactionList />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-7 lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                  Financial Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <GoalCard title="Emergency Fund" current={3000} target={5000} color="blue" />
                <GoalCard title="New Laptop" current={800} target={1500} color="purple" />
                <GoalCard title="Vacation" current={250} target={2000} color="amber" />
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Goal
                </Button>
              </CardContent>
            </Card>

            <AiInsightCard />
          </div>
        </div>
      </main>

      <AddTransactionDialog open={showAddTransaction} onOpenChange={setShowAddTransaction} onSave={() => {}} />
    </div>
  )
}

