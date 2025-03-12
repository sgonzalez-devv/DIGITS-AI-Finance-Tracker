"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface ColorPickerProps {
  selectedColor: string
  onSelectColor: (color: string) => void
}

export function ColorPicker({ selectedColor, onSelectColor }: ColorPickerProps) {
  const colors = [
    { name: "blue", bg: "bg-blue-500", hover: "hover:bg-blue-600" },
    { name: "green", bg: "bg-green-500", hover: "hover:bg-green-600" },
    { name: "red", bg: "bg-red-500", hover: "hover:bg-red-600" },
    { name: "amber", bg: "bg-amber-500", hover: "hover:bg-amber-600" },
    { name: "purple", bg: "bg-purple-500", hover: "hover:bg-purple-600" },
    { name: "pink", bg: "bg-pink-500", hover: "hover:bg-pink-600" },
    { name: "indigo", bg: "bg-indigo-500", hover: "hover:bg-indigo-600" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <Button
          key={color.name}
          type="button"
          variant="outline"
          className={`h-10 w-10 rounded-full p-0 ${color.bg} ${color.hover} border-2 ${
            selectedColor === color.name ? "border-white" : "border-transparent"
          }`}
          onClick={() => onSelectColor(color.name)}
        >
          {selectedColor === color.name && <Check className="h-5 w-5 text-white" />}
        </Button>
      ))}
    </div>
  )
}

