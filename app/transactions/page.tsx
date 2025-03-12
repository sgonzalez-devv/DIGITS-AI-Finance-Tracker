"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Upload,
  Sparkles,
  TrendingUp,
  Calendar,
  Tag,
  Trophy,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import AddTransactionDialog from "@/components/add-transaction-dialog";
import TransactionItem from "@/components/transaction-item";
import TransactionChart from "@/components/transaction-chart";
import TransactionInsight from "@/components/transaction-insight";
import TransactionCategoryBreakdown from "@/components/transaction-category-breakdown";
import TransactionFilters from "@/components/transaction-filters";
import { useToast } from "@/components/ui/use-toast";

// Sample transaction data
const initialTransactions = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: -120.45,
    date: "2025-04-15",
    category: "Food & Groceries",
    paymentMethod: "Credit Card",
    notes: "Weekly grocery run",
    tags: ["essentials"],
    attachments: [],
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 3200.0,
    date: "2025-04-01",
    category: "Salary",
    paymentMethod: "Direct Deposit",
    notes: "Monthly salary",
    tags: ["income"],
    attachments: [],
  },
  {
    id: 3,
    description: "Electricity Bill",
    amount: -85.2,
    date: "2025-04-10",
    category: "Utilities",
    paymentMethod: "Bank Transfer",
    notes: "April electricity",
    tags: ["bills", "home"],
    attachments: [],
  },
  {
    id: 4,
    description: "Coffee Shop",
    amount: -4.5,
    date: "2025-04-16",
    category: "Food & Groceries",
    paymentMethod: "Debit Card",
    notes: "Morning coffee",
    tags: ["coffee"],
    attachments: [],
  },
  {
    id: 5,
    description: "Freelance Payment",
    amount: 450.0,
    date: "2025-04-12",
    category: "Freelance",
    paymentMethod: "PayPal",
    notes: "Website design project",
    tags: ["income", "side-hustle"],
    attachments: [],
  },
  {
    id: 6,
    description: "Gas Station",
    amount: -48.75,
    date: "2025-04-14",
    category: "Transportation",
    paymentMethod: "Credit Card",
    notes: "Filled up the tank",
    tags: ["car"],
    attachments: [],
  },
  {
    id: 7,
    description: "Movie Tickets",
    amount: -24.0,
    date: "2025-04-13",
    category: "Entertainment",
    paymentMethod: "Debit Card",
    notes: "Weekend movie",
    tags: ["entertainment", "weekend"],
    attachments: [],
  },
  {
    id: 8,
    description: "Gym Membership",
    amount: -50.0,
    date: "2025-04-05",
    category: "Health",
    paymentMethod: "Credit Card",
    notes: "Monthly membership",
    tags: ["health", "subscription"],
    attachments: [],
  },
  {
    id: 9,
    description: "Online Shopping",
    amount: -78.35,
    date: "2025-04-11",
    category: "Shopping",
    paymentMethod: "Credit Card",
    notes: "New headphones",
    tags: ["electronics"],
    attachments: [],
  },
  {
    id: 10,
    description: "Restaurant Dinner",
    amount: -65.8,
    date: "2025-04-09",
    category: "Food & Groceries",
    paymentMethod: "Credit Card",
    notes: "Dinner with friends",
    tags: ["dining", "social"],
    attachments: [],
  },
  {
    id: 11,
    description: "Mobile Phone Bill",
    amount: -45.0,
    date: "2025-04-08",
    category: "Utilities",
    paymentMethod: "Bank Transfer",
    notes: "Monthly phone bill",
    tags: ["bills", "subscription"],
    attachments: [],
  },
  {
    id: 12,
    description: "Book Purchase",
    amount: -18.99,
    date: "2025-04-07",
    category: "Entertainment",
    paymentMethod: "Debit Card",
    notes: "New novel",
    tags: ["books", "personal"],
    attachments: [],
  },
  {
    id: 13,
    description: "Internet Bill",
    amount: -65.0,
    date: "2025-04-06",
    category: "Utilities",
    paymentMethod: "Bank Transfer",
    notes: "Monthly internet",
    tags: ["bills", "home"],
    attachments: [],
  },
  {
    id: 14,
    description: "Ride Share",
    amount: -22.5,
    date: "2025-04-04",
    category: "Transportation",
    paymentMethod: "Debit Card",
    notes: "Trip downtown",
    tags: ["travel", "transportation"],
    attachments: [],
  },
  {
    id: 15,
    description: "Coffee Shop",
    amount: -5.25,
    date: "2025-04-03",
    category: "Food & Groceries",
    paymentMethod: "Debit Card",
    notes: "Afternoon coffee",
    tags: ["coffee"],
    attachments: [],
  },
];

