"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import CategoryCard from "@/components/category-card";
import AddCategoryDialog from "@/components/add-category-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  type: "expense" | "income"; // Restrict the type to valid values
  isDefault: boolean;
}


// Sample categories data
const defaultCategories: Category[] = [
  {
    id: 1,
    name: "Housing",
    icon: "Home",
    color: "blue",
    type: "expense",
    isDefault: true,
  },
  {
    id: 2,
    name: "Food & Groceries",
    icon: "ShoppingBag",
    color: "green",
    type: "expense",
    isDefault: true,
  },
  {
    id: 3,
    name: "Transportation",
    icon: "Car",
    color: "amber",
    type: "expense",
    isDefault: true,
  },
  {
    id: 4,
    name: "Entertainment",
    icon: "Film",
    color: "purple",
    type: "expense",
    isDefault: true,
  },
  {
    id: 5,
    name: "Health",
    icon: "Heart",
    color: "red",
    type: "expense",
    isDefault: true,
  },
  {
    id: 6,
    name: "Shopping",
    icon: "ShoppingCart",
    color: "pink",
    type: "expense",
    isDefault: true,
  },
  {
    id: 7,
    name: "Salary",
    icon: "Briefcase",
    color: "green",
    type: "income",
    isDefault: true,
  },
  {
    id: 8,
    name: "Freelance",
    icon: "Laptop",
    color: "blue",
    type: "income",
    isDefault: true,
  },
  {
    id: 9,
    name: "Investments",
    icon: "TrendingUp",
    color: "purple",
    type: "income",
    isDefault: true,
  },
];

const customCategories: Category[] = [
  {
    id: 10,
    name: "Dog Expenses",
    icon: "Paw",
    color: "amber",
    type: "expense",
    isDefault: false,
  },
  {
    id: 11,
    name: "Side Project",
    icon: "Code",
    color: "indigo",
    type: "income",
    isDefault: false,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    ...defaultCategories,
    ...customCategories,
  ]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleAddCategory = (newCategory: Category) => {
    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...newCategory, id: cat.id } : cat
        )
      );
      setEditingCategory(null);
    } else {
      // Add new category
      const newId = Math.max(...categories.map((c) => c.id)) + 1;
      setCategories([
        ...categories,
        { ...newCategory, id: newId, isDefault: false },
      ]);
    }
    setShowAddCategory(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowAddCategory(true);
  };

  const handleDeleteCategory = (categoryId: number) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  // Filter categories based on search query and active tab
  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "expense" && category.type === "expense") ||
      (activeTab === "income" && category.type === "income") ||
      (activeTab === "custom" && !category.isDefault);

    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />

      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">
              Manage your expense and income categories
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingCategory(null);
              setShowAddCategory(true);
            }}
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-auto md:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* FIXME The same TabsContent Issue */}
              {/* <Tabs
                defaultValue="all"
                className="w-full md:w-auto"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid grid-cols-4 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="expense">Expense</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>
              </Tabs> */}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CategoryCard
                //FIXME
                  category={category}
                  onEdit={() => handleEditCategory(category)}
                  onDelete={
                    category.isDefault
                      ? undefined
                      : () => handleDeleteCategory(category.id)
                  }
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">
                No categories found. Try a different search or create a new
                category.
              </p>
            </div>
          )}
        </div>
      </main>

      <AddCategoryDialog
        open={showAddCategory}
        onOpenChange={setShowAddCategory}
        onSave={handleAddCategory}
        editingCategory={editingCategory}
      />
    </div>
  );
}
