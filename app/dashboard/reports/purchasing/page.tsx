"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, LineChart, PieChart, RefreshCcw } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export default function PurchasingReportsPage() {
  const [mounted, setMounted] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })
  const [period, setPeriod] = useState("monthly")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Purchasing Reports</h2>
        <p className="text-muted-foreground">Analyze your purchasing data and generate reports</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <DateRangePicker value={dateRange} onValueChange={setDateRange} />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Spend Overview</TabsTrigger>
          <TabsTrigger value="by-supplier">By Supplier</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$245,631.89</div>
                <p className="text-xs text-muted-foreground">+12.5% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average PO Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,435.75</div>
                <p className="text-xs text-muted-foreground">+3.2% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total POs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">+8.7% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">+2 from previous period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Spend Trend</CardTitle>
                <CardDescription>Monthly spend for the selected period</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="flex h-[300px] w-full items-center justify-center rounded-md border">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Spend Trend Chart</span>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Spend by Category</CardTitle>
                <CardDescription>Distribution of spend by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] w-full items-center justify-center rounded-md border">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Category Chart</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Suppliers by Spend</CardTitle>
              <CardDescription>Suppliers with highest spend amount</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] w-full items-center justify-center rounded-md border">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Top Suppliers Chart</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-supplier" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spend by Supplier</CardTitle>
              <CardDescription>Detailed breakdown of spend by supplier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] w-full items-center justify-center rounded-md border">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Supplier Spend Chart</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-category" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spend by Category</CardTitle>
              <CardDescription>Detailed breakdown of spend by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] w-full items-center justify-center rounded-md border">
                <PieChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Category Spend Chart</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchasing Trends</CardTitle>
              <CardDescription>Analysis of purchasing trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] w-full items-center justify-center rounded-md border">
                <LineChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Trends Chart</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

