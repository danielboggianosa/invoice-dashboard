import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import DashboardLayout from "./layouts/DashboardLayout"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import PurchaseOrdersPage from "./pages/PurchaseOrdersPage"
import NewPurchaseOrderPage from "./pages/NewPurchaseOrderPage"
import SuppliersPage from "./pages/SuppliersPage"
import ReceivingPage from "./pages/ReceivingPage"
import PurchasingReportsPage from "./pages/PurchasingReportsPage"
import InventoryPage from "./pages/InventoryPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard routes with layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="purchase-orders" element={<PurchaseOrdersPage />} />
          <Route path="purchase-orders/new" element={<NewPurchaseOrderPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="receiving" element={<ReceivingPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="reports/purchasing" element={<PurchasingReportsPage />} />
          <Route path="reports/suppliers" element={<Navigate to="/dashboard/reports/purchasing" />} />
          <Route path="reports/inventory" element={<Navigate to="/dashboard/inventory" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App

