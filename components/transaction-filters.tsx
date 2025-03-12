"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TransactionFiltersProps {
  filters: {
    dateRange: { from: any; to: any }
    categories: string[]
    tags: string[]
    amountRange: { min: string; max: string }
    paymentMethods: string[]
  }
  setFilters: (filters: any) => void
  transactions: any[]
}

export default function TransactionFilters({ filters, setFilters, transactions }: TransactionFiltersProps) {
  // Extract unique categories, tags, and payment methods from transactions
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([])
  const [uniqueTags, setUniqueTags] = useState<string[]>([])
  const [uniquePaymentMethods, setUniquePaymentMethods] = useState<string[]>([])

  useEffect(() => {
    // Extract unique categories
    const categories = [...new Set(transactions.map((t) => t.category))]
    setUniqueCategories(categories)

    // Extract unique tags
    const allTags = transactions.flatMap((t) => t.tags)
    const tags = [...new Set(allTags)]
    setUniqueTags(tags)

    // Extract unique payment methods
    const paymentMethods = [...new Set(transactions.map((t) => t.paymentMethod))]
    setUniquePaymentMethods(paymentMethods)
  }, [transactions])

  // Handle date range selection
  const handleDateRangeChange = (range: any) => {
    setFilters({
      ...filters,
      dateRange: range,
    })
  }

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    })
  }

  // Handle tag selection
  const handleTagChange = (tag: string) => {
    setFilters({
      ...filters,
      tags: filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag],
    })
  }

  // Handle payment method selection
  const handlePaymentMethodChange = (method: string) => {
    setFilters({
      ...filters,
      paymentMethods: filters.paymentMethods.includes(method)
        ? filters.paymentMethods.filter((m) => m !== method)
        : [...filters.paymentMethods, method],
    })
  }

  // Handle amount range change
  const handleAmountRangeChange = (key: "min" | "max", value: string) => {
    setFilters({
      ...filters,
      amountRange: {
        ...filters.amountRange,
        [key]: value,
      },
    })
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      dateRange: { from: undefined, to: undefined },
      categories: [],
      tags: [],
      amountRange: { min: "", max: "" },
      paymentMethods: [],
    })
  }

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      filters.dateRange.from ||
      filters.dateRange.to ||
      filters.categories.length > 0 ||
      filters.tags.length > 0 ||
      filters.amountRange.min !== "" ||
      filters.amountRange.max !== "" ||
      filters.paymentMethods.length > 0
    )
  }

  return (
    <div className="p-4 border-t border-b">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Filters</h3>
        {hasActiveFilters() && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Filter */}
        <div className="space-y-2">
          <Label>Date Range</Label>
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !filters.dateRange.from && !filters.dateRange.to && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, "LLL dd, y")} - {format(filters.dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(filters.dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={filters.dateRange.from}
                  selected={filters.dateRange}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Amount Range Filter */}
        <div className="space-y-2">
          <Label>Amount Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                placeholder="Min"
                className="pl-8"
                type="number"
                value={filters.amountRange.min}
                onChange={(e) => handleAmountRangeChange("min", e.target.value)}
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                placeholder="Max"
                className="pl-8"
                type="number"
                value={filters.amountRange.max}
                onChange={(e) => handleAmountRangeChange("max", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="space-y-2">
          <Label>Categories</Label>
          <div className="h-24 overflow-y-auto border rounded-md p-2">
            {uniqueCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2 py-1">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods Filter */}
        <div className="space-y-2">
          <Label>Payment Methods</Label>
          <div className="h-24 overflow-y-auto border rounded-md p-2">
            {uniquePaymentMethods.map((method) => (
              <div key={method} className="flex items-center space-x-2 py-1">
                <Checkbox
                  id={`method-${method}`}
                  checked={filters.paymentMethods.includes(method)}
                  onCheckedChange={() => handlePaymentMethodChange(method)}
                />
                <label
                  htmlFor={`method-${method}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {method}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tags Filter */}
      {uniqueTags.length > 0 && (
        <div className="mt-4">
          <Label className="mb-2 block">Tags</Label>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className={cn("rounded-full", filters.tags.includes(tag) && "bg-primary text-primary-foreground")}
                onClick={() => handleTagChange(tag)}
              >
                {tag}
                {filters.tags.includes(tag) && <X className="ml-1 h-3 w-3" />}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

