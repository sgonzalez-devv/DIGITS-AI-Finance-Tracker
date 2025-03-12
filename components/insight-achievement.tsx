"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface InsightAchievementProps {
  title: string;
  description: string;
  icon: ReactNode;
  metric: string;
  date: string;
}

export default function InsightAchievement({
  title,
  description,
  icon,
  metric,
  date,
}: InsightAchievementProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-xs">
            Achievement
          </Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 md:p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-base md:text-lg">{title}</h3>
            <div className="text-sm font-medium text-green-600 dark:text-green-400">
              {metric}
            </div>
          </div>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground mb-4">
          {description}
        </p>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs md:text-sm"
          >
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs md:text-sm text-muted-foreground"
          >
            <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
