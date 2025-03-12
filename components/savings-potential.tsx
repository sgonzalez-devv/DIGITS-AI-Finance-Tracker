"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Coins, ChevronRight } from "lucide-react";

export default function SavingsPotential() {
  const savingsOpportunities = [
    {
      id: 1,
      title: "Streaming Services",
      description: "Consolidate overlapping subscriptions",
      amount: 22,
      difficulty: "easy",
    },
    {
      id: 2,
      title: "Food Spending",
      description: "Reduce dining out by 20%",
      amount: 85,
      difficulty: "medium",
    },
    {
      id: 3,
      title: "Phone Plan",
      description: "Switch to a cheaper provider",
      amount: 35,
      difficulty: "easy",
    },
  ];

  // Calculate total potential savings
  const totalSavings = savingsOpportunities.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Savings Potential
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <div className="text-sm text-muted-foreground">
              Monthly savings potential
            </div>
            <div className="text-2xl font-bold">${totalSavings}/mo</div>
          </div>

          <div className="space-y-3">
            {savingsOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="flex items-start justify-between border-b pb-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      opportunity.difficulty === "easy"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{opportunity.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {opportunity.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-bold text-green-600 dark:text-green-400">
                    +${opportunity.amount}/mo
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {opportunity.difficulty} to implement
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="text-sm text-muted-foreground mb-1">
              Annual potential savings
            </div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              ${totalSavings * 12}/year
            </div>
          </div>

          <Button className="w-full mt-2" variant="outline">
            View All Opportunities
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
