"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  FileText,
} from "lucide-react"

// Sample data
const inventoryAlerts = [
  {
    id: 1,
    type: "critical",
    item: "Toner Cartridge HP-55X",
    sku: "TNR-HP-55X",
    message: "Stock critically low - only 2 units remaining",
    currentStock: 2,
    minStock: 10,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "warning",
    item: "Ethernet Cables 3m",
    sku: "NET-CAB-3M",
    message: "Stock below minimum threshold",
    currentStock: 8,
    minStock: 25,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    type: "critical",
    item: "Printer Paper A4",
    sku: "PP-A4-500",
    message: "Urgent reorder required",
    currentStock: 15,
    minStock: 50,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    type: "warning",
    item: "Nitrile Gloves Large",
    sku: "NTR-GLV-L",
    message: "Approaching minimum stock level",
    currentStock: 45,
    minStock: 200,
    timestamp: "2 days ago",
  },
]

const recentMovements = [
  {
    id: 1,
    type: "in",
    item: "Wireless Keyboard Black",
    sku: "KBD-WL-BLK",
    quantity: 50,
    location: "Warehouse B",
    timestamp: "2023-03-20 14:30",
    reference: "PO-2023-0045",
  },
  {
    id: 2,
    type: "out",
    item: "Blue Ballpoint Pens",
    sku: "PEN-BLU-50",
    quantity: 12,
    location: "Warehouse A",
    timestamp: "2023-03-20 11:15",
    reference: "REQ-2023-0123",
  },
  {
    id: 3,
    type: "in",
    item: "1TB External Hard Drive",
    sku: "HDD-1TB-EXT",
    quantity: 25,
    location: "Warehouse B",
    timestamp: "2023-03-19 16:45",
    reference: "PO-2023-0044",
  },
  {
    id: 4,
    type: "out",
    item: "A4 Notebooks",
    sku: "NTB-A4-100",
    quantity: 30,
    location: "Warehouse A",
    timestamp: "2023-03-19 09:20",
    reference: "REQ-2023-0122",
  },
  {
    id: 5,
    type: "adjustment",
    item: "Wireless Mouse Black",
    sku: "MSE-WL-BLK",
    quantity: -3,
    location: "Warehouse B",
    timestamp: "2023-03-18 15:00",
    reference: "ADJ-2023-0015",
  },
]

const locationStatus = [
  {
    location: "Warehouse A",
    totalItems: 245,
    lowStockItems: 8,
    criticalItems: 2,
    utilization: 78,
    status: "good",
  },
  {
    location: "Warehouse B",
    totalItems: 189,
    lowStockItems: 5,
    criticalItems: 1,
    utilization: 65,
    status: "good",
  },
  {
    location: "Warehouse C",
    totalItems: 112,
    lowStockItems: 3,
    criticalItems: 0,
    utilization: 45,
    status: "excellent",
  },
]

export default function InventoryStatusPage() {
  const totalAlerts = inventoryAlerts.length
  const criticalAlerts = inventoryAlerts.filter(a => a.type === "critical").length
  const warningAlerts = inventoryAlerts.filter(a => a.type === "warning").length

  const getAlertIcon = (type: string) => {
    if (type === "critical") {
      return <AlertCircle className="h-5 w-5 text-red-500" />
    }
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />
  }

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "in":
        return <ArrowDownCircle className="h-5 w-5 text-green-500" />
      case "out":
        return <ArrowUpCircle className="h-5 w-5 text-blue-500" />
      case "adjustment":
        return <RefreshCw className="h-5 w-5 text-purple-500" />
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getMovementBadge = (type: string) => {
    switch (type) {
      case "in":
        return <Badge className="bg-green-500 hover:bg-green-600">Received</Badge>
      case "out":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Issued</Badge>
      case "adjustment":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Adjustment</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Inventory Status</h2>
          <p className="text-muted-foreground">Real-time status and alerts for your inventory</p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlerts}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{warningAlerts}</div>
            <p className="text-xs text-muted-foreground">Low stock alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locationStatus.length}</div>
            <p className="text-xs text-muted-foreground">Active warehouses</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">
            Active Alerts
            {totalAlerts > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {totalAlerts}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="movements">Recent Movements</TabsTrigger>
          <TabsTrigger value="locations">Location Status</TabsTrigger>
          <TabsTrigger value="trends">Stock Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <div className="grid gap-4">
            {inventoryAlerts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                  <h3 className="mb-2 text-lg font-medium">No Active Alerts</h3>
                  <p className="text-sm text-muted-foreground">All inventory levels are healthy</p>
                </CardContent>
              </Card>
            ) : (
              inventoryAlerts.map((alert) => (
                <Card key={alert.id} className={alert.type === "critical" ? "border-red-200" : "border-yellow-200"}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {getAlertIcon(alert.type)}
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{alert.item}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <span>SKU: {alert.sku}</span>
                            <span>•</span>
                            <span className="text-xs">{alert.timestamp}</span>
                          </CardDescription>
                        </div>
                      </div>
                      {alert.type === "critical" ? (
                        <Badge variant="destructive">Critical</Badge>
                      ) : (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">{alert.message}</p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Current Stock:</span>
                          <span className={`font-medium ${alert.type === "critical" ? "text-red-600" : "text-yellow-600"}`}>
                            {alert.currentStock}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Minimum Required:</span>
                          <span className="font-medium">{alert.minStock}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Shortage:</span>
                          <span className="font-medium text-red-600">
                            {alert.minStock - alert.currentStock} units
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Create Purchase Order</Button>
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="ghost">Dismiss</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inventory Movements</CardTitle>
              <CardDescription>Latest stock transactions and adjustments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMovements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      {getMovementIcon(movement.type)}
                      <div className="space-y-1">
                        <p className="font-medium">{movement.item}</p>
                        <p className="text-sm text-muted-foreground">
                          SKU: {movement.sku} • {movement.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">
                          {movement.type === "out" || movement.quantity < 0 ? "-" : "+"}
                          {Math.abs(movement.quantity)} units
                        </p>
                        <p className="text-xs text-muted-foreground">{movement.timestamp}</p>
                      </div>
                      {getMovementBadge(movement.type)}
                      <Button size="sm" variant="ghost">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <div className="grid gap-4 md:grid-cols-3">
            {locationStatus.map((location) => (
              <Card key={location.location}>
                <CardHeader>
                  <CardTitle className="text-lg">{location.location}</CardTitle>
                  <CardDescription>
                    {location.status === "excellent" ? (
                      <span className="text-green-600">Excellent</span>
                    ) : (
                      <span className="text-blue-600">Good</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Items</span>
                      <span className="font-medium">{location.totalItems}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Low Stock</span>
                      <span className="font-medium text-yellow-600">{location.lowStockItems}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Critical</span>
                      <span className="font-medium text-red-600">{location.criticalItems}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Utilization</span>
                      <span className="font-medium">{location.utilization}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${
                          location.utilization > 80
                            ? "bg-red-500"
                            : location.utilization > 60
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${location.utilization}%` }}
                      />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Stock Level Trends</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] items-center justify-center rounded-md border">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Line Chart Visualization</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Movement Patterns</CardTitle>
                <CardDescription>Incoming vs Outgoing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] items-center justify-center rounded-md border">
                  <TrendingDown className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Bar Chart Visualization</span>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Category-wise Stock Levels</CardTitle>
                <CardDescription>Current status across all categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] items-center justify-center rounded-md border">
                  <Package className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Stacked Bar Chart Visualization</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
