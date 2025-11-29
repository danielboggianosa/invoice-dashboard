import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import DashboardLayout from "./layouts/DashboardLayout"
import LoginPage from "./react-pages/LoginPage"
import HomePage from "./react-pages/HomePage"
import DashboardPage from "./react-pages/DashboardPage"
import PurchaseOrdersPage from "./react-pages/PurchaseOrdersPage"
import NewPurchaseOrderPage from "./react-pages/NewPurchaseOrderPage"
import SuppliersPage from "./react-pages/SuppliersPage"
import ReceivingPage from "./react-pages/ReceivingPage"
import PurchasingReportsPage from "./react-pages/PurchasingReportsPage"
import InventoryPage from "./react-pages/InventoryPage"

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

