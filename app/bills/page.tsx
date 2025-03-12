"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import BillDialog from "@/components/bill-dialog";
import BillCard from "@/components/bill-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample bills data
const initialBills = [
  {
    id: 1,
    name: "Rent",
    amount: 1200,
    dueDate: new Date(2025, 3, 1), // April 1, 2025
    category: "Housing",
    recurrence: "monthly",
    paid: false,
    color: "red",
  },
  {
    id: 2,
    name: "Electricity",
    amount: 85,
    dueDate: new Date(2025, 3, 15), // April 15, 2025
    category: "Utilities",
    recurrence: "monthly",
    paid: false,
    color: "amber",
  },
  {
    id: 3,
    name: "Internet",
    amount: 65,
    dueDate: new Date(2025, 3, 10), // April 10, 2025
    category: "Utilities",
    recurrence: "monthly",
    paid: false,
    color: "blue",
  },
  {
    id: 4,
    name: "Car Insurance",
    amount: 120,
    dueDate: new Date(2025, 3, 22), // April 22, 2025
    category: "Insurance",
    recurrence: "monthly",
    paid: false,
    color: "green",
  },
  {
    id: 5,
    name: "Netflix",
    amount: 15.99,
    dueDate: new Date(2025, 3, 5), // April 5, 2025
    category: "Entertainment",
    recurrence: "monthly",
    paid: true,
    color: "purple",
  },
  {
    id: 6,
    name: "Gym Membership",
    amount: 50,
    dueDate: new Date(2025, 3, 8), // April 8, 2025
    category: "Health",
    recurrence: "monthly",
    paid: true,
    color: "pink",
  },
];

export default function BillsCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bills, setBills] = useState(initialBills);
  const [showAddBill, setShowAddBill] = useState(false);
  const [editingBill, setEditingBill] = useState<any>(null);
  const [filters, setFilters] = useState({
    paid: true,
    unpaid: true,
  });

  // Get days for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Navigate to previous/next month
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Filter bills based on current month and filters
  const filteredBills = bills.filter((bill) => {
    const isCurrentMonth = isSameMonth(bill.dueDate, currentMonth);
    const matchesPaidFilter =
      (bill.paid && filters.paid) || (!bill.paid && filters.unpaid);
    return isCurrentMonth && matchesPaidFilter;
  });

  // Group bills by day
  const billsByDay = monthDays.map((day) => {
    const dayBills = filteredBills.filter((bill) =>
      isSameDay(bill.dueDate, day)
    );
    return {
      date: day,
      bills: dayBills,
    };
  });

  // Handle adding a new bill
  const handleAddBill = (newBill: any) => {
    if (editingBill) {
      // Update existing bill
      setBills(
        bills.map((bill) =>
          bill.id === editingBill.id ? { ...newBill, id: bill.id } : bill
        )
      );
      setEditingBill(null);
    } else {
      // Add new bill
      const newId = Math.max(...bills.map((b) => b.id), 0) + 1;
      setBills([...bills, { ...newBill, id: newId, paid: false }]);
    }
    setShowAddBill(false);
  };

  // Handle editing a bill
  const handleEditBill = (bill: any) => {
    setEditingBill(bill);
    setShowAddBill(true);
  };

  // Handle deleting a bill
  const handleDeleteBill = (billId: number) => {
    setBills(bills.filter((bill) => bill.id !== billId));
  };

  // Handle marking a bill as paid/unpaid
  const handleTogglePaid = (billId: number) => {
    setBills(
      bills.map((bill) =>
        bill.id === billId ? { ...bill, paid: !bill.paid } : bill
      )
    );
  };

  // Calculate total due this month
  const totalDue = filteredBills
    .filter((bill) => !bill.paid)
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />

      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Bills Calendar
            </h1>
            <p className="text-muted-foreground">
              Track and manage your upcoming bills
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingBill(null);
              setShowAddBill(true);
            }}
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Bill
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Monthly Overview</CardTitle>
                  <CardDescription>
                    {format(currentMonth, "MMMM yyyy")}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuCheckboxItem
                        checked={filters.paid}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, paid: checked })
                        }
                      >
                        Show Paid Bills
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={filters.unpaid}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, unpaid: checked })
                        }
                      >
                        Show Unpaid Bills
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div key={day} className="py-1 font-medium">
                        {day}
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {/* Fill in empty cells for days before the start of the month */}
                  {Array.from({ length: monthStart.getDay() }).map(
                    (_, index) => (
                      <div
                        key={`empty-start-${index}`}
                        className="h-24 p-1 border rounded-md bg-muted/40"
                      />
                    )
                  )}

                  {/* Render days of the month */}
                  {billsByDay.map(({ date, bills }) => {
                    const isToday = isSameDay(date, new Date());

                    return (
                      <div
                        key={date.toString()}
                        className={`h-24 p-1 border rounded-md overflow-hidden ${
                          isToday ? "bg-primary/10 border-primary" : ""
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span
                            className={`text-sm font-medium ${
                              isToday ? "text-primary" : ""
                            }`}
                          >
                            {format(date, "d")}
                          </span>
                          {bills.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {bills.length}
                            </Badge>
                          )}
                        </div>

                        <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-20px)]">
                          {bills.map((bill) => (
                            <div
                              key={bill.id}
                              className={`text-xs p-1 rounded truncate cursor-pointer ${
                                bill.paid
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 line-through opacity-70"
                                  : `bg-${bill.color}-100 dark:bg-${bill.color}-900/30 text-${bill.color}-800 dark:text-${bill.color}-300`
                              }`}
                              onClick={() => handleEditBill(bill)}
                            >
                              {bill.name} - ${bill.amount}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Fill in empty cells for days after the end of the month */}
                  {Array.from({ length: 6 - monthEnd.getDay() }).map(
                    (_, index) => (
                      <div
                        key={`empty-end-${index}`}
                        className="h-24 p-1 border rounded-md bg-muted/40"
                      />
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bills</CardTitle>
                <CardDescription>
                  Bills due in {format(currentMonth, "MMMM")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="font-medium">Total Due:</span>
                    <span className="font-bold">${totalDue.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3 mt-4">
                    <AnimatePresence>
                      {filteredBills.length > 0 ? (
                        filteredBills
                          .sort(
                            (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
                          )
                          .map((bill) => (
                            <motion.div
                              key={bill.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <BillCard
                                bill={bill}
                                onEdit={() => handleEditBill(bill)}
                                onDelete={() => handleDeleteBill(bill.id)}
                                onTogglePaid={() => handleTogglePaid(bill.id)}
                              />
                            </motion.div>
                          ))
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          No bills found for this month
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Add</CardTitle>
                <CardDescription>Add a bill for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setEditingBill(null);
                    setShowAddBill(true);
                  }}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>Schedule a new bill</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <BillDialog
        open={showAddBill}
        onOpenChange={setShowAddBill}
        onSave={handleAddBill}
        editingBill={editingBill}
        currentMonth={currentMonth}
      />
    </div>
  );
}
