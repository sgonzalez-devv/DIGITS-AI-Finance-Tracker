"use client"

import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, RefreshCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface BillCardProps {
  bill: {
    id: number
    name: string
    amount: number
    dueDate: Date
    category: string
    recurrence: string
    paid: boolean
    color: string
  }
  onEdit: () => void
  onDelete: () => void
  onTogglePaid: () => void
}

export default function BillCard({ bill, onEdit, onDelete, onTogglePaid }: BillCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  }

  const recurrenceText = {
    "one-time": "One-time",
    weekly: "Weekly",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  }

  const daysUntilDue = Math.ceil((bill.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const isPastDue = daysUntilDue < 0 && !bill.paid

  return (
    <Card className={`overflow-hidden ${bill.paid ? "opacity-70" : ""}`}>
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="mr-4">
            <Checkbox
              checked={bill.paid}
              onCheckedChange={() => onTogglePaid()}
              className={bill.paid ? "bg-green-500 text-primary-foreground" : ""}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium truncate ${bill.paid ? "line-through" : ""}`}>{bill.name}</h3>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold">${bill.amount.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">• Due {format(bill.dueDate, "MMM d")}</span>
              {isPastDue && <span className="text-xs text-red-500 font-medium">• Past due</span>}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`text-xs px-2 py-0.5 rounded-full ${colorClasses[bill.color as keyof typeof colorClasses] || colorClasses.blue}`}
              >
                {bill.category}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <RefreshCw className="h-3 w-3 mr-1" />
                {recurrenceText[bill.recurrence as keyof typeof recurrenceText]}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onTogglePaid}>
                <Checkbox checked={bill.paid} className="mr-2 h-4 w-4" />
                Mark as {bill.paid ? "unpaid" : "paid"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDelete}
                className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