export default function TransactionsPage() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    dateRange: { from: string | undefined; to: string | undefined };
    categories: string[]; // Explicitly define categories as an array of strings
    tags: string[]; // Explicitly define tags as an array of strings
    amountRange: { min: string; max: string };
    paymentMethods: string[]; // Explicitly define paymentMethods as an array of strings
  }>({
    dateRange: { from: undefined, to: undefined },
    categories: [], // Define as empty string array instead of never[]
    tags: [],
    amountRange: { min: "", max: "" },
    paymentMethods: [], // Define as empty string array instead of never[]
  });

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>(
    []
  );
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [streakCount, setStreakCount] = useState(5);
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  // Filter transactions based on search, tab, and filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Search filter
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "income" && transaction.amount > 0) ||
      (activeTab === "expense" && transaction.amount < 0);

    // Date range filter
    const matchesDateRange =
      (!filters.dateRange.from ||
        new Date(transaction.date) >= new Date(filters.dateRange.from)) &&
      (!filters.dateRange.to ||
        new Date(transaction.date) <= new Date(filters.dateRange.to));

    // Category Filter
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(transaction.category);

    // Tags Filter
    const matchesTags =
      filters.tags.length === 0 ||
      transaction.tags.some((tag) => filters.tags.includes(tag));

    // Amount range filter
    const matchesAmountRange =
      (filters.amountRange.min === "" ||
        Math.abs(transaction.amount) >=
          Number.parseFloat(filters.amountRange.min)) &&
      (filters.amountRange.max === "" ||
        Math.abs(transaction.amount) <=
          Number.parseFloat(filters.amountRange.max));

    // Payment method filter
    const matchesPaymentMethod =
      filters.paymentMethods.length === 0 ||
      filters.paymentMethods.includes(transaction.paymentMethod);

    return (
      matchesSearch &&
      matchesTab &&
      matchesDateRange &&
      matchesCategory &&
      matchesTags &&
      matchesAmountRange &&
      matchesPaymentMethod
    );
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortConfig.key === "date") {
      return sortConfig.direction === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortConfig.key === "amount") {
      return sortConfig.direction === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    } else if (sortConfig.key === "description") {
      return sortConfig.direction === "asc"
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description);
    }
    return 0;
  });

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Handle adding a new transaction
  const handleAddTransaction = (newTransaction: any) => {
    if (editingTransaction) {
      // Update existing transaction
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === editingTransaction.id
            ? { ...newTransaction, id: transaction.id }
            : transaction
        )
      );
      setEditingTransaction(null);

      toast({
        title: "Transaction updated",
        description: "Your transaction has been successfully updated.",
      });
    } else {
      // Add new transaction
      const newId = Math.max(...transactions.map((t) => t.id), 0) + 1;
      const transactionWithId = { ...newTransaction, id: newId };
      setTransactions([transactionWithId, ...transactions]);

      // Show confetti animation for streak
      if (Math.random() > 0.5) {
        setStreakCount((prev) => prev + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);

        toast({
          title: "Transaction streak!",
          description: `You've logged ${
            streakCount + 1
          } transactions in a row. Keep it up!`,
        });
      } else {
        toast({
          title: "Transaction added",
          description: "Your transaction has been successfully recorded.",
        });
      }
    }
    setShowAddTransaction(false);
  };

  // Handle editing a transaction
  const handleEditTransaction = (transaction: any) => {
    setEditingTransaction(transaction);
    setShowAddTransaction(true);
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = (transactionId: number) => {
    setTransactions(transactions.filter((t) => t.id !== transactionId));
    toast({
      title: "Transaction deleted",
      description: "Your transaction has been successfully deleted.",
    });
  };

  // Handle bulk actions
  const handleBulkDelete = () => {
    setTransactions(
      transactions.filter((t) => !selectedTransactions.includes(t.id))
    );
    setSelectedTransactions([]);
    setIsSelectMode(false);
    toast({
      title: "Transactions deleted",
      description: `${selectedTransactions.length} transactions have been deleted.`,
    });
  };

  const handleBulkCategorize = (category: string) => {
    setTransactions(
      transactions.map((t) =>
        selectedTransactions.includes(t.id) ? { ...t, category } : t
      )
    );
    setSelectedTransactions([]);
    setIsSelectMode(false);
    toast({
      title: "Transactions categorized",
      description: `${selectedTransactions.length} transactions have been categorized as ${category}.`,
    });
  };

  // Toggle select mode
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedTransactions([]);
  };

  // Toggle transaction selection
  const toggleTransactionSelection = (id: number) => {
    setSelectedTransactions((prev) =>
      prev.includes(id)
        ? prev.filter((transactionId) => transactionId !== id)
        : [...prev, id]
    );
  };

  // Export transactions as CSV
  const exportTransactions = () => {
    const transactionsToExport =
      selectedTransactions.length > 0
        ? transactions.filter((t) => selectedTransactions.includes(t.id))
        : filteredTransactions;

    const headers = [
      "Date",
      "Description",
      "Category",
      "Amount",
      "Payment Method",
      "Notes",
      "Tags",
    ];
    const csvContent = [
      headers.join(","),
      ...transactionsToExport.map((t) =>
        [
          t.date,
          `"${t.description}"`,
          `"${t.category}"`,
          t.amount,
          `"${t.paymentMethod}"`,
          `"${t.notes}"`,
          `"${t.tags.join(", ")}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export complete",
      description: `${transactionsToExport.length} transactions have been exported to CSV.`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: window.innerHeight + 20,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: "easeOut",
              }}
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                backgroundColor: [
                  "#8b5cf6",
                  "#3b82f6",
                  "#10b981",
                  "#f59e0b",
                  "#ef4444",
                ][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">
              Track, categorize, and analyze your financial activities
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSelectMode}
              className={
                isSelectMode ? "bg-primary text-primary-foreground" : ""
              }
            >
              {isSelectMode ? "Cancel Selection" : "Select Multiple"}
            </Button>
            <Button onClick={() => setShowAddTransaction(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card
            className={`bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                ${totalIncome.toFixed(2)}
              </div>
              <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
                From {transactions.filter((t) => t.amount > 0).length} income
                transactions
              </p>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-800`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-800 dark:text-red-300">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700 dark:text-red-400">
                ${totalExpenses.toFixed(2)}
              </div>
              <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1">
                From {transactions.filter((t) => t.amount < 0).length} expense
                transactions
              </p>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Net Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                ${balance.toFixed(2)}
              </div>
              <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
                From {transactions.length} total transactions
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="space-y-1">
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      View and manage your financial activities
                    </CardDescription>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className={showFilters ? "bg-primary/10" : ""}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSort("date")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Date
                      {sortConfig.key === "date" && (
                        <ArrowUpDown
                          className={`h-3 w-3 ml-1 ${
                            sortConfig.direction === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSort("amount")}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Amount
                      {sortConfig.key === "amount" && (
                        <ArrowUpDown
                          className={`h-3 w-3 ml-1 ${
                            sortConfig.direction === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportTransactions}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    defaultValue="all"
                    className="w-full md:w-auto"
                  >
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="income">Income</TabsTrigger>
                      <TabsTrigger value="expense">Expenses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                      <TransactionChart transactions={transactions} />
                    </TabsContent>

                    <TabsContent value="income">
                      <p>Showing only income transactions.</p>
                    </TabsContent>

                    <TabsContent value="expense">
                      <p>Showing only expense transactions.</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardHeader>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <TransactionFilters
                      filters={filters}
                      setFilters={setFilters}
                      transactions={transactions}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <CardContent>
                {isSelectMode && selectedTransactions.length > 0 && (
                  <div className="flex items-center justify-between bg-primary/10 p-3 rounded-md mb-4">
                    <div className="text-sm">
                      <span className="font-medium">
                        {selectedTransactions.length}
                      </span>{" "}
                      transactions selected
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBulkDelete}
                      >
                        Delete Selected
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkCategorize("Food & Groceries")}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        Categorize
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {sortedTransactions.length > 0 ? (
                    sortedTransactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        onEdit={() => handleEditTransaction(transaction)}
                        onDelete={() => handleDeleteTransaction(transaction.id)}
                        isSelectMode={isSelectMode}
                        isSelected={selectedTransactions.includes(
                          transaction.id
                        )}
                        onToggleSelect={() =>
                          toggleTransactionSelection(transaction.id)
                        }
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">
                        No transactions found
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        Try adjusting your search or filters to find what you're
                        looking for.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveTab("all");
                          setFilters({
                            dateRange: { from: undefined, to: undefined },
                            categories: [],
                            tags: [],
                            amountRange: { min: "", max: "" },
                            paymentMethods: [],
                          });
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Trends</CardTitle>
                <CardDescription>
                  Visualize your income and expenses over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionChart transactions={transactions} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Add</CardTitle>
                <CardDescription>
                  Quickly add common transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setEditingTransaction({
                      description: "Grocery Shopping",
                      amount: -50,
                      date: new Date().toISOString().split("T")[0],
                      category: "Food & Groceries",
                      paymentMethod: "Credit Card",
                      notes: "",
                      tags: ["essentials"],
                      attachments: [],
                    });
                    setShowAddTransaction(true);
                  }}
                >
                  <ShoppingBagIcon className="mr-2 h-4 w-4 text-green-500" />
                  <span>Grocery Shopping</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setEditingTransaction({
                      description: "Restaurant",
                      amount: -30,
                      date: new Date().toISOString().split("T")[0],
                      category: "Food & Groceries",
                      paymentMethod: "Credit Card",
                      notes: "",
                      tags: ["dining"],
                      attachments: [],
                    });
                    setShowAddTransaction(true);
                  }}
                >
                  <UtensilsIcon className="mr-2 h-4 w-4 text-amber-500" />
                  <span>Restaurant</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setEditingTransaction({
                      description: "Transportation",
                      amount: -20,
                      date: new Date().toISOString().split("T")[0],
                      category: "Transportation",
                      paymentMethod: "Debit Card",
                      notes: "",
                      tags: ["travel"],
                      attachments: [],
                    });
                    setShowAddTransaction(true);
                  }}
                >
                  <CarIcon className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Transportation</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setEditingTransaction({
                      description: "Income",
                      amount: 100,
                      date: new Date().toISOString().split("T")[0],
                      category: "Other Income",
                      paymentMethod: "Bank Transfer",
                      notes: "",
                      tags: ["income"],
                      attachments: [],
                    });
                    setShowAddTransaction(true);
                  }}
                >
                  <Upload className="mr-2 h-4 w-4 text-green-500" />
                  <span>Income</span>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
                  AI Insights
                </CardTitle>
                <CardDescription>
                  Smart analysis of your spending patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TransactionInsight
                  icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
                  title="Spending Pattern"
                  description="Your food expenses have increased by 15% compared to last month. Consider setting a budget for dining out."
                  color="blue"
                />

                <TransactionInsight
                  icon={<Calendar className="h-5 w-5 text-purple-500" />}
                  title="Recurring Expenses"
                  description="You have 5 subscription services totaling $65.99 monthly. Review them to identify potential savings."
                  color="purple"
                />

                <TransactionInsight
                  icon={<Tag className="h-5 w-5 text-amber-500" />}
                  title="Category Insight"
                  description="Transportation costs are lower than usual this month. Great job optimizing your travel expenses!"
                  color="amber"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>
                  How your spending is distributed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionCategoryBreakdown transactions={transactions} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Streak</CardTitle>
                <CardDescription>
                  Keep tracking your finances consistently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Current streak
                    </div>
                    <div className="text-2xl font-bold">{streakCount} days</div>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {streakCount}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <div className="text-sm font-medium">Streak progress</div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: `${(streakCount / 10) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div>0 days</div>
                    <div>10 days</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Trophy className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">
                        Next milestone: 10 days
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Keep your streak going for {10 - streakCount} more days
                        to earn the "Finance Tracker" badge and 50 points!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AddTransactionDialog
        open={showAddTransaction}
        onOpenChange={setShowAddTransaction}
        onSave={handleAddTransaction}
        editingTransaction={editingTransaction}
      />
    </div>
  );
}

// Helper icons for quick add buttons
function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function UtensilsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  );
}
