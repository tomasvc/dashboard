"use client"

import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/components/utils/cn"

export interface MetricDataPoint {
  label: string
  value: number
}

interface MetricChartProps {
  /** Title shown in the card header */
  title: string
  /** The value to highlight (e.g. latest revenue) */
  currentValue: number | string
  /** Percentage change vs. previous period (optional) */
  change?: number
  /** Data points for the chart (older → newer). If omitted, demo data is used. */
  data?: MetricDataPoint[]
  className?: string
}

/**
 * Small responsive chart card for showing KPI trends (revenue, user growth, etc.)
 */
export function MetricChart({
  title,
  currentValue,
  change,
  data,
  className,
}: MetricChartProps) {
  const demo: MetricDataPoint[] = [
    { label: "Jan", value: 120 },
    { label: "Feb", value: 180 },
    { label: "Mar", value: 220 },
    { label: "Apr", value: 200 },
    { label: "May", value: 260 },
    { label: "Jun", value: 300 },
  ]

  const points = React.useMemo(() => {
    const values = (data ?? demo).map((d) => d.value)
    const max = Math.max(...values, 1)
    // Map to SVG viewBox (0..100 on X, 0..40 on Y)
    return (data ?? demo)
      .map((d, i, arr) => {
        const x = (i / (arr.length - 1)) * 100
        const y = 40 - (d.value / max) * 40
        return `${x},${y}`
      })
      .join(" ")
  }, [data])

  const isPositive = change === undefined ? undefined : change >= 0

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-4">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          {currentValue}
          {change !== undefined && (
            <span
              className={cn(
                "ml-2 inline-flex items-center gap-1 text-sm font-medium",
                isPositive ? "text-emerald-600" : "text-destructive"
              )}
            >
              {isPositive ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
              {isPositive ? "+" : ""}
              {change}%
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Simple responsive mini line chart */}
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="w-full h-20"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area under the curve */}
          <polyline
            stroke="none"
            points={`0,40 ${points} 100,40`}
            fillOpacity="0.2"
            fill="url(#metricGradient)"
          />
          {/* Line path */}
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            points={points}
          />
        </svg>
      </CardContent>
    </Card>
  )
} 