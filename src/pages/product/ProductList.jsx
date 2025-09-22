import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '@/components/Table/DataTable'
import TablePagination from '@/components/Table/TablePagination'
import { productService } from '@/services'

const Products = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
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
      key: 'sku',
      label: 'SKU',
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (product) => (
        <span className="font-medium">
          Rp {parseInt(product.price).toLocaleString('id-ID')}
        </span>
      )
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (product) => (
        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
          {product.category}
        </span>
      )
    },
    {
      key: 'isActive',
      label: 'Status',
      sortable: true,
      render: (product) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          product.isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {product.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (product) => (
        <>
          <Link
            to={`/product/products/edit/${product.id}`}
            className="text-blue-500 hover:text-blue-600 mr-2"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(product.id)}
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

  // Fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await productService.getProducts({
        page: currentPage,
        perPage: itemsPerPage,
        search: searchQuery,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction
      })
      setProducts(response.data)
      setTotalItems(response.total)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Effect untuk fetch data ketika parameter berubah
  useEffect(() => {
    fetchProducts()
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
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id)
        fetchProducts() // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting product:', error)
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
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/product/products/add"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Product
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={Array.isArray(products) ? products : []}
        sortConfig={sortConfig}
        onSort={handleSort}
        isLoading={isLoading}
        showSearch={true}
        searchPlaceholder="Search products..."
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

export default Products