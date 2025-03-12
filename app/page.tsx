import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Brain, Sparkles, Trophy } from "lucide-react"
import HeroAnimation from "@/components/hero-animation"
import FeatureCard from "@/components/feature-card"
import PricingCard from "@/components/pricing-card"
import TestimonialCard from "@/components/testimonial-card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Digits
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Start 60-day trial</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400">
                    Track Your Finances. Feel The Rewards.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Digits uses AI to transform finance tracking from a chore into a rewarding experience with
                    gamification, celebrations, and smart insights.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="group">
                      Start 60-day trial
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <HeroAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why You'll Love Digits</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform combines AI insights with dopamine-boosting mechanics to make finance tracking enjoyable.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-purple-500" />}
                title="AI-Powered Insights"
                description="Get personalized financial recommendations and insights based on your spending patterns."
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-blue-500" />}
                title="Dopamine-Driven Tracking"
                description="Experience satisfying animations and celebrations when you reach financial milestones."
              />
              <FeatureCard
                icon={<Trophy className="h-10 w-10 text-amber-500" />}
                title="Gamified Goals"
                description="Turn saving money into a game with progress tracking, badges, and achievement rewards."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-green-500" />}
                title="Visual Analytics"
                description="See your financial progress with beautiful, interactive charts and visualizations."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start with a 60-day trial. No credit card required.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <PricingCard
                title="Basic Plan"
                price="$9.99"
                description="Perfect for individuals just starting their financial journey"
                features={[
                  "Manual expense tracking",
                  "Basic AI insights",
                  "Goal setting with visual progress",
                  "Monthly financial reports",
                  "Email support",
                ]}
                buttonText="Start 60-day trial"
                buttonLink="/signup?plan=basic"
                popular={false}
              />
              <PricingCard
                title="Pro Plan"
                price="$19.99"
                description="For those serious about financial growth and insights"
                features={[
                  "Everything in Basic",
                  "Advanced AI financial insights",
                  "Custom categories and tags",
                  "Priority support",
                  "Advanced gamification features",
                  "Unlimited goals and tracking",
                ]}
                buttonText="Start 60-day trial"
                buttonLink="/signup?plan=pro"
                popular={true}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have transformed their financial habits with Digits.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="Digits has completely changed how I view my finances. The gamification makes me excited to track my expenses!"
                author="Sarah J."
                role="Small Business Owner"
              />
              <TestimonialCard
                quote="The AI insights helped me save an extra $300 per month that I didn't realize was being wasted on subscriptions."
                author="Michael T."
                role="Software Engineer"
              />
              <TestimonialCard
                quote="I've tried many finance apps, but Digits is the only one I've stuck with. The dopamine hits from reaching goals are real!"
                author="Elena R."
                role="Marketing Director"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Finances?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start your 60-day trial today and experience the difference.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="group">
                    Start 60-day trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Digits. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

//TODO Page Isnt Responsive yet
//TODO Some Icons on the landing page are not centered
//TODO Create the Terms & Privacy Page
//TODO Fix the responsiveness of the chart on the dashboard
//TODO Create the Notifications Section on the header
//TODO Implement the Firebase Login
