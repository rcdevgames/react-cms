import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const menuItems = [
  {
    group: 'Menu Utama',
    items: [
      {
        name: 'Dashboard',
        path: '/',
        icon: <FontAwesomeIcon icon="tachometer-alt" className="w-5 h-5" />,
      },
    ],
  },
  {
    group: 'Menu & Produk',
    items: [
      {
        name: 'Kategori',
        path: '/product/category',
        icon: <FontAwesomeIcon icon="tags" className="w-5 h-5" />,
      },
      {
        name: 'Daftar Menu',
        path: '/product/products',
        icon: <FontAwesomeIcon icon="utensils" className="w-5 h-5" />,
      },
      {
        name: 'Bahan Menu',
        path: '/product/materials',
        icon: <FontAwesomeIcon icon="carrot" className="w-5 h-5" />,
      },
    ],
  },
  {
    group: 'Manajemen Toko',
    items: [
      {
        name: 'Cabang Toko',
        path: '/store/branches',
        icon: <FontAwesomeIcon icon="store" className="w-5 h-5" />,
      },
      {
        name: 'Daftar Meja',
        path: '/store/tables',
        icon: <FontAwesomeIcon icon="border-all" className="w-5 h-5" />,
      },
      {
        name: 'Pengguna',
        path: '/store/users',
        icon: <FontAwesomeIcon icon="users" className="w-5 h-5" />,
      },
    ],
  },
  {
    group: 'Persediaan',
    items: [
      {
        name: 'Satuan',
        path: '/inventory/uom',
        icon: <FontAwesomeIcon icon="balance-scale" className="w-5 h-5" />,
      },
      {
        name: 'Stok Opname',
        path: '/inventory/stock-opname',
        icon: <FontAwesomeIcon icon="clipboard-check" className="w-5 h-5" />,
      },
    ],
  },
  {
    group: 'Pengaturan',
    items: [
      {
        name: 'Pengaturan',
        path: '/settings',
        icon: <FontAwesomeIcon icon="cog" className="w-5 h-5" />,
      },
    ],
  },
]

const Sidebar = ({ isOpen, isCollapsed, onClose, onToggleCollapse }) => {
  const location = useLocation()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } hidden lg:block`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center justify-between h-16 ${isCollapsed ? 'px-2' : 'px-4'} border-b border-gray-700`}>
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon icon="utensils" className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Paypos™</span>
              </div>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FontAwesomeIcon 
                icon="bars"
                className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} py-6 space-y-6 overflow-y-auto`}>
            {menuItems.map((group, groupIndex) => (
              <div key={groupIndex}>
                {!isCollapsed && (
                  <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {group.group}
                  </h3>
                )}
                <div className="space-y-1">
                  {group.items.map((item, itemIndex) => (
                    <NavLink
                      key={itemIndex}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-2 text-sm font-medium rounded-lg transition-colors group ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`
                      }
                      title={isCollapsed ? item.name : ''}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon="utensils" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Paypos™</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon="times" className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {menuItems.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {group.group}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item, itemIndex) => (
                    <NavLink
                      key={itemIndex}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`
                      }
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="ml-3">{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar