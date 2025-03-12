"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface Transaction {
  category: string;
  amount: number;
}

interface TransactionCategoryBreakdownProps {
  transactions: Transaction[];
}


// Define chart configuration (modify as needed)
const chartConfig: ChartConfig = {
  type: { label: "Pie Chart" }, // Providing a label since it expects ReactNode
  legend: { label: "Show Legend" }, // Using an object instead of boolean
  tooltip: { label: "Enable Tooltip" }, // Using an object instead of boolean
  //FIXME
  //color: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#6366f1", "#14b8a6"], // Keeping this as it matches
};

export default function TransactionCategoryBreakdown({ transactions }: TransactionCategoryBreakdownProps) {
  // Filter only expense transactions
  const expenseTransactions = transactions.filter((t) => t.amount < 0);

  // Group by category and calculate totals
  const categoryTotals = expenseTransactions.reduce<Record<string, number>>((acc, transaction) => {
    const category = transaction.category;
    const amount = Math.abs(transaction.amount);

    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  // Convert to array and sort by value (highest first)
  const chartData = Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Calculate total expenses
  const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);

  // Colors for categories
  const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#6366f1", "#14b8a6"];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length && totalExpenses > 0) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1);

      return (
        <div className="bg-background p-2 border rounded-md shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">${data.value.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {chartData.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">No expense data available.</p>
      ) : (
        <>
          <div className="h-[200px]">
            <ChartContainer className="h-full" config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="space-y-2">
            {chartData.slice(0, 5).map((category, index) => {
              const percentage = totalExpenses > 0 ? ((category.value / totalExpenses) * 100).toFixed(1) : "0.0";

              return (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    ${category.value.toFixed(2)} ({percentage}%)
                  </div>
                </div>
              );
            })}

            {chartData.length > 5 && (
              <div className="text-xs text-center text-muted-foreground mt-2">
                + {chartData.length - 5} more categories
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
