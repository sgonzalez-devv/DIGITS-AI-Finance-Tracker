"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, ChevronDown, ChevronUp, Receipt } from "lucide-react"
import { useState } from "react"

interface TransactionItemProps {
  transaction: {
    id: number
    description: string
    amount: number
    date: string
    category: string
    paymentMethod: string
    notes: string
    tags: string[]
    attachments: any[]
  }
  onEdit: () => void
  onDelete: () => void
  isSelectMode: boolean
  isSelected: boolean
  onToggleSelect: () => void
}

export default function TransactionItem({
  transaction,
  onEdit,
  onDelete,
  isSelectMode,
  isSelected,
  onToggleSelect,
}: TransactionItemProps) {
  const [expanded, setExpanded] = useState(false)

  const isIncome = transaction.amount > 0

  // Get category icon and color
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "Food & Groceries":
        return { color: "green", icon: "🍽️" }
      case "Transportation":
        return { color: "blue", icon: "🚗" }
      case "Housing":
        return { color: "amber", icon: "🏠" }
      case "Entertainment":
        return { color: "purple", icon: "🎬" }
      case "Utilities":
        return { color: "red", icon: "💡" }
      case "Health":
        return { color: "pink", icon: "⚕️" }
      case "Shopping":
        return { color: "indigo", icon: "🛍️" }
      case "Salary":
        return { color: "green", icon: "💼" }
      case "Freelance":
        return { color: "blue", icon: "💻" }
      default:
        return { color: "slate", icon: "📝" }
    }
  }

  const { color, icon } = getCategoryInfo(transaction.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card className={`overflow-hidden ${isSelected ? "border-primary" : ""}`}>
        <CardContent className="p-0">
          <div
            className={`flex items-center p-4 cursor-pointer ${expanded ? "border-b" : ""}`}
            onClick={() => !isSelectMode && setExpanded(!expanded)}
          >
            {isSelectMode ? (
              <div className="mr-4">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onToggleSelect()}
                  className={isSelected ? "bg-primary text-primary-foreground" : ""}
                />
              </div>
            ) : (
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400`}
              >
                <span className="text-lg">{icon}</span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium truncate">{transaction.description}</h3>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {format(new Date(transaction.date), "MMM d, yyyy")}
                </span>
                <span className="text-xs text-muted-foreground">• {transaction.paymentMethod}</span>
              </div>
            </div>

            <div className="flex flex-col items-end ml-4">
              <span className={`font-bold ${isIncome ? "text-green-600 dark:text-green-400" : ""}`}>
                {isIncome ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </span>
              <Badge variant="outline" className="mt-1">
                {transaction.category}
              </Badge>
            </div>

            <div className="ml-4">
              {!isSelectMode && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpanded(!expanded)
                  }}
                >
                  {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          {expanded && (
            <div className="p-4 bg-muted/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {transaction.notes && (
                    <div className="mb-3">
                      <div className="text-xs font-medium mb-1">Notes</div>
                      <div className="text-sm">{transaction.notes}</div>
                    </div>
                  )}

                  {transaction.tags.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-1">Tags</div>
                      <div className="flex flex-wrap gap-1">
                        {transaction.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between md:justify-end gap-2">
                  {transaction.attachments.length > 0 && (
                    <Button variant="outline" size="sm" className="mr-auto">
                      <Receipt className="h-4 w-4 mr-2" />
                      View Receipt
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit()
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete()
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

