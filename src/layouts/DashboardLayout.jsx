import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/hooks/useAuth'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const getPageTitle = () => {
    const path = location.pathname
    const title = {
      '/': 'Dashboard',
      '/product/category': 'Product Categories',
      '/product/products': 'Products',
      '/product/materials': 'Product Materials',
      '/store/branches': 'Store Branches',
      '/store/tables': 'Store Tables',
      '/store/users': 'Store Users',
      '/store/users/add': 'Add Store User',
      '/store/users/edit': 'Edit Store User',
      '/inventory/uom': 'Units of Measure',
      '/inventory/stock-opname': 'Stock Opname',
      '/settings': 'Settings'
    }
    return title[path];
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isAuthenticated()) {
    return null // or a loading spinner
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Header */}
        <Header
          pageTitle={getPageTitle()}
          onSidebarToggle={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          onSidebarCollapseToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          userEmail={""}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default DashboardLayout