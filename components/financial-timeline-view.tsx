"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";

export default function FinancialTimelineView() {
  // Sample timeline events
  const timelineEvents = [
    {
      id: 1,
      date: new Date(),
      type: "income",
      title: "Salary Deposit",
      amount: 3200,
      description: "Monthly salary payment received",
    },
    {
      id: 2,
      date: addDays(new Date(), 3),
      type: "bill",
      title: "Rent Payment Due",
      amount: -1200,
      description: "Monthly apartment rent",
    },
    {
      id: 3,
      date: addDays(new Date(), 5),
      type: "subscription",
      title: "Streaming Services",
      amount: -45.97,
      description: "Netflix, Hulu, Disney+",
    },
    {
      id: 4,
      date: addDays(new Date(), 10),
      type: "bill",
      title: "Electricity Bill Due",
      amount: -85,
      description: "Monthly electricity payment",
    },
    {
      id: 5,
      date: addDays(new Date(), 15),
      type: "goal",
      title: "Vacation Fund Goal",
      amount: 500,
      description: "Target date for vacation fund milestone",
    },
  ];

  // Sort events by date
  const sortedEvents = [...timelineEvents].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  // Get badge color based on event type
  const getBadgeForType = (type: string) => {
    switch (type) {
      case "income":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Income</Badge>
        );
      case "bill":
        return <Badge className="bg-red-500 hover:bg-red-600">Bill</Badge>;
      case "subscription":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">Subscription</Badge>
        );
      case "goal":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">Goal</Badge>
        );
      default:
        return <Badge>Event</Badge>;
    }
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Financial Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 relative">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative flex items-start gap-4">
              {/* Date bubble */}
              <div className="flex-shrink-0">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-3 text-center w-[70px]">
                  <div className="text-xs">{format(event.date, "MMM")}</div>
                  <div className="text-lg font-bold">
                    {format(event.date, "dd")}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-card rounded-lg border p-3 flex-1 ml-2">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="font-bold text-base">{event.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {event.description}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`font-bold text-sm ${
                        event.amount > 0
                          ? "text-green-600 dark:text-green-400"
                          : event.type === "goal"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {event.amount > 0 ? "+" : ""}
                      {event.type === "goal" ? "Target: " : ""}$
                      {Math.abs(event.amount)}
                    </span>
                    {getBadgeForType(event.type)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
