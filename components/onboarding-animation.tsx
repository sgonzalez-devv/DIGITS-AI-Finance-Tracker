"use client"

import { motion } from "framer-motion"
import { Wallet, Target, BarChart3 } from "lucide-react"

interface OnboardingAnimationProps {
  step: number
}

export default function OnboardingAnimation({ step }: OnboardingAnimationProps) {
  return (
    <div className="relative w-full h-[300px]">
      {/* Step 1 Animation */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900">
                <Wallet className="h-12 w-12 text-purple-500" />
              </div>
            </motion.div>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold mb-2"
            >
              Track Your Finances
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground"
            >
              Start by telling us about your income and financial priorities
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Step 2 Animation */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900">
                <Target className="h-12 w-12 text-blue-500" />
              </div>
            </motion.div>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold mb-2"
            >
              Set Financial Goals
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground"
            >
              Define your financial goals and watch your progress
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Step 3 Animation */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="p-4 rounded-full bg-green-100 dark:bg-green-900">
                <BarChart3 className="h-12 w-12 text-green-500" />
              </div>
            </motion.div>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold mb-2"
            >
              Categorize Expenses
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground"
            >
              Track spending by category to gain insights into your habits
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Floating particles for visual interest */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          initial={{
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
            x: Math.random() * 300 - 150 + (Math.random() * 50 - 25),
            y: Math.random() * 300 - 150 + (Math.random() * 50 - 25),
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 2,
          }}
          style={{
            top: "50%",
            left: "50%",
            width: 4 + Math.random() * 8,
            height: 4 + Math.random() * 8,
            backgroundColor: ["#8b5cf6", "#3b82f6", "#10b981"][Math.floor(Math.random() * 3)],
          }}
        />
      ))}
    </div>
  )
}

