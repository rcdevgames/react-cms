import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LoginPage } from '@/pages/auth'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Dashboard } from '@/pages/dashboard'
import { Category, Products, ProductMaterial } from '@/pages/product'
import { Branches, Tables } from '@/pages/store'
import { UoM, StockOpName } from '@/pages/inventory'
import { UserList, UserForm } from '@/pages/store/users'
import Settings from '@/pages/settings'
import NotFound from '@/pages/error/404'
import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/components/ProtectedRoute'

const App = () => {
  const { logout, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-wrapper dark">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              
              {/* Product Routes */}
              <Route path="product">
                <Route path="category" element={<Category />} />
                <Route path="products" element={<Products />} />
                <Route path="materials" element={<ProductMaterial />} />
              </Route>

              {/* Store Routes */}
              <Route path="store">
                <Route path="branches" element={<Branches />} />
                <Route path="tables" element={<Tables />} />
                <Route path="users" element={<UserList />} />
                <Route path="users/add" element={<UserForm />} />
                <Route path="users/edit/:id" element={<UserForm />} />
              </Route>

              {/* Inventory Routes */}
              <Route path="inventory">
                <Route path="uom" element={<UoM />} />
                <Route path="stock-opname" element={<StockOpName />} />
              </Route>

              {/* Settings */}
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  {() => {
                    logout()
                    return <Navigate to="/login" replace />
                  }}
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </div>
  )
}

export default App