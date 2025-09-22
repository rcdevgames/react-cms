import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { storeService } from '@/services'

const BranchForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [branch, setBranch] = useState({
    name: '',
    address: '',
    phone: '',
    manager: '',
    isActive: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchBranch()
    }
  }, [id])

  const fetchBranch = async () => {
    setIsLoading(true)
    try {
      const response = await storeService.getBranchById(id)
      setBranch(response.data)
    } catch (error) {
      console.error('Error fetching branch:', error)
      setError('Error fetching branch details')
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
        await storeService.updateBranch(id, branch)
      } else {
        await storeService.createBranch(branch)
      }
      navigate('/store/branches')
    } catch (error) {
      console.error('Error saving branch:', error)
      setError('Error saving branch. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    if (id) {
      fetchBranch()
    } else {
      setBranch({
        name: '',
        address: '',
        phone: '',
        manager: '',
        isActive: true
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Branch' : 'Create New Branch'}</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Branch Name</label>
          <input
            type="text"
            id="name"
            value={branch.name}
            onChange={(e) => setBranch({ ...branch, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <textarea
            id="address"
            value={branch.address}
            onChange={(e) => setBranch({ ...branch, address: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
          <input
            type="tel"
            id="phone"
            value={branch.phone}
            onChange={(e) => setBranch({ ...branch, phone: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="manager" className="block text-gray-700 text-sm font-bold mb-2">Manager</label>
          <input
            type="text"
            id="manager"
            value={branch.manager}
            onChange={(e) => setBranch({ ...branch, manager: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={branch.isActive}
              onChange={(e) => setBranch({ ...branch, isActive: e.target.checked })}
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
            {id ? 'Update' : 'Create'} Branch
          </button>
        </div>
      </form>
    </div>
  )
}

export default BranchForm