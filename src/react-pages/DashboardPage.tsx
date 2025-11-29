"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, DollarSign, FileText, Package, TruckIcon, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Purchase Dashboard</h2>
        <p className="text-muted-foreground">Overview of your purchasing activities and key metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Purchase Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-3 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Receipts</CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Expected within 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common purchasing tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link to="/dashboard/purchase-orders/new">
                <Button className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <FileText className="h-6 w-6" />
                  <span>Create Purchase Order</span>
                </Button>
              </Link>
              <Link to="/dashboard/receiving">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <TruckIcon className="h-6 w-6" />
                  <span>Receive Items</span>
                </Button>
              </Link>
              <Link to="/dashboard/suppliers/new">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <Users className="h-6 w-6" />
                  <span>Add Supplier</span>
                </Button>
              </Link>
              <Link to="/dashboard/purchase-orders">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <Clock className="h-6 w-6" />
                  <span>Review Pending Orders</span>
                </Button>
              </Link>
              <Link to="/dashboard/inventory">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <Package className="h-6 w-6" />
                  <span>Check Inventory</span>
                </Button>
              </Link>
              <Link to="/dashboard/reports/purchasing">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                  <span>View Spend Analysis</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 row-span-2">
          <CardHeader>
            <CardTitle>Upcoming Deliveries</CardTitle>
            <CardDescription>Expected in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "PO-2023-0042", supplier: "Tech Components Inc.", date: "Tomorrow", items: 12 },
                { id: "PO-2023-0039", supplier: "Office Supplies Co.", date: "Mar 25", items: 8 },
                { id: "PO-2023-0036", supplier: "Industrial Parts Ltd.", date: "Mar 26", items: 5 },
                { id: "PO-2023-0033", supplier: "Global Materials", date: "Mar 27", items: 15 },
                { id: "PO-2023-0031", supplier: "Quality Products", date: "Mar 28", items: 3 },
              ].map((delivery) => (
                <div key={delivery.id} className="flex flex-col space-y-1 p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{delivery.id}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{delivery.date}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{delivery.supplier}</span>
                  <span className="text-sm">{delivery.items} items</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Monthly Spend by Category</CardTitle>
            <CardDescription>Current month purchasing breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Spend by Category Chart</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                  <span className="text-sm">Raw Materials (45%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2" />
                  <span className="text-sm">Equipment (22%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
                  <span className="text-sm">Office Supplies (15%)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2" />
                  <span className="text-sm">Services (10%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                  <span className="text-sm">Maintenance (5%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-2" />
                  <span className="text-sm">Other (3%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent-activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="pending-approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock Items</TabsTrigger>
        </TabsList>

        <TabsContent value="recent-activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Purchasing Activity</CardTitle>
              <CardDescription>Latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Purchase Order #PO-2023-0045 created", user: "John Smith", time: "2 minutes ago" },
                  { action: "Delivery received for PO-2023-0038", user: "Maria Garcia", time: "1 hour ago" },
                  { action: "New supplier 'Precision Tools Inc.' added", user: "David Wilson", time: "3 hours ago" },
                  { action: "Purchase Order #PO-2023-0044 approved", user: "Sarah Brown", time: "5 hours ago" },
                  { action: "Invoice #INV-2023-112 reconciled", user: "Michael Lee", time: "Yesterday" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 translate-y-1 rounded-full bg-primary" />
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{activity.action}</p>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">By {activity.user}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Purchase orders awaiting your approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "PO-2023-0045",
                    supplier: "Tech Components Inc.",
                    amount: "$12,450.00",
                    requestor: "John Smith",
                    date: "Today",
                  },
                  {
                    id: "PO-2023-0044",
                    supplier: "Office Supplies Co.",
                    amount: "$3,275.50",
                    requestor: "Maria Garcia",
                    date: "Yesterday",
                  },
                  {
                    id: "PO-2023-0043",
                    supplier: "Industrial Parts Ltd.",
                    amount: "$8,920.75",
                    requestor: "David Wilson",
                    date: "Mar 22",
                  },
                ].map((po) => (
                  <div key={po.id} className="flex flex-col space-y-2 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{po.id}</span>
                      <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Pending</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{po.supplier}</span>
                      <span className="font-medium">{po.amount}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Requested by: {po.requestor}</span>
                      <span>{po.date}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="flex-1">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Review
                      </Button>
                      <Button size="sm" variant="ghost" className="flex-1">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>Items that need to be reordered soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Printer Paper A4",
                    sku: "PP-A4-500",
                    current: 15,
                    minimum: 50,
                    supplier: "Office Supplies Co.",
                  },
                  {
                    name: "Ethernet Cables 3m",
                    sku: "NET-CAB-3M",
                    current: 8,
                    minimum: 25,
                    supplier: "Tech Components Inc.",
                  },
                  {
                    name: "Toner Cartridge HP-55X",
                    sku: "TNR-HP-55X",
                    current: 2,
                    minimum: 10,
                    supplier: "Office Supplies Co.",
                  },
                  {
                    name: "Stainless Steel Bolts M8",
                    sku: "SSB-M8-50",
                    current: 120,
                    minimum: 500,
                    supplier: "Industrial Parts Ltd.",
                  },
                  {
                    name: "Nitrile Gloves Large",
                    sku: "NTR-GLV-L",
                    current: 45,
                    minimum: 200,
                    supplier: "Safety Equipment Inc.",
                  },
                ].map((item) => (
                  <div key={item.sku} className="flex flex-col space-y-2 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Low Stock</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>SKU: {item.sku}</span>
                      <span className="font-medium">
                        {item.current} / {item.minimum}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Preferred supplier: {item.supplier}</span>
                    </div>
                    <Button size="sm" className="mt-2">
                      Create Purchase Order
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

