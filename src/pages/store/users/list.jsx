import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataTable from '@/components/Table/DataTable'
import TablePagination from '@/components/Table/TablePagination'
import { userService } from '@/services'

const Users = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [totalItems, setTotalItems] = useState(0)

  const columns = useMemo(() => [
    {
      key: 'Fullname',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'Email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role_name',
      label: 'Role',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (user) => (
        <div className="flex items-center space-x-2">
          <Link
            to={`/store/users/edit/${user.id}`}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            title="Edit User"
          >
            <FontAwesomeIcon icon="edit" className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(user.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Delete User"
          >
            <FontAwesomeIcon icon="trash-alt" className="w-4 h-4" />
          </button>
        </div>
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
  }

  // Effect untuk sorting (client-side)
  useEffect(() => {
    if (users.length > 0 && sortConfig.key) {
      const sortedUsers = [...users].sort((a, b) => {
        const aValue = a[sortConfig.key] || ''
        const bValue = b[sortConfig.key] || ''

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
      setUsers(sortedUsers)
    }
  }, [sortConfig])

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const params = {
        page: currentPage,
        perPage: itemsPerPage,
        search: searchQuery
      }

      const response = await userService.getUsers(params)

      // Extract data from the correct response structure
      const usersData = response.data?.rows || []
      const totalPages = response.data?.total_page || 0

      setUsers(usersData)
      setTotalItems(totalPages)
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
      setTotalItems(0)
    } finally {
      setIsLoading(false)
    }
  }

  // Effect untuk fetch data ketika parameter berubah
  useEffect(() => {
    fetchUsers()
  }, [currentPage, itemsPerPage, searchQuery])

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Nanti di sini bisa ditambahkan call API dengan parameter page
  }

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id)
        fetchUsers() // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting user:', error)
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
        <h1 className="text-2xl font-bold">Users</h1>
        <Link
          to="/store/users/add"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New User
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={users}
        sortConfig={sortConfig}
        onSort={handleSort}
        isLoading={isLoading}
        showSearch={true}
        searchPlaceholder="Search users..."
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
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value)
          setCurrentPage(1)
        }}
      />
    </div>
  )
}

export default Users