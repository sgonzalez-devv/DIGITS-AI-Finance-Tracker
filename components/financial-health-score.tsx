"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FinancialHealthScoreProps {
  score: number
}

export default function FinancialHealthScore({ score }: FinancialHealthScoreProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Calculate score color
  const getScoreColor = () => {
    if (score >= 80) return "#10b981" // green
    if (score >= 60) return "#3b82f6" // blue
    if (score >= 40) return "#f59e0b" // amber
    return "#ef4444" // red
  }

  // Calculate score label
  const getScoreLabel = () => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D floating elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-md"
            initial={{
              x: Math.random() * 100 - 50 + 50,
              y: Math.random() * 100 - 50 + 50,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              x: Math.random() * 100 - 50 + 50,
              y: Math.random() * 100 - 50 + 50,
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              width: 20 + Math.random() * 60,
              height: 20 + Math.random() * 60,
            }}
          />
        ))}
      </div>

      {/* Main score circle */}
      <div className="relative z-10">
        <svg width="280" height="280" viewBox="0 0 280 280">
          {/* Background circle */}
          <circle cx="140" cy="140" r="120" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="20" />

          {/* Score progress */}
          <motion.circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke={getScoreColor()}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - score / 100)}
            initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - score / 100) }}
            transition={{ duration: 2, ease: "easeOut" }}
            transform="rotate(-90 140 140)"
          />

          {/* Glowing effect */}
          <motion.circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke={getScoreColor()}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - score / 100)}
            initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - score / 100) }}
            transition={{ duration: 2, ease: "easeOut" }}
            transform="rotate(-90 140 140)"
            filter="blur(8px)"
            opacity="0.6"
          />

          {/* Score text */}
          <g>
            <text x="140" y="130" textAnchor="middle" fontSize="64" fontWeight="bold" fill="white">
              {score}
            </text>
            <text x="140" y="170" textAnchor="middle" fontSize="20" fill="rgba(255, 255, 255, 0.8)">
              {getScoreLabel()}
            </text>
          </g>
        </svg>

        {/* Score indicators */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[0, 25, 50, 75].map((position) => {
            const angle = (position / 100) * 360 - 90
            const x = 140 + 140 * Math.cos((angle * Math.PI) / 180)
            const y = 140 + 140 * Math.sin((angle * Math.PI) / 180)

            return (
              <div
                key={position}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Score details */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md rounded-lg p-4 mx-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-blue-200">Debt</div>
            <div className="font-bold">Good</div>
          </div>
          <div>
            <div className="text-xs text-blue-200">Savings</div>
            <div className="font-bold">Fair</div>
          </div>
          <div>
            <div className="text-xs text-blue-200">Spending</div>
            <div className="font-bold">Excellent</div>
          </div>
        </div>
      </div>
    </div>
  )
}

