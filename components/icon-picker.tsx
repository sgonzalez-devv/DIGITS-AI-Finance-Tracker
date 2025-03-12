"use client"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  ShoppingBag,
  Car,
  Film,
  Heart,
  ShoppingCart,
  Briefcase,
  Laptop,
  TrendingUp,
  Utensils,
  Plane,
  Gift,
  Coffee,
  Smartphone,
  Wifi,
  Droplet,
  Zap,
  Gamepad,
  Book,
  Scissors,
  Shirt,
  Dumbbell,
  Pill,
  GraduationCap,
  Music,
  Palette,
  Bus,
  Train,
  Bike,
  DollarSign,
  CreditCard,
  Landmark,
  Building,
  HomeIcon,
  PawPrintIcon as Paw,
  Baby,
  Code,
  Globe,
  Headphones,
} from "lucide-react"

interface IconPickerProps {
  selectedIcon: string
  onSelectIcon: (icon: string) => void
}

export function IconPicker({ selectedIcon, onSelectIcon }: IconPickerProps) {
  const icons = [
    { name: "Home", component: <Home /> },
    { name: "ShoppingBag", component: <ShoppingBag /> },
    { name: "Car", component: <Car /> },
    { name: "Film", component: <Film /> },
    { name: "Heart", component: <Heart /> },
    { name: "ShoppingCart", component: <ShoppingCart /> },
    { name: "Briefcase", component: <Briefcase /> },
    { name: "Laptop", component: <Laptop /> },
    { name: "TrendingUp", component: <TrendingUp /> },
    { name: "Utensils", component: <Utensils /> },
    { name: "Plane", component: <Plane /> },
    { name: "Gift", component: <Gift /> },
    { name: "Coffee", component: <Coffee /> },
    { name: "Smartphone", component: <Smartphone /> },
    { name: "Wifi", component: <Wifi /> },
    { name: "Droplet", component: <Droplet /> },
    { name: "Zap", component: <Zap /> },
    { name: "Gamepad", component: <Gamepad /> },
    { name: "Book", component: <Book /> },
    { name: "Scissors", component: <Scissors /> },
    { name: "Shirt", component: <Shirt /> },
    { name: "Dumbbell", component: <Dumbbell /> },
    { name: "Pill", component: <Pill /> },
    { name: "GraduationCap", component: <GraduationCap /> },
    { name: "Music", component: <Music /> },
    { name: "Palette", component: <Palette /> },
    { name: "Bus", component: <Bus /> },
    { name: "Train", component: <Train /> },
    { name: "Bike", component: <Bike /> },
    { name: "DollarSign", component: <DollarSign /> },
    { name: "CreditCard", component: <CreditCard /> },
    { name: "Landmark", component: <Landmark /> },
    { name: "Building", component: <Building /> },
    { name: "HomeIcon", component: <HomeIcon /> },
    { name: "Paw", component: <Paw /> },
    { name: "Baby", component: <Baby /> },
    { name: "Code", component: <Code /> },
    { name: "Globe", component: <Globe /> },
    { name: "Headphones", component: <Headphones /> },
  ]

  return (
    <ScrollArea className="h-[200px] border rounded-md p-2">
      <div className="grid grid-cols-6 gap-2">
        {icons.map((icon) => (
          <Button
            key={icon.name}
            variant="outline"
            size="icon"
            className={`h-10 w-10 ${selectedIcon === icon.name ? "border-primary bg-primary/10" : ""}`}
            onClick={() => onSelectIcon(icon.name)}
          >
            <div className="h-5 w-5">{icon.component}</div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

