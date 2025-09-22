import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { inventoryService } from '@/services'

const UoMForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [uom, setUoM] = useState({
    name: '',
    abbreviation: '',
    description: '',
    isActive: true
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUoM = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await inventoryService.getUoMById(id)
      setUoM(response)
    } catch (err) {
      console.error('Error fetching UoM:', err)
      setError('Failed to fetch unit of measure')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchUoM()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      if (id) {
        await inventoryService.updateUoM(id, uom)
      } else {
        await inventoryService.createUoM(uom)
      }
      navigate('/inventory/uom')
    } catch (err) {
      console.error('Error saving UoM:', err)
      setError('Failed to save unit of measure')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    if (id) {
      fetchUoM()
    } else {
      setUoM({
        name: '',
        abbreviation: '',
        description: '',
        isActive: true
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Unit of Measure' : 'Create New Unit of Measure'}</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={uom.name}
            onChange={(e) => setUoM({ ...uom, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="abbreviation" className="block text-gray-700 text-sm font-bold mb-2">Abbreviation</label>
          <input
            type="text"
            id="abbreviation"
            value={uom.abbreviation}
            onChange={(e) => setUoM({ ...uom, abbreviation: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={uom.description}
            onChange={(e) => setUoM({ ...uom, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={uom.isActive}
              onChange={(e) => setUoM({ ...uom, isActive: e.target.checked })}
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
            disabled={isLoading}
            className={`text-white font-bold py-2 px-4 rounded ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Saving...' : `${id ? 'Update' : 'Create'} Unit of Measure`}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UoMForm