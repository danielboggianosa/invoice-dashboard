"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

// Sample purchase order data
const purchaseOrders = [
  {
    id: "PO-2023-0045",
    date: "2023-03-22",
    supplier: "Tech Components Inc.",
    requestor: "John Smith",
    total: 12450.0,
    status: "pending",
    type: "standard",
  },
  {
    id: "PO-2023-0044",
    date: "2023-03-21",
    supplier: "Office Supplies Co.",
    requestor: "Maria Garcia",
    total: 3275.5,
    status: "approved",
    type: "standard",
  },
  {
    id: "PO-2023-0043",
    date: "2023-03-20",
    supplier: "Industrial Parts Ltd.",
    requestor: "David Wilson",
    total: 8920.75,
    status: "approved",
    type: "blanket",
  },
  {
    id: "PO-2023-0042",
    date: "2023-03-18",
    supplier: "Tech Components Inc.",
    requestor: "Sarah Brown",
    total: 5670.25,
    status: "received",
    type: "standard",
  },
  {
    id: "PO-2023-0041",
    date: "2023-03-15",
    supplier: "Global Materials",
    requestor: "Michael Lee",
    total: 15780.0,
    status: "received",
    type: "standard",
  },
  {
    id: "PO-2023-0040",
    date: "2023-03-12",
    supplier: "Quality Products",
    requestor: "Jennifer Taylor",
    total: 2345.75,
    status: "closed",
    type: "standard",
  },
  {
    id: "PO-2023-0039",
    date: "2023-03-10",
    supplier: "Office Supplies Co.",
    requestor: "Robert Johnson",
    total: 1875.5,
    status: "closed",
    type: "standard",
  },
]

export default function PurchaseOrdersPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPO, setSelectedPO] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Filter purchase orders based on search term and filters
  const filteredPOs = purchaseOrders.filter((po) => {
    const matchesSearch =
      po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.requestor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || po.status === statusFilter
    const matchesType = typeFilter === "all" || po.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleDeleteClick = (id: string) => {
    setSelectedPO(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // In a real app, you would delete the purchase order here
    console.log(`Deleting purchase order ${selectedPO}`)
    setIsDeleteDialogOpen(false)
    setSelectedPO(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "approved":
        return <Badge className="bg-blue-500">Approved</Badge>
      case "received":
        return <Badge className="bg-green-500">Received</Badge>
      case "closed":
        return <Badge variant="outline">Closed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Purchase Orders</h2>
        <p className="text-muted-foreground">Manage and track all your purchase orders</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Purchase Orders</CardTitle>
            <Link to="/dashboard/purchase-orders/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New PO
              </Button>
            </Link>
          </div>
          <CardDescription>View, filter and manage all your purchase orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center space-x-2 md:w-2/3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search purchase orders..."
                  className="h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-9 w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-9 w-[120px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="blanket">Blanket</SelectItem>
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
                    <TableHead>PO Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Requestor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPOs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No purchase orders found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPOs.map((po) => (
                      <TableRow key={po.id}>
                        <TableCell className="font-medium">{po.id}</TableCell>
                        <TableCell>{po.date}</TableCell>
                        <TableCell>{po.supplier}</TableCell>
                        <TableCell>{po.requestor}</TableCell>
                        <TableCell className="capitalize">{po.type}</TableCell>
                        <TableCell>${po.total.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(po.status)}</TableCell>
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
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteClick(po.id)}
                              >
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
                Showing <strong>1</strong> to <strong>{filteredPOs.length}</strong> of{" "}
                <strong>{filteredPOs.length}</strong> purchase orders
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this purchase order?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the purchase order and remove the data from our
              servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

