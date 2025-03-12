"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import OnboardingAnimation from "@/components/onboarding-animation";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Personal Info
  const [income, setIncome] = useState("");

  // Step 2: Financial Goals
  const [selectedGoal, setSelectedGoal] = useState("save");
  const [goalAmount, setGoalAmount] = useState("");

  // Step 3: Expense Categories
  const [selectedCategories, setSelectedCategories] = useState([
    "housing",
    "food",
    "transportation",
    "entertainment",
  ]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);

    // Simulate saving user preferences
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to complete onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Digits
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Let's set up your account
          </CardTitle>
          <CardDescription className="text-center">
            Complete these steps to get started with Digits
          </CardDescription>
          <Progress value={(step / 3) * 100} className="w-full mt-4" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Tell us about yourself
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="income">Monthly Income</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="income"
                        type="number"
                        className="pl-8"
                        placeholder="0.00"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>What are your primary financial concerns?</Label>
                    {/* FIXME The same TabsContent Issue */}
                    {/* <Tabs defaultValue="saving" className="w-full">
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="saving">Saving</TabsTrigger>
                        <TabsTrigger value="investing">Investing</TabsTrigger>
                        <TabsTrigger value="budgeting">Budgeting</TabsTrigger>
                      </TabsList>
                    </Tabs> */}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Set your first financial goal
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="goal-type">Goal Type</Label>
                    <Select
                      value={selectedGoal}
                      onValueChange={setSelectedGoal}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a goal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="save">Save money</SelectItem>
                        <SelectItem value="debt">Pay off debt</SelectItem>
                        <SelectItem value="invest">Start investing</SelectItem>
                        <SelectItem value="emergency">
                          Build emergency fund
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal-amount">Target Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="goal-amount"
                        type="number"
                        className="pl-8"
                        placeholder="0.00"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Select expense categories to track
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose the categories that are most relevant to your
                    spending habits.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "housing", label: "Housing" },
                      { id: "food", label: "Food & Groceries" },
                      { id: "transportation", label: "Transportation" },
                      { id: "entertainment", label: "Entertainment" },
                      { id: "shopping", label: "Shopping" },
                      { id: "health", label: "Health & Fitness" },
                      { id: "travel", label: "Travel" },
                      { id: "education", label: "Education" },
                    ].map((category) => (
                      <Button
                        key={category.id}
                        type="button"
                        variant={
                          selectedCategories.includes(category.id)
                            ? "default"
                            : "outline"
                        }
                        className="justify-start"
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center justify-center">
              <OnboardingAnimation step={step} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1 || isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Completing...
              </>
            ) : (
              <>
                {step === 3 ? "Complete Setup" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
