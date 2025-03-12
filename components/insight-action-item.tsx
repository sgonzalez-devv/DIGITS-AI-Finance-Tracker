"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, ArrowRight } from "lucide-react";

interface InsightActionItemProps {
  action: {
    id: number;
    title: string;
    description: string;
    impact: string;
    difficulty: string;
    timeEstimate: string;
    completed: boolean;
    insightId: number;
  };
  isCompleted: boolean;
  onToggleComplete: () => void;
  onViewInsight: () => void;
}

export default function InsightActionItem({
  action,
  isCompleted,
  onToggleComplete,
  onViewInsight,
}: InsightActionItemProps) {
  return (
    <Card className="border shadow-sm hover:shadow transition-shadow">
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col space-y-2 md:space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={onToggleComplete}
                className={`p-1.5 md:p-2 rounded-full ${
                  isCompleted
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-slate-100 dark:bg-slate-900/30"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                ) : (
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-slate-500" />
                )}
              </button>
              <h3
                className={`font-medium text-sm md:text-base ${
                  isCompleted ? "line-through text-muted-foreground" : ""
                }`}
              >
                {action.title}
              </h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {action.difficulty} • {action.timeEstimate}
            </Badge>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground">
            {action.description}
          </p>

          {!isCompleted && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Impact</span>
                <span>{action.impact}</span>
              </div>
              <Progress
                value={action.impact.includes("Save") ? 75 : 50}
                className="h-1.5"
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewInsight}
              className="h-8 text-xs md:text-sm"
            >
              View Insight
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
