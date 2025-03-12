"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ColorPicker } from "@/components/color-picker"

interface BillDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (bill: any) => void
  editingBill?: any
  currentMonth: Date
}

export default function BillDialog({ open, onOpenChange, onSave, editingBill, currentMonth }: BillDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [category, setCategory] = useState("")
  const [recurrence, setRecurrence] = useState("monthly")
  const [color, setColor] = useState("blue")

  // Reset form when dialog opens/closes or editing bill changes
  useEffect(() => {
    if (editingBill) {
      setName(editingBill.name)
      setAmount(editingBill.amount.toString())
      setDueDate(new Date(editingBill.dueDate))
      setCategory(editingBill.category)
      setRecurrence(editingBill.recurrence)
      setColor(editingBill.color)
    } else {
      setName("")
      setAmount("")
      setDueDate(currentMonth)
      setCategory("")
      setRecurrence("monthly")
      setColor("blue")
    }
  }, [open, editingBill, currentMonth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!name.trim() || !amount || !dueDate || !category) {
      alert("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    // Create bill object
    const bill = {
      name: name.trim(),
      amount: Number.parseFloat(amount),
      dueDate,
      category,
      recurrence,
      color,
      paid: editingBill?.paid || false,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSave(bill)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingBill ? "Edit Bill" : "Add New Bill"}</DialogTitle>
          <DialogDescription>
            {editingBill ? "Update the details of your bill." : "Add a new bill to your calendar."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Bill Name</Label>
              <Input
                id="name"
                placeholder="e.g. Rent, Electricity, Netflix"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  className="pl-8"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                    disabled={isSubmitting}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Subscriptions">Subscriptions</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recurrence">Recurrence</Label>
              <Select value={recurrence} onValueChange={setRecurrence} disabled={isSubmitting}>
                <SelectTrigger id="recurrence">
                  <SelectValue placeholder="Select recurrence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <ColorPicker selectedColor={color} onSelectColor={setColor} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingBill ? "Updating..." : "Creating..."}
                </>
              ) : editingBill ? (
                "Update Bill"
              ) : (
                "Add Bill"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

