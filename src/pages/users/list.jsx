import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '@/services/userService'

const Users = () => {
  // State untuk data dan pagination
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [totalItems, setTotalItems] = useState(0)

  // Fungsi untuk sorting
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    
    // Nanti di sini bisa ditambahkan call API dengan parameter sort
  }

  // Fetch users from API
  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await userService.getUsers({
        page: currentPage,
        perPage: itemsPerPage,
        search: searchQuery,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction
      })
      setUsers(response.data)
      setTotalItems(response.total)
      setFilteredUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Effect untuk fetch data ketika parameter berubah
  useEffect(() => {
    fetchUsers()
  }, [currentPage, itemsPerPage, searchQuery, sortConfig])

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Nanti di sini bisa ditambahkan call API dengan parameter page
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
    // Nanti di sini bisa ditambahkan call API dengan parameter search
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
          to="/users/add"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New User
        </Link>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-700 bg-gray-800 rounded py-2 px-3 w-64 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value))
            setCurrentPage(1)
          }}
          className="border border-gray-700 bg-gray-800 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('name')}
                className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-700 cursor-pointer hover:bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  Name {renderSortArrow('name')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('email')}
                className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-700 cursor-pointer hover:bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  Email {renderSortArrow('email')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('role')}
                className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-700 cursor-pointer hover:bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  Role {renderSortArrow('role')}
                </div>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700 transition-colors duration-200">
                <td className="py-3 px-4 text-gray-200 border-b border-gray-700">
                  {user.name}
                </td>
                <td className="py-3 px-4 text-gray-200 border-b border-gray-700">
                  {user.email}
                </td>
                <td className="py-3 px-4 text-gray-200 border-b border-gray-700">
                  {user.role}
                </td>
                <td className="py-3 px-4 text-gray-200 border-b border-gray-700">
                  <Link
                    to={`/users/edit/${user.id}`}
                    className="text-blue-500 hover:text-blue-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-gray-300">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= totalItems}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Users