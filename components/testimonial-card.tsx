import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export default function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="pt-6 flex-1">
        <QuoteIcon className="h-8 w-8 text-purple-500 mb-2 opacity-50" />
        <p className="text-muted-foreground">{quote}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

