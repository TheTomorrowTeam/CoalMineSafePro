"use client"

import { TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart showing safety incidents and compliance rate"

const chartData = [
  { month: "January", incidents: 5, complianceRate: 92 },
  { month: "February", incidents: 3, complianceRate: 95 },
  { month: "March", incidents: 4, complianceRate: 94 },
  { month: "April", incidents: 2, complianceRate: 97 },
  { month: "May", incidents: 1, complianceRate: 98 },
  { month: "June", incidents: 2, complianceRate: 97 },
]

const chartConfig = {
  incidents: {
    label: "Safety Incidents",
    color: "hsl(var(--chart-1))",
  },
  complianceRate: {
    label: "Compliance Rate (%)",
    color: "hsl(var(--chart-2))",
  },
}

export function BarCharts() {
  const totalIncidents = chartData.reduce((sum, item) => sum + item.incidents, 0)
  const averageComplianceRate = (chartData.reduce((sum, item) => sum + item.complianceRate, 0) / chartData.length).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coal Mining Safety Performance</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar yAxisId="left" dataKey="incidents" fill="var(--color-incidents)" radius={4} />
            <Bar yAxisId="right" dataKey="complianceRate" fill="var(--color-complianceRate)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Safety incidents down by 60% compared to last year <TrendingDown className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total incidents: {totalIncidents}, Average compliance rate: {averageComplianceRate}%
        </div>
      </CardFooter>
    </Card>
  )
}