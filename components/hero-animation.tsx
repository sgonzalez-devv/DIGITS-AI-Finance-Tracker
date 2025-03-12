"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ArrowUpCircle, TrendingUp, Wallet } from "lucide-react"

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full max-w-[500px] h-[400px]">
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Main dashboard card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]"
      >
        <Card className="p-4 shadow-xl bg-white dark:bg-slate-800">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Financial Overview</h3>
              <span className="text-xs text-muted-foreground">April 2025</span>
            </div>
            <div className="h-[120px] bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center">
              <TrendingUp className="h-12 w-12 text-green-500 opacity-50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Savings</div>
                <div className="font-semibold">$2,450</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Expenses</div>
                <div className="font-semibold">$1,890</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        initial={{ x: -80, y: -100, opacity: 0 }}
        animate={{ x: -60, y: -80, opacity: 1 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 2,
        }}
        className="absolute top-1/2 left-1/2"
      >
        <Card className="p-3 bg-purple-500 text-white shadow-lg">
          <div className="flex items-center gap-2">
            <ArrowUpCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Goal reached!</span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ x: 80, y: 100, opacity: 0 }}
        animate={{ x: 60, y: 80, opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 3,
        }}
        className="absolute top-1/2 left-1/2"
      >
        <Card className="p-3 bg-blue-500 text-white shadow-lg">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span className="text-sm font-medium">+500 points</span>
          </div>
        </Card>
      </motion.div>

      {/* Particles/confetti effect */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.random() * 400 - 200 + (Math.random() * 100 - 50),
            y: Math.random() * 400 - 200 + (Math.random() * 100 - 50),
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: 1 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3,
          }}
          style={{
            top: "50%",
            left: "50%",
            width: 5 + Math.random() * 10,
            height: 5 + Math.random() * 10,
            backgroundColor: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"][Math.floor(Math.random() * 4)],
          }}
        />
      ))}
    </div>
  )
}

