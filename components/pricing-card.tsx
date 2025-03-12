import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonLink: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  popular = false,
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${popular ? "border-purple-500 shadow-lg" : ""}`}>
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2">
          <div className="bg-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full">Popular</div>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
          {price}
          <span className="ml-1 text-2xl font-medium text-muted-foreground">/month</span>
        </div>
      </CardHeader>
      <CardContent className="grid flex-1">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={buttonLink} className="w-full">
          <Button
            className={`w-full ${popular ? "bg-purple-500 hover:bg-purple-600" : ""}`}
            variant={popular ? "default" : "outline"}
          >
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

