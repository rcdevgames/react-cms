import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '@/components/Table/DataTable'
import TablePagination from '@/components/Table/TablePagination'
import { inventoryService } from '@/services'

const UoMs = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [uoms, setUoMs] = useState([])
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
      key: 'abbreviation',
      label: 'Abbreviation',
      sortable: true,
      render: (uom) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">
          {uom.abbreviation}
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
      render: (uom) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          uom.isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {uom.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (uom) => (
        <>
          <Link
            to={`/inventory/uom/edit/${uom.id}`}
            className="text-blue-500 hover:text-blue-600 mr-2"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(uom.id)}
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

  // Fetch UoMs from API
  const fetchUoMs = async () => {
    setIsLoading(true)
    try {
      const response = await inventoryService.getUoMs({
        page: currentPage,
        perPage: itemsPerPage,
        search: searchQuery,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction
      })
      setUoMs(response.data)
      setTotalItems(response.total)
    } catch (error) {
      console.error('Error fetching UoMs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Effect untuk fetch data ketika parameter berubah
  useEffect(() => {
    fetchUoMs()
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
    if (window.confirm('Are you sure you want to delete this unit of measure?')) {
      try {
        await inventoryService.deleteUoM(id)
        fetchUoMs() // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting UoM:', error)
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
        <h1 className="text-2xl font-bold">Units of Measure</h1>
        <Link
          to="/inventory/uom/add"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Unit of Measure
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={Array.isArray(uoms) ? uoms : []}
        sortConfig={sortConfig}
        onSort={handleSort}
        isLoading={isLoading}
        showSearch={true}
        searchPlaceholder="Search units of measure..."
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

export default UoMs