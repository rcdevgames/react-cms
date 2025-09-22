import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { storeService } from '@/services'

const TableForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [table, setTable] = useState({
    tableNumber: '',
    capacity: '',
    location: '',
    isActive: true,
    branchId: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [branches, setBranches] = useState([])

  // Fetch branches for dropdown
  useEffect(() => {
    fetchBranches()
  }, [])

  // Fetch table data if editing
  useEffect(() => {
    if (id) {
      fetchTable()
    }
  }, [id])

  const fetchBranches = async () => {
    try {
      const response = await storeService.getBranches({ perPage: 100 })
      setBranches(response.data)
    } catch (error) {
      console.error('Error fetching branches:', error)
      setError('Error fetching branches')
    }
  }

  const fetchTable = async () => {
    setIsLoading(true)
    try {
      const response = await storeService.getTableById(id)
      setTable(response.data)
    } catch (error) {
      console.error('Error fetching table:', error)
      setError('Error fetching table details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (id) {
        await storeService.updateTable(id, table)
      } else {
        await storeService.createTable(table)
      }
      navigate('/store/tables')
    } catch (error) {
      console.error('Error saving table:', error)
      setError('Error saving table. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    if (id) {
      fetchTable()
    } else {
      setTable({
        tableNumber: '',
        capacity: '',
        location: '',
        isActive: true,
        branchId: ''
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Table' : 'Create New Table'}</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="tableNumber" className="block text-gray-700 text-sm font-bold mb-2">Table Number</label>
          <input
            type="text"
            id="tableNumber"
            value={table.tableNumber}
            onChange={(e) => setTable({ ...table, tableNumber: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">Capacity</label>
          <input
            type="number"
            id="capacity"
            value={table.capacity}
            onChange={(e) => setTable({ ...table, capacity: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <select
            id="location"
            value={table.location}
            onChange={(e) => setTable({ ...table, location: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Location</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Terrace">Terrace</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="branchId" className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
          <select
            id="branchId"
            value={table.branchId}
            onChange={(e) => setTable({ ...table, branchId: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={table.isActive}
              onChange={(e) => setTable({ ...table, isActive: e.target.checked })}
              className="mr-2"
            />
            <span className="text-gray-700 text-sm font-bold">Active</span>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {id ? 'Update' : 'Create'} Table
          </button>
        </div>
      </form>
    </div>
  )
}

export default TableForm