"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"
import { IconPicker } from "@/components/icon-picker"
import { ColorPicker } from "@/components/color-picker"

interface AddCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (category: any) => void
  editingCategory?: any
}

export default function AddCategoryDialog({ open, onOpenChange, onSave, editingCategory }: AddCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [icon, setIcon] = useState("Home")
  const [color, setColor] = useState("blue")
  const [type, setType] = useState<"expense" | "income">("expense")

  // Reset form when dialog opens/closes or editing category changes
  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name)
      setIcon(editingCategory.icon)
      setColor(editingCategory.color)
      setType(editingCategory.type)
    } else {
      setName("")
      setIcon("Home")
      setColor("blue")
      setType("expense")
    }
  }, [open, editingCategory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!name.trim()) {
      alert("Please enter a category name")
      setIsSubmitting(false)
      return
    }

    // Create category object
    const category = {
      name: name.trim(),
      icon,
      color,
      type,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSave(category)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
          <DialogDescription>
            {editingCategory
              ? "Update this category to better organize your finances."
              : "Create a custom category to better organize your finances."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g. Pet Expenses, Hobbies, Side Hustle"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label>Category Type</Label>
              <RadioGroup
                defaultValue="expense"
                className="grid grid-cols-2 gap-4"
                value={type}
                onValueChange={(value) => setType(value as "expense" | "income")}
              >
                <div>
                  <RadioGroupItem value="expense" id="expense" className="peer sr-only" />
                  <Label
                    htmlFor="expense"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Expense
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="income" id="income" className="peer sr-only" />
                  <Label
                    htmlFor="income"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Income
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Icon</Label>
              <IconPicker selectedIcon={icon} onSelectIcon={setIcon} />
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
                  {editingCategory ? "Updating..." : "Creating..."}
                </>
              ) : editingCategory ? (
                "Update Category"
              ) : (
                "Create Category"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

