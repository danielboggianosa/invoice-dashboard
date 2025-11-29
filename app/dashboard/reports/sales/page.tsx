"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, LineChart, PieChart, RefreshCcw } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export default function SalesReportsPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Sales Reports</h2>
        <p className="text-muted-foreground">Analyze your sales data and generate reports</p>
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
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-store">By Store</TabsTrigger>
          <TabsTrigger value="by-product">By Product</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$124.35</div>
                <p className="text-xs text-muted-foreground">+4.3% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">364</div>
                <p className="text-xs text-muted-foreground">+12.5% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+0.5% from previous period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly sales for the selected period</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="flex h-[300px] w-full items-center justify-center rounded-md border">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Sales Trend Chart</span>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales by Payment Method</CardTitle>
                <CardDescription>Distribution of sales by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] w-full items-center justify-center rounded-md border">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Payment Method Chart</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Invoice Type</CardTitle>
              <CardDescription>Comparison of sales by invoice type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] w-full items-center justify-center rounded-md border">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Invoice Type Chart</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Store</CardTitle>
              <CardDescription>Detailed breakdown of sales by store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] w-full items-center justify-center rounded-md border">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Store Sales Chart</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-product" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Product</CardTitle>
              <CardDescription>Detailed breakdown of sales by product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] w-full items-center justify-center rounded-md border">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Product Sales Chart</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-category" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Detailed breakdown of sales by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] w-full items-center justify-center rounded-md border">
                <PieChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Category Sales Chart</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

