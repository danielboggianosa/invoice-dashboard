"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Clock,
  AlertCircle,
  Star,
  Award,
  BarChart3,
  Download,
} from "lucide-react"

// Sample supplier data
const suppliers = [
  {
    id: 1,
    name: "Tech Components Inc.",
    category: "IT Equipment",
    rating: 4.8,
    totalOrders: 145,
    totalSpend: 125400.0,
    avgDeliveryTime: 3.2,
    onTimeDeliveryRate: 95,
    qualityScore: 4.7,
    lastOrderDate: "2023-03-20",
    status: "excellent",
    trend: "up",
  },
  {
    id: 2,
    name: "Office Supplies Co.",
    category: "Office Supplies",
    rating: 4.5,
    totalOrders: 230,
    totalSpend: 45600.0,
    avgDeliveryTime: 2.8,
    onTimeDeliveryRate: 92,
    qualityScore: 4.5,
    lastOrderDate: "2023-03-19",
    status: "good",
    trend: "stable",
  },
  {
    id: 3,
    name: "Industrial Parts Ltd.",
    category: "Hardware",
    rating: 4.2,
    totalOrders: 89,
    totalSpend: 78900.0,
    avgDeliveryTime: 4.5,
    onTimeDeliveryRate: 85,
    qualityScore: 4.3,
    lastOrderDate: "2023-03-18",
    status: "good",
    trend: "down",
  },
  {
    id: 4,
    name: "Global Materials",
    category: "Raw Materials",
    rating: 4.9,
    totalOrders: 67,
    totalSpend: 156700.0,
    avgDeliveryTime: 5.1,
    onTimeDeliveryRate: 98,
    qualityScore: 4.9,
    lastOrderDate: "2023-03-17",
    status: "excellent",
    trend: "up",
  },
  {
    id: 5,
    name: "Safety Equipment Inc.",
    category: "Safety",
    rating: 4.6,
    totalOrders: 112,
    totalSpend: 34500.0,
    avgDeliveryTime: 3.0,
    onTimeDeliveryRate: 94,
    qualityScore: 4.6,
    lastOrderDate: "2023-03-16",
    status: "good",
    trend: "up",
  },
  {
    id: 6,
    name: "Budget Office Depot",
    category: "Office Supplies",
    rating: 3.8,
    totalOrders: 156,
    totalSpend: 28900.0,
    avgDeliveryTime: 4.2,
    onTimeDeliveryRate: 78,
    qualityScore: 3.9,
    lastOrderDate: "2023-03-15",
    status: "needs_improvement",
    trend: "down",
  },
]

export default function SupplierAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("12months")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Calculate overall statistics
  const totalSuppliers = suppliers.length
  const totalSpend = suppliers.reduce((sum, s) => sum + s.totalSpend, 0)
  const avgRating = suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length
  const avgOnTimeRate = suppliers.reduce((sum, s) => sum + s.onTimeDeliveryRate, 0) / suppliers.length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-500 hover:bg-green-600">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Good</Badge>
      case "needs_improvement":
        return <Badge variant="destructive">Needs Improvement</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (trend === "down") {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return null
  }

  const filteredSuppliers = categoryFilter === "all"
    ? suppliers
    : suppliers.filter(s => s.category === categoryFilter)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Supplier Analytics</h2>
        <p className="text-muted-foreground">Performance metrics and insights about your suppliers</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">Active vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 12 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating.toFixed(1)}/5.0</div>
            <p className="text-xs text-muted-foreground">Supplier performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOnTimeRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Average across all suppliers</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="IT Equipment">IT Equipment</SelectItem>
            <SelectItem value="Office Supplies">Office Supplies</SelectItem>
            <SelectItem value="Hardware">Hardware</SelectItem>
            <SelectItem value="Raw Materials">Raw Materials</SelectItem>
            <SelectItem value="Safety">Safety</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="spend-analysis">Spend Analysis</TabsTrigger>
          <TabsTrigger value="top-suppliers">Top Suppliers</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Performance Overview</CardTitle>
              <CardDescription>Comprehensive metrics for all suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Rating</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Total Spend</TableHead>
                      <TableHead className="text-right">Avg Delivery</TableHead>
                      <TableHead className="text-right">On-Time %</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.category}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {supplier.rating}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{supplier.totalOrders}</TableCell>
                        <TableCell className="text-right">${supplier.totalSpend.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{supplier.avgDeliveryTime} days</TableCell>
                        <TableCell className="text-right">
                          <span className={supplier.onTimeDeliveryRate >= 90 ? "text-green-600 font-medium" : ""}>
                            {supplier.onTimeDeliveryRate}%
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                        <TableCell>{getTrendIcon(supplier.trend)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spend-analysis">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Spend by Supplier</CardTitle>
                <CardDescription>Distribution of total spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers
                    .sort((a, b) => b.totalSpend - a.totalSpend)
                    .slice(0, 6)
                    .map((supplier) => {
                      const percentage = (supplier.totalSpend / totalSpend) * 100
                      return (
                        <div key={supplier.id} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{supplier.name}</span>
                            <span className="text-muted-foreground">
                              ${supplier.totalSpend.toLocaleString()} ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spend by Category</CardTitle>
                <CardDescription>Total spending per category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(new Set(suppliers.map(s => s.category))).map((category) => {
                    const categorySpend = suppliers
                      .filter(s => s.category === category)
                      .reduce((sum, s) => sum + s.totalSpend, 0)
                    const percentage = (categorySpend / totalSpend) * 100
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{category}</span>
                          <span className="text-muted-foreground">
                            ${categorySpend.toLocaleString()} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="top-suppliers">
          <div className="grid gap-4 md:grid-cols-3">
            {suppliers
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((supplier, index) => (
                <Card key={supplier.id} className="relative">
                  {index === 0 && (
                    <div className="absolute -right-2 -top-2">
                      <Award className="h-8 w-8 fill-yellow-500 text-yellow-600" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription>{supplier.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-bold">{supplier.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Orders</span>
                      <span className="font-medium">{supplier.totalOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Spend</span>
                      <span className="font-medium">${supplier.totalSpend.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                      <span className="font-medium">{supplier.onTimeDeliveryRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Quality Score</span>
                      <span className="font-medium">{supplier.qualityScore}/5.0</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Comparison Matrix</CardTitle>
              <CardDescription>Compare key metrics across suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="mb-4 text-sm font-medium">Delivery Performance vs. Quality Score</h4>
                  <div className="flex h-[300px] items-center justify-center rounded-md border">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Scatter Plot Visualization</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-sm font-medium">Cost vs. Quality Analysis</h4>
                  <div className="flex h-[300px] items-center justify-center rounded-md border">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Quadrant Chart Visualization</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
