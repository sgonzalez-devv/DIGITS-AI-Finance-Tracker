import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Coffee, Home, ShoppingBag, Car } from "lucide-react"

// Sample transaction data
const transactions = [
  {
    id: 1,
    description: "Rent Payment",
    amount: -1200,
    date: "2025-04-01",
    category: "Housing",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 3200,
    date: "2025-04-01",
    category: "Income",
    icon: <ArrowUpRight className="h-4 w-4" />,
  },
  {
    id: 3,
    description: "Grocery Store",
    amount: -85.45,
    date: "2025-04-02",
    category: "Food",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    id: 4,
    description: "Coffee Shop",
    amount: -4.5,
    date: "2025-04-03",
    category: "Food",
    icon: <Coffee className="h-4 w-4" />,
  },
  {
    id: 5,
    description: "Gas Station",
    amount: -45.0,
    date: "2025-04-03",
    category: "Transportation",
    icon: <Car className="h-4 w-4" />,
  },
]

export default function TransactionList() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <Avatar className={`h-9 w-9 ${transaction.amount > 0 ? "bg-green-100" : "bg-slate-100"}`}>
              <AvatarFallback className={transaction.amount > 0 ? "text-green-500" : "text-slate-500"}>
                {transaction.icon}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{transaction.description}</div>
              <div className="text-xs text-muted-foreground">{transaction.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {transaction.category}
            </Badge>
            <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : ""}`}>
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

