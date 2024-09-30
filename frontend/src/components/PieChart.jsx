"use client"

import { useState, useMemo } from "react"
import { Label, Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive pie chart showing department-wise coal production"

const productionData = [
  { department: "opencast", production: 750000, fill: "var(--color-opencast)" },
  { department: "underground", production: 250000, fill: "var(--color-underground)" },
  { department: "highwall", production: 150000, fill: "var(--color-highwall)" },
  { department: "longwall", production: 100000, fill: "var(--color-longwall)" },
  { department: "others", production: 50000, fill: "var(--color-others)" },
]

const chartConfig = {
  production: {
    label: "Production (tonnes)",
  },
  opencast: {
    label: "Opencast",
    color: "hsl(var(--chart-1))",
  },
  underground: {
    label: "Underground",
    color: "hsl(var(--chart-2))",
  },
  highwall: {
    label: "Highwall",
    color: "hsl(var(--chart-3))",
  },
  longwall: {
    label: "Longwall",
    color: "hsl(var(--chart-4))",
  },
  others: {
    label: "Others",
    color: "hsl(var(--chart-5))",
  },
}

export function PieCharts() {
  const id = "department-production-pie"
  const [activeDepartment, setActiveDepartment] = useState(productionData[0].department)

  const activeIndex = useMemo(
    () => productionData.findIndex((item) => item.department === activeDepartment),
    [activeDepartment]
  )
  const departments = useMemo(() => productionData.map((item) => item.department), [])

  const totalProduction = useMemo(() => 
    productionData.reduce((sum, item) => sum + item.production, 0),
    []
  )

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Department-wise Coal Production</CardTitle>
          <CardDescription>Total Production: {totalProduction.toLocaleString()} tonnes</CardDescription>
        </div>
        <Select value={activeDepartment} onValueChange={setActiveDepartment}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a department"
          >
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {departments.map((key) => {
              const config = chartConfig[key]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={productionData}
              dataKey="production"
              nameKey="department"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {productionData[activeIndex].production.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          tonnes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}