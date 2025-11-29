"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, Download, BarChart3, Package, AlertTriangle, TrendingUp, Plus } from "lucide-react"

// Sample inventory data
const inventoryItems = [
  {
    id: 1,
    sku: "PP-A4-500",
    name: "Printer Paper A4",
    category: "Office Supplies",
    location: "Warehouse A",
    quantity: 15,
    minQuantity: 50,
    unitPrice: 4.99,
    status: "low",
    lastUpdated: "2023-03-20",
  },
  {
    id: 2,
    sku: "NET-CAB-3M",
    name: "Ethernet Cables 3m",
    category: "IT Equipment",
    location: "Warehouse B",
    quantity: 8,
    minQuantity: 25,
    unitPrice: 12.50,
    status: "low",
    lastUpdated: "2023-03-19",
  },
  {
    id: 3,
    sku: "TNR-HP-55X",
    name: "Toner Cartridge HP-55X",
    category: "Office Supplies",
    location: "Warehouse A",
    quantity: 2,
    minQuantity: 10,
    unitPrice: 89.99,
    status: "low",
    lastUpdated: "2023-03-18",
  },
  {
    id: 4,
    sku: "SSB-M8-50",
    name: "Stainless Steel Bolts M8",
    category: "Hardware",
    location: "Warehouse C",
    quantity: 120,
    minQuantity: 500,
    unitPrice: 0.25,
    status: "low",
    lastUpdated: "2023-03-17",
  },
  {
    id: 5,
    sku: "NTR-GLV-L",
    name: "Nitrile Gloves Large",
    category: "Safety",
    location: "Warehouse B",
    quantity: 45,
    minQuantity: 200,
    unitPrice: 15.99,
    status: "low",
    lastUpdated: "2023-03-16",
  },
  {
    id: 6,
    sku: "KBD-WL-BLK",
    name: "Wireless Keyboard Black",
    category: "IT Equipment",
    location: "Warehouse B",
    quantity: 32,
    minQuantity: 20,
    unitPrice: 45.00,
    status: "ok",
    lastUpdated: "2023-03-15",
  },
  {
    id: 7,
    sku: "MSE-WL-BLK",
    name: "Wireless Mouse Black",
    category: "IT Equipment",
    location: "Warehouse B",
    quantity: 45,
    minQuantity: 20,
    unitPrice: 25.00,
    status: "ok",
    lastUpdated: "2023-03-14",
  },
  {
    id: 8,
    sku: "PEN-BLU-50",
    name: "Blue Ballpoint Pens (Box of 50)",
    category: "Office Supplies",
    location: "Warehouse A",
    quantity: 28,
    minQuantity: 15,
    unitPrice: 8.99,
    status: "ok",
    lastUpdated: "2023-03-13",
  },
  {
    id: 9,
    sku: "NTB-A4-100",
    name: "A4 Notebooks (Pack of 5)",
    category: "Office Supplies",
    location: "Warehouse A",
    quantity: 65,
    minQuantity: 30,
    unitPrice: 12.50,
    status: "ok",
    lastUpdated: "2023-03-12",
  },
  {
    id: 10,
    sku: "HDD-1TB-EXT",
    name: "1TB External Hard Drive",
    category: "IT Equipment",
    location: "Warehouse B",
    quantity: 12,
    minQuantity: 5,
    unitPrice: 79.99,
    status: "ok",
    lastUpdated: "2023-03-11",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Calculate statistics
  const totalItems = inventoryItems.length
  const lowStockItems = inventoryItems.filter((item) => item.status === "low").length
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  // Filter inventory items based on search term and filters
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string, quantity: number, minQuantity: number) => {
    if (status === "low") {
      return <Badge variant="destructive">Low Stock</Badge>
    } else if (quantity > minQuantity * 2) {
      return <Badge className="bg-green-500 hover:bg-green-600">Good</Badge>
    } else {
      return <Badge variant="default">Adequate</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
        <p className="text-muted-foreground">Track and manage your inventory levels</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Unique SKUs in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items need reordering</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Current inventory value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active warehouses</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-items" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-items">All Items</TabsTrigger>
          <TabsTrigger value="low-stock">
            Low Stock
            {lowStockItems > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {lowStockItems}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="by-location">By Location</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="all-items">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventory Items</CardTitle>
                  <CardDescription>View and manage all inventory items</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex w-full items-center space-x-2 md:w-2/3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by SKU, name, category, or location..."
                      className="h-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="low">Low Stock</SelectItem>
                        <SelectItem value="ok">Adequate</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="h-9 w-[160px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                        <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                        <SelectItem value="Hardware">Hardware</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Export</span>
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Min Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="h-24 text-center">
                            No inventory items found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.sku}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell className="text-right font-medium">{item.quantity}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{item.minQuantity}</TableCell>
                            <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(item.status, item.quantity, item.minQuantity)}</TableCell>
                            <TableCell className="text-muted-foreground">{item.lastUpdated}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>Items that need to be reordered soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Current</TableHead>
                      <TableHead className="text-right">Minimum</TableHead>
                      <TableHead className="text-right">Needed</TableHead>
                      <TableHead className="text-right">Est. Cost</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems
                      .filter((item) => item.status === "low")
                      .map((item) => {
                        const needed = item.minQuantity - item.quantity
                        const estimatedCost = needed * item.unitPrice
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.sku}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell className="text-right">
                              <span className="font-medium text-destructive">{item.quantity}</span>
                            </TableCell>
                            <TableCell className="text-right">{item.minQuantity}</TableCell>
                            <TableCell className="text-right font-medium">{needed}</TableCell>
                            <TableCell className="text-right">${estimatedCost.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="default">
                                Create PO
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-location">
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Location</CardTitle>
              <CardDescription>View inventory grouped by storage location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Warehouse A", "Warehouse B", "Warehouse C"].map((location) => {
                  const locationItems = inventoryItems.filter((item) => item.location === location)
                  const locationValue = locationItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
                  const locationLowStock = locationItems.filter((item) => item.status === "low").length

                  return (
                    <Card key={location}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{location}</CardTitle>
                          <div className="flex items-center gap-4">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Items:</span>{" "}
                              <span className="font-medium">{locationItems.length}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Value:</span>{" "}
                              <span className="font-medium">${locationValue.toFixed(2)}</span>
                            </div>
                            {locationLowStock > 0 && (
                              <Badge variant="destructive">{locationLowStock} Low Stock</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          {locationItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between rounded-lg border p-3"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">{item.sku}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-sm font-medium">
                                    {item.quantity} / {item.minQuantity}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{item.category}</p>
                                </div>
                                {getStatusBadge(item.status, item.quantity, item.minQuantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-category">
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Category</CardTitle>
              <CardDescription>View inventory grouped by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Office Supplies", "IT Equipment", "Hardware", "Safety"].map((category) => {
                  const categoryItems = inventoryItems.filter((item) => item.category === category)
                  const categoryValue = categoryItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
                  const categoryLowStock = categoryItems.filter((item) => item.status === "low").length

                  return (
                    <Card key={category}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{category}</CardTitle>
                          <div className="flex items-center gap-4">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Items:</span>{" "}
                              <span className="font-medium">{categoryItems.length}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Value:</span>{" "}
                              <span className="font-medium">${categoryValue.toFixed(2)}</span>
                            </div>
                            {categoryLowStock > 0 && (
                              <Badge variant="destructive">{categoryLowStock} Low Stock</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          {categoryItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between rounded-lg border p-3"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.sku} • {item.location}
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-sm font-medium">
                                    {item.quantity} / {item.minQuantity}
                                  </p>
                                  <p className="text-xs text-muted-foreground">${item.unitPrice.toFixed(2)}/unit</p>
                                </div>
                                {getStatusBadge(item.status, item.quantity, item.minQuantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
