"use client"

import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart showing the distribution of coal types produced"

const chartData = [
  { coalType: "thermal", production: 750000, fill: "var(--color-thermal)" },
  { coalType: "coking", production: 450000, fill: "var(--color-coking)" },
  { coalType: "anthracite", production: 200000, fill: "var(--color-anthracite)" },
  { coalType: "lignite", production: 100000, fill: "var(--color-lignite)" },
  { coalType: "other", production: 50000, fill: "var(--color-other)" },
]

const chartConfig = {
  production: {
    label: "Production (tonnes)",
  },
  thermal: {
    label: "Thermal Coal",
    color: "hsl(var(--chart-1))",
  },
  coking: {
    label: "Coking Coal",
    color: "hsl(var(--chart-2))",
  },
  anthracite: {
    label: "Anthracite",
    color: "hsl(var(--chart-3))",
  },
  lignite: {
    label: "Lignite",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export function PieChart2() {
  const totalProduction = chartData.reduce((sum, item) => sum + item.production, 0)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Coal Type Distribution</CardTitle>
        <CardDescription>Total Production: {totalProduction.toLocaleString()} tonnes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="production" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="production"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                    fontSize="12"
                  >
                    {`${
                      chartConfig[payload.coalType]?.label
                    } (${(payload.production / 1000).toFixed(0)}k)`}
                  </text>
                )
              }}
              nameKey="coalType"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}