import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { inventoryService } from '@/services'

const StockOpNameForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [stockOpName, setStockOpName] = useState({
    name: '',
    description: '',
    type: 'Stock In',
    isActive: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchStockOpName()
    }
  }, [id])

  const fetchStockOpName = async () => {
    setIsLoading(true)
    try {
      const response = await inventoryService.getStockOpNameById(id)
      setStockOpName(response.data)
    } catch (error) {
      console.error('Error fetching stock opname:', error)
      setError('Error fetching stock opname details')
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
        await inventoryService.updateStockOpName(id, stockOpName)
      } else {
        await inventoryService.createStockOpName(stockOpName)
      }
      navigate('/inventory/stock-opname')
    } catch (error) {
      console.error('Error saving stock opname:', error)
      setError('Error saving stock opname. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    if (id) {
      fetchStockOpName()
    } else {
      setStockOpName({
        name: '',
        description: '',
        type: 'Stock In',
        isActive: true
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Stock Opname' : 'Create New Stock Opname'}</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={stockOpName.name}
            onChange={(e) => setStockOpName({ ...stockOpName, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
          <select
            id="type"
            value={stockOpName.type}
            onChange={(e) => setStockOpName({ ...stockOpName, type: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Stock In">Stock In</option>
            <option value="Stock Out">Stock Out</option>
            <option value="Stock Count">Stock Count</option>
            <option value="Adjustment">Adjustment</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={stockOpName.description}
            onChange={(e) => setStockOpName({ ...stockOpName, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={stockOpName.isActive}
              onChange={(e) => setStockOpName({ ...stockOpName, isActive: e.target.checked })}
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
            {id ? 'Update' : 'Create'} Stock Opname
          </button>
        </div>
      </form>
    </div>
  )
}

export default StockOpNameForm