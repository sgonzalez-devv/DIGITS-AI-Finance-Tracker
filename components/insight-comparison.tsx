"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ClientOnly from "@/components/client-only";

interface InsightComparisonProps {
  title: string;
  description: string;
  data: any[];
  valueKeys?: string[];
  colors?: string[];
}

export default function InsightComparison({
  title,
  description,
  data,
  valueKeys = ["income", "expenses"],
  colors = ["green", "blue"],
}: InsightComparisonProps) {
  // Create config object for chart
  const createChartConfig = () => {
    const config: Record<string, { label: string; color: string }> = {};

    valueKeys.forEach((key, index) => {
      config[key] = {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        color: `hsl(var(--chart-${index + 1}))`,
      };
    });

    return config;
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2 md:pb-4">
        <CardTitle>{title}</CardTitle>
        <p className="text-xs md:text-sm text-muted-foreground">
          {description}
        </p>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <ClientOnly>
          <div className="h-[200px] md:h-[250px]">
            <ChartContainer config={createChartConfig()} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {valueKeys.map((key, index) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill={`var(--color-${key})`}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </ClientOnly>
      </CardContent>
    </Card>
  );
}
