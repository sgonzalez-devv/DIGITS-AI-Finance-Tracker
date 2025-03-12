"use client";

import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface InsightSummaryCardProps {
  title: string;
  value: string;
  description: string;
  trend?: string;
  icon: ReactNode;
  color: "blue" | "green" | "purple" | "amber" | "red";
}

export default function InsightSummaryCard({
  title,
  value,
  description,
  trend,
  icon,
  color,
}: InsightSummaryCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      case "green":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "purple":
        return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800";
      case "amber":
        return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
      case "red":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
    }
  };

  const getIconColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400";
      case "green":
        return "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400";
      case "purple":
        return "bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-400";
      case "amber":
        return "bg-amber-100 dark:bg-amber-800 text-amber-600 dark:text-amber-400";
      case "red":
        return "bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400";
      default:
        return "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400";
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;

    const isPositive = trend.includes("+");

    return isPositive ? (
      <ArrowUp className="h-3 w-3 text-green-500" />
    ) : (
      <ArrowDown className="h-3 w-3 text-red-500" />
    );
  };

  return (
    <Card className={`border shadow ${getColorClasses()}`}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <div className={`p-2 md:p-3 rounded-full ${getIconColorClasses()}`}>
            {icon}
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-sm">{title}</h3>
            <div className="text-xl md:text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
            {trend && (
              <div className="flex items-center text-xs">
                {getTrendIcon()}
                <span
                  className={
                    trend.includes("+")
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  {trend}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
