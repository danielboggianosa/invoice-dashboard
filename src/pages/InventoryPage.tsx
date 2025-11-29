"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, BarChart3 } from "lucide-react"

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
    status: "ok",
    lastUpdated: "2023-03-11",
  },
]

export default function InventoryPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

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
      return <Badge className="bg-red-500">Low Stock</Badge>
    } else if (quantity > minQuantity * 2) {
      return <Badge className="bg-green-500">Good</Badge>
    } else {
      return <Badge className="bg-blue-500">Adequate</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
        <p className="text-muted-foreground">Manage and track your inventory levels</p>
      </div>

      <Tabs defaultValue="all-items" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-items">All Items</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="by-location">By Location</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="all-items">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>View and manage all inventory items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex w-full items-center space-x-2 md:w-2/3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory..."
                      className="h-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="low">Low Stock</option>
                      <option value="ok">Adequate</option>
                    </select>
                    <select
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="IT Equipment">IT Equipment</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Safety">Safety</option>
                    </select>
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
                        <TableHead className="text-right">Min Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
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
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{item.minQuantity}</TableCell>
                            <TableCell>{getStatusBadge(item.status, item.quantity, item.minQuantity)}</TableCell>
                            <TableCell>{item.lastUpdated}</TableCell>
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
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems
                      .filter((item) => item.status === "low")
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.sku}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.minQuantity}</TableCell>
                          <TableCell className="text-right">{item.minQuantity - item.quantity}</TableCell>
                          <TableCell>
                            <Button size="sm">Create PO</Button>
                          </TableCell>
                        </TableRow>
                      ))}
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
              <div className="flex h-[400px] w-full items-center justify-center rounded-md border">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Location Distribution Chart</span>
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
              <div className="flex h-[400px] w-full items-center justify-center rounded-md border">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Category Distribution Chart</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

