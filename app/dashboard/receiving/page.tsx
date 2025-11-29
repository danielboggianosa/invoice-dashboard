"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, TruckIcon } from "lucide-react"

// Sample expected deliveries
const expectedDeliveries = [
  {
    id: "PO-2023-0042",
    supplier: "Tech Components Inc.",
    expectedDate: "2023-03-24",
    items: [
      { id: 1, description: "Laptop Chargers", quantity: 5, received: 0 },
      { id: 2, description: "Wireless Keyboards", quantity: 3, received: 0 },
      { id: 3, description: "USB-C Cables", quantity: 10, received: 0 },
    ],
    status: "pending",
  },
  {
    id: "PO-2023-0039",
    supplier: "Office Supplies Co.",
    expectedDate: "2023-03-25",
    items: [
      { id: 1, description: "Printer Paper A4", quantity: 20, received: 0 },
      { id: 2, description: "Ballpoint Pens (Box)", quantity: 5, received: 0 },
      { id: 3, description: "Sticky Notes", quantity: 15, received: 0 },
    ],
    status: "pending",
  },
  {
    id: "PO-2023-0036",
    supplier: "Industrial Parts Ltd.",
    expectedDate: "2023-03-26",
    items: [
      { id: 1, description: "Stainless Steel Bolts M8", quantity: 200, received: 0 },
      { id: 2, description: "Rubber Gaskets", quantity: 50, received: 0 },
    ],
    status: "pending",
  },
]

// Sample recent receipts
const recentReceipts = [
  {
    id: "REC-2023-0015",
    poNumber: "PO-2023-0035",
    supplier: "Global Materials",
    receivedDate: "2023-03-22",
    receivedBy: "Maria Garcia",
    status: "complete",
  },
  {
    id: "REC-2023-0014",
    poNumber: "PO-2023-0032",
    supplier: "Tech Components Inc.",
    receivedDate: "2023-03-21",
    receivedBy: "John Smith",
    status: "partial",
  },
  {
    id: "REC-2023-0013",
    poNumber: "PO-2023-0030",
    supplier: "Office Supplies Co.",
    receivedDate: "2023-03-20",
    receivedBy: "David Wilson",
    status: "complete",
  },
  {
    id: "REC-2023-0012",
    poNumber: "PO-2023-0028",
    supplier: "Safety Equipment Inc.",
    receivedDate: "2023-03-18",
    receivedBy: "Sarah Brown",
    status: "complete",
  },
]

export default function ReceivingPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPO, setSelectedPO] = useState<string | null>(null)
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false)
  const [receivingItems, setReceivingItems] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const filteredDeliveries = expectedDeliveries.filter(
    (delivery) =>
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleReceiveClick = (poId: string) => {
    const po = expectedDeliveries.find((d) => d.id === poId)
    if (po) {
      setSelectedPO(poId)
      setReceivingItems(po.items.map((item) => ({ ...item, receiving: 0 })))
      setReceiveDialogOpen(true)
    }
  }

  const updateReceivingQuantity = (itemId: number, quantity: number) => {
    setReceivingItems(
      receivingItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, receiving: quantity }
        }
        return item
      }),
    )
  }

  const handleReceiveSubmit = () => {
    // In a real app, you would submit the receiving data to your API
    console.log("Receiving submitted", selectedPO, receivingItems)
    setReceiveDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "partial":
        return <Badge className="bg-blue-500">Partial</Badge>
      case "complete":
        return <Badge className="bg-green-500">Complete</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Receiving</h2>
        <p className="text-muted-foreground">Manage incoming deliveries and receive items</p>
      </div>

      <Tabs defaultValue="expected" className="space-y-4">
        <TabsList>
          <TabsTrigger value="expected">Expected Deliveries</TabsTrigger>
          <TabsTrigger value="recent">Recent Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="expected">
          <Card>
            <CardHeader>
              <CardTitle>Expected Deliveries</CardTitle>
              <CardDescription>Upcoming deliveries based on your purchase orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex w-full items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by PO number or supplier..."
                    className="h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {filteredDeliveries.length === 0 ? (
                  <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                    <p className="text-center text-muted-foreground">No expected deliveries found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDeliveries.map((delivery) => (
                      <Card key={delivery.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 p-4">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <CardTitle className="text-lg">{delivery.id}</CardTitle>
                              <CardDescription>{delivery.supplier}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Expected: {delivery.expectedDate}</span>
                              <Button onClick={() => handleReceiveClick(delivery.id)}>
                                <TruckIcon className="mr-2 h-4 w-4" />
                                Receive
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">Received</TableHead>
                                <TableHead className="text-right">Remaining</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {delivery.items.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.description}</TableCell>
                                  <TableCell className="text-right">{item.quantity}</TableCell>
                                  <TableCell className="text-right">{item.received}</TableCell>
                                  <TableCell className="text-right">{item.quantity - item.received}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Receipts</CardTitle>
              <CardDescription>Recently received deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt ID</TableHead>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Received Date</TableHead>
                    <TableHead>Received By</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReceipts.map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">{receipt.id}</TableCell>
                      <TableCell>{receipt.poNumber}</TableCell>
                      <TableCell>{receipt.supplier}</TableCell>
                      <TableCell>{receipt.receivedDate}</TableCell>
                      <TableCell>{receipt.receivedBy}</TableCell>
                      <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={receiveDialogOpen} onOpenChange={setReceiveDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Receive Items for {selectedPO}</DialogTitle>
            <DialogDescription>Enter the quantities you are receiving for each item</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="receive-all" />
              <Label htmlFor="receive-all">Receive all items in full</Label>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Expected</TableHead>
                  <TableHead className="text-right">Previously Received</TableHead>
                  <TableHead className="text-right">Receiving Now</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivingItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.received}</TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        min="0"
                        max={item.quantity - item.received}
                        value={item.receiving}
                        onChange={(e) => updateReceivingQuantity(item.id, Number.parseInt(e.target.value) || 0)}
                        className="w-20 text-right"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Enter any notes about this receipt" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReceiveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReceiveSubmit}>Complete Receipt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

