"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function SpendingInsights() {
  const [activeTab, setActiveTab] = useState("categories");

  const categoryData = [
    { name: "Housing", value: 1200, color: "#8b5cf6" },
    { name: "Food", value: 450, color: "#3b82f6" },
    { name: "Transportation", value: 350, color: "#10b981" },
    { name: "Entertainment", value: 200, color: "#f59e0b" },
    { name: "Utilities", value: 180, color: "#ef4444" },
    { name: "Other", value: 120, color: "#6366f1" },
  ];

  const trendData = [
    { name: "Week 1", amount: 520 },
    { name: "Week 2", amount: 480 },
    { name: "Week 3", amount: 650 },
    { name: "Week 4", amount: 700 },
  ];

  const merchantData = [
    { name: "Grocery Store", amount: 320 },
    { name: "Restaurants", amount: 280 },
    { name: "Gas Station", amount: 180 },
    { name: "Online Shopping", amount: 150 },
    { name: "Coffee Shops", amount: 90 },
  ];

  const totalSpending = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle>Spending Insights</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Tabs Wrapper */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex justify-center bg-transparent rounded-md p-1 mb-4">
            <TabsTrigger
              value="categories"
              className="text-xs px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="text-xs px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700"
            >
              Trends
            </TabsTrigger>
            <TabsTrigger
              value="merchants"
              className="text-xs px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700"
            >
              Merchants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData.map((item) => ({
                        ...item,
                        percentage: Math.round(
                          (item.value / totalSpending) * 100
                        ),
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Category Breakdown</h3>
                <p className="text-muted-foreground">
                  Your top spending categories for this month
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-0">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Weekly Spending Trends</h3>
              <p className="text-muted-foreground">
                Your spending patterns over the past month
              </p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="amount"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="merchants" className="mt-0">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Top Merchants</h3>
              <p className="text-muted-foreground">
                Where you spend the most money
              </p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={merchantData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="amount"
                      fill="#8b5cf6"
                      radius={[0, 4, 4, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
