"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  PenSquare,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Sample supplier data
const suppliers = [
  {
    id: "SUP-001",
    name: "Tech Components Inc.",
    contact: "John Anderson",
    email: "j.anderson@techcomp.com",
    phone: "+1 (555) 123-4567",
    category: "Electronics",
    status: "active",
    performance: "excellent",
  },
  {
    id: "SUP-002",
    name: "Office Supplies Co.",
    contact: "Sarah Miller",
    email: "s.miller@officesupplies.com",
    phone: "+1 (555) 234-5678",
    category: "Office",
    status: "active",
    performance: "good",
  },
  {
    id: "SUP-003",
    name: "Industrial Parts Ltd.",
    contact: "Robert Johnson",
    email: "r.johnson@industrialparts.com",
    phone: "+1 (555) 345-6789",
    category: "Manufacturing",
    status: "active",
    performance: "good",
  },
  {
    id: "SUP-004",
    name: "Global Materials",
    contact: "Maria Garcia",
    email: "m.garcia@globalmaterials.com",
    phone: "+1 (555) 456-7890",
    category: "Raw Materials",
    status: "active",
    performance: "fair",
  },
  {
    id: "SUP-005",
    name: "Quality Products",
    contact: "David Wilson",
    email: "d.wilson@qualityproducts.com",
    phone: "+1 (555) 567-8901",
    category: "Manufacturing",
    status: "inactive",
    performance: "poor",
  },
  {
    id: "SUP-006",
    name: "Safety Equipment Inc.",
    contact: "Jennifer Taylor",
    email: "j.taylor@safetyequipment.com",
    phone: "+1 (555) 678-9012",
    category: "Safety",
    status: "active",
    performance: "excellent",
  },
  {
    id: "SUP-007",
    name: "Precision Tools",
    contact: "Michael Brown",
    email: "m.brown@precisiontools.com",
    phone: "+1 (555) 789-0123",
    category: "Tools",
    status: "pending",
    performance: "unknown",
  },
]

export default function SuppliersPage() {
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

  // Filter suppliers based on search term and filters
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter
    const matchesCategory = categoryFilter === "all" || supplier.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-green-500">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-500">Good</Badge>
      case "fair":
        return <Badge className="bg-yellow-500">Fair</Badge>
      case "poor":
        return <Badge className="bg-red-500">Poor</Badge>
      case "unknown":
        return <Badge variant="outline">Unknown</Badge>
      default:
        return <Badge>{performance}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
        <p className="text-muted-foreground">Manage your supplier relationships and information</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Suppliers</CardTitle>
            <Link href="/dashboard/suppliers/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Supplier
              </Button>
            </Link>
          </div>
          <CardDescription>View and manage your supplier database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center space-x-2 md:w-2/3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Office">Office</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Safety">Safety</option>
                  <option value="Tools">Tools</option>
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
                    <TableHead>ID</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No suppliers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.id}</TableCell>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>
                          <div>{supplier.contact}</div>
                          <div className="text-sm text-muted-foreground">{supplier.email}</div>
                        </TableCell>
                        <TableCell>{supplier.category}</TableCell>
                        <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                        <TableCell>{getPerformanceBadge(supplier.performance)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <PenSquare className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1</strong> to <strong>{filteredSuppliers.length}</strong> of{" "}
                <strong>{filteredSuppliers.length}</strong> suppliers
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  1
                </Button>
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

