import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '@/components/Table/DataTable'
import TablePagination from '@/components/Table/TablePagination'
import { inventoryService } from '@/services'

const StockOpNames = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [stockOpNames, setStockOpNames] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [totalItems, setTotalItems] = useState(0)

  const columns = useMemo(() => [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (stockOpName) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          stockOpName.type === 'Stock In'
            ? 'bg-green-100 text-green-800'
            : stockOpName.type === 'Stock Out'
            ? 'bg-red-100 text-red-800'
            : stockOpName.type === 'Stock Count'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {stockOpName.type}
        </span>
      )
    },
    {
      key: 'description',
      label: 'Description',
      sortable: true,
    },
    {
      key: 'isActive',
      label: 'Status',
      sortable: true,
      render: (stockOpName) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          stockOpName.isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {stockOpName.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (stockOpName) => (
        <>
          <Link
            to={`/inventory/stock-opname/edit/${stockOpName.id}`}
            className="text-blue-500 hover:text-blue-600 mr-2"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(stockOpName.id)}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </>
      )
    }
  ], [])

  // Fungsi untuk sorting
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })

    // Nanti di sini bisa ditambahkan call API dengan parameter sort
  }

  // Fetch stock opnames from API
  const fetchStockOpNames = async () => {
    setIsLoading(true)
    try {
      const response = await inventoryService.getStockOpNames({
        page: currentPage,
        perPage: itemsPerPage,
        search: searchQuery,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction
      })
      setStockOpNames(response.data)
      setTotalItems(response.total)
    } catch (error) {
      console.error('Error fetching stock opnames:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Effect untuk fetch data ketika parameter berubah
  useEffect(() => {
    fetchStockOpNames()
  }, [currentPage, itemsPerPage, searchQuery, sortConfig])

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stock opname?')) {
      try {
        await inventoryService.deleteStockOpName(id)
        fetchStockOpNames() // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting stock opname:', error)
      }
    }
  }

  // Render sort arrow
  const renderSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
    }
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stock Opnames</h1>
        <Link
          to="/inventory/stock-opname/add"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Stock Opname
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={Array.isArray(stockOpNames) ? stockOpNames : []}
        sortConfig={sortConfig}
        onSort={handleSort}
        isLoading={isLoading}
        showSearch={true}
        searchPlaceholder="Search stock opnames..."
        searchValue={searchQuery}
        onSearch={handleSearch}
        showItemsPerPage={true}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value)
          setCurrentPage(1)
        }}
        itemsPerPageOptions={[5, 10, 20]}
      />

      <TablePagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={typeof totalItems === 'number' ? totalItems : 0}
        onPageChange={handlePageChange}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value)
          setCurrentPage(1)
        }}
      />
    </div>
  )
}

export default StockOpNames