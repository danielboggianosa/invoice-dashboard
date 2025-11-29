"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  FileText,
  Save,
  X,
  Plus,
  Upload,
  Shield,
} from "lucide-react"

export default function NewSupplierPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    category: "",
    taxId: "",
    website: "",

    // Contact Information
    contactPerson: "",
    email: "",
    phone: "",
    alternatePhone: "",

    // Address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Financial Information
    paymentTerms: "",
    creditLimit: "",
    bankName: "",
    bankAccount: "",

    // Delivery Information
    leadTime: "",
    minimumOrder: "",
    shippingMethods: [],

    // Additional Information
    notes: "",
    certifications: [],
    preferredSupplier: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    setLoading(false)

    // Redirect to suppliers list
    router.push("/dashboard/suppliers")
  }

  const handleCancel = () => {
    router.push("/dashboard/suppliers")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Add New Supplier</h2>
          <p className="text-muted-foreground">Create a new supplier profile</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Supplier"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="contact">Contact & Address</TabsTrigger>
            <TabsTrigger value="financial">Financial Details</TabsTrigger>
            <TabsTrigger value="delivery">Delivery & Terms</TabsTrigger>
            <TabsTrigger value="additional">Additional Info</TabsTrigger>
          </TabsList>

          {/* Basic Information */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  <CardTitle>Basic Information</CardTitle>
                </div>
                <CardDescription>Essential supplier details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Supplier Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g., Tech Components Inc."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                        <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                        <SelectItem value="Hardware">Hardware</SelectItem>
                        <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                        <SelectItem value="Safety">Safety Equipment</SelectItem>
                        <SelectItem value="Services">Services</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                    <Input
                      id="taxId"
                      placeholder="e.g., 123-45-6789"
                      value={formData.taxId}
                      onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.example.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preferred"
                    checked={formData.preferredSupplier}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, preferredSupplier: checked as boolean })
                    }
                  />
                  <Label htmlFor="preferred" className="text-sm font-normal">
                    Mark as Preferred Supplier
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact & Address */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <CardTitle>Contact & Address Information</CardTitle>
                </div>
                <CardDescription>How to reach this supplier</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Contact Person</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Full Name</Label>
                      <Input
                        id="contactPerson"
                        placeholder="John Doe"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone">Alternate Phone</Label>
                      <Input
                        id="alternatePhone"
                        type="tel"
                        placeholder="+1 (555) 987-6543"
                        value={formData.alternatePhone}
                        onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Address</h3>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Input
                          id="state"
                          placeholder="NY"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="10001"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => setFormData({ ...formData, country: value })}
                        >
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="MX">Mexico</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Details */}
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <CardTitle>Financial Details</CardTitle>
                </div>
                <CardDescription>Payment terms and banking information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select
                      value={formData.paymentTerms}
                      onValueChange={(value) => setFormData({ ...formData, paymentTerms: value })}
                    >
                      <SelectTrigger id="paymentTerms">
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NET30">Net 30</SelectItem>
                        <SelectItem value="NET60">Net 60</SelectItem>
                        <SelectItem value="NET90">Net 90</SelectItem>
                        <SelectItem value="COD">Cash on Delivery</SelectItem>
                        <SelectItem value="PREPAID">Prepaid</SelectItem>
                        <SelectItem value="2/10NET30">2/10 Net 30</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creditLimit">Credit Limit ($)</Label>
                    <Input
                      id="creditLimit"
                      type="number"
                      placeholder="50000"
                      value={formData.creditLimit}
                      onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      placeholder="First National Bank"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankAccount">Bank Account Number</Label>
                    <Input
                      id="bankAccount"
                      placeholder="****1234"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery & Terms */}
          <TabsContent value="delivery">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <CardTitle>Delivery & Terms</CardTitle>
                </div>
                <CardDescription>Shipping and order information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="leadTime">Lead Time (days)</Label>
                    <Input
                      id="leadTime"
                      type="number"
                      placeholder="5"
                      value={formData.leadTime}
                      onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minimumOrder">Minimum Order Value ($)</Label>
                    <Input
                      id="minimumOrder"
                      type="number"
                      placeholder="500"
                      value={formData.minimumOrder}
                      onChange={(e) => setFormData({ ...formData, minimumOrder: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Shipping Methods</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    {["Standard Ground", "Express", "Air Freight", "Sea Freight"].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox id={method.toLowerCase().replace(/\s/g, "-")} />
                        <Label
                          htmlFor={method.toLowerCase().replace(/\s/g, "-")}
                          className="text-sm font-normal"
                        >
                          {method}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional Information */}
          <TabsContent value="additional">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <CardTitle>Additional Information</CardTitle>
                </div>
                <CardDescription>Notes, certifications, and documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes about this supplier..."
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Certifications</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    {["ISO 9001", "ISO 14001", "OHSAS 18001", "FSC Certified", "Fair Trade", "Organic"].map(
                      (cert) => (
                        <div key={cert} className="flex items-center space-x-2">
                          <Checkbox id={cert.toLowerCase().replace(/\s/g, "-")} />
                          <Label
                            htmlFor={cert.toLowerCase().replace(/\s/g, "-")}
                            className="text-sm font-normal"
                          >
                            {cert}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Documents</Label>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload W-9 Form
                    </Button>
                    <Button type="button" variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Insurance Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
