"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  Home,
  Calendar,
} from "lucide-react";

export default function PredictiveScenarios() {
  const [activeScenario, setActiveScenario] = useState("savings");

  // Sample scenario data
  const scenarios = {
    savings: {
      title: "Boost Your Savings Rate",
      description: "What if you increased your monthly savings by 10%?",
      icon: <DollarSign className="h-5 w-5" />,
      color: "green",
      impact: [
        {
          title: "Emergency Fund",
          current: "6 months",
          predicted: "8 months",
          timeframe: "by Dec 2025",
        },
        {
          title: "Retirement",
          current: "$850K",
          predicted: "$920K",
          timeframe: "by age 65",
        },
        {
          title: "Vacation Goal",
          current: "Feb 2026",
          predicted: "Nov 2025",
          timeframe: "3 months earlier",
        },
      ],
    },
    debt: {
      title: "Accelerate Debt Payoff",
      description: "What if you add $100/month to your debt payments?",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "blue",
      impact: [
        {
          title: "Credit Card",
          current: "15 months",
          predicted: "11 months",
          timeframe: "4 months faster",
        },
        {
          title: "Interest Saved",
          current: "$0",
          predicted: "$450",
          timeframe: "total savings",
        },
        {
          title: "Credit Score",
          current: "720",
          predicted: "745",
          timeframe: "within 6 months",
        },
      ],
    },
    housing: {
      title: "Mortgage Refinancing",
      description: "What if you refinanced your mortgage at current rates?",
      icon: <Home className="h-5 w-5" />,
      color: "purple",
      impact: [
        {
          title: "Monthly Payment",
          current: "$1,450",
          predicted: "$1,280",
          timeframe: "savings of $170/mo",
        },
        {
          title: "Loan Term",
          current: "25 years left",
          predicted: "20 years",
          timeframe: "5 years faster",
        },
        {
          title: "Total Interest",
          current: "$215K",
          predicted: "$165K",
          timeframe: "savings of $50K",
        },
      ],
    },
    investing: {
      title: "Investment Allocation",
      description: "What if you adjusted your investment portfolio allocation?",
      icon: <Calendar className="h-5 w-5" />,
      color: "amber",
      impact: [
        {
          title: "Expected Return",
          current: "7% annually",
          predicted: "8.5% annually",
          timeframe: "long-term average",
        },
        {
          title: "Risk Level",
          current: "Moderate",
          predicted: "Moderate-High",
          timeframe: "slight increase",
        },
        {
          title: "Retirement Date",
          current: "Age 67",
          predicted: "Age 65",
          timeframe: "2 years earlier",
        },
      ],
    },
  };

  const activeData = scenarios[activeScenario as keyof typeof scenarios];

  // Helper function to get color classes
  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case "green":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-600 dark:text-green-400",
        };
      case "blue":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
        };
      case "purple":
        return {
          bg: "bg-purple-100 dark:bg-purple-900/30",
          text: "text-purple-600 dark:text-purple-400",
        };
      case "amber":
        return {
          bg: "bg-amber-100 dark:bg-amber-900/30",
          text: "text-amber-600 dark:text-amber-400",
        };
      default:
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
        };
    }
  };

  const colorClasses = getColorClasses(activeData.color);

  return (
    <Card className="border-0 shadow-md overflow-hidden h-full">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardTitle>Predictive Scenarios</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs
          value={activeScenario}
          onValueChange={setActiveScenario}
          className="w-full"
        >
          <div className="px-4 pt-4">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="debt">Debt</TabsTrigger>
              <TabsTrigger value="housing">Housing</TabsTrigger>
              <TabsTrigger value="investing">Investing</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-full ${colorClasses.bg} ${colorClasses.text}`}
              >
                {activeData.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{activeData.title}</h3>
                <p className="text-muted-foreground">
                  {activeData.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {activeData.impact.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-muted/30 rounded-lg"
                >
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Category
                    </div>
                    <div className="font-medium">{item.title}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Current Path
                    </div>
                    <div className="font-medium">{item.current}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      New Prediction
                    </div>
                    <div className={`font-medium ${colorClasses.text}`}>
                      {item.predicted}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.timeframe}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full">
              Explore This Scenario
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
