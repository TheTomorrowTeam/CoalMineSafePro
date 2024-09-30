"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
} from "@/components/ui/chart"

export const description = "An interactive line chart displaying coal mine production data"

const chartData = [
  { date: "2024-09-30", coalExtracted: 1250, overburdenRemoved: 3750, methaneLevel: 0.8 },
  { date: "2024-10-01", coalExtracted: 1300, overburdenRemoved: 3800, methaneLevel: 0.7 },
  { date: "2024-10-02", coalExtracted: 1180, overburdenRemoved: 3600, methaneLevel: 0.9 },
  { date: "2024-10-03", coalExtracted: 1400, overburdenRemoved: 4000, methaneLevel: 0.6 },
  { date: "2024-10-04", coalExtracted: 1350, overburdenRemoved: 3900, methaneLevel: 0.8 },
  { date: "2024-10-05", coalExtracted: 1280, overburdenRemoved: 3700, methaneLevel: 0.7 },
  { date: "2024-10-06", coalExtracted: 1320, overburdenRemoved: 3850, methaneLevel: 0.8 },
  { date: "2024-10-07", coalExtracted: 1420, overburdenRemoved: 4100, methaneLevel: 0.5 },
  { date: "2024-10-08", coalExtracted: 1150, overburdenRemoved: 3500, methaneLevel: 1.0 },
  { date: "2024-10-09", coalExtracted: 1380, overburdenRemoved: 3950, methaneLevel: 0.7 },
]

const chartConfig = {
  coalExtracted: {
    label: "Coal Extracted (tonnes)",
    color: "hsl(var(--chart-1))",
  },
  overburdenRemoved: {
    label: "Overburden Removed (cubic meters)",
    color: "hsl(var(--chart-2))",
  },
  methaneLevel: {
    label: "Methane Level (%)",
    color: "hsl(var(--chart-3))",
  },
}

export function LineCharts() {
  const [activeChart, setActiveChart] = React.useState("coalExtracted")

  const total = React.useMemo(() => ({
    coalExtracted: chartData.reduce((acc, curr) => acc + curr.coalExtracted, 0),
    overburdenRemoved: chartData.reduce((acc, curr) => acc + curr.overburdenRemoved, 0),
  }), [])

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Coal Mine Production Data</CardTitle>
          <CardDescription>
            Showing production metrics and methane levels for the last 10 days
          </CardDescription>
        </div>
        <div className="flex">
          {["coalExtracted", "overburdenRemoved"].map((key) => {
            return (
              <button
                key={key}
                data-active={activeChart === key}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(key)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[key].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="coalExtracted"
              stroke={chartConfig.coalExtracted.color}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="overburdenRemoved"
              stroke={chartConfig.overburdenRemoved.color}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="methaneLevel"
              stroke={chartConfig.methaneLevel.color}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}