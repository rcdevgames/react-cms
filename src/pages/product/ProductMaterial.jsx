import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '@/services'

const ProductMaterialForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [material, setMaterial] = useState({
    name: '',
    description: '',
    unit: 'kg',
    minStock: '',
    isActive: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchMaterial()
    }
  }, [id])

  const fetchMaterial = async () => {
    setIsLoading(true)
    try {
      const response = await productService.getProductMaterialById(id)
      setMaterial(response.data)
    } catch (error) {
      console.error('Error fetching material:', error)
      setError('Error fetching material details')
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
        await productService.updateProductMaterial(id, material)
      } else {
        await productService.createProductMaterial(material)
      }
      navigate('/product/materials')
    } catch (error) {
      console.error('Error saving material:', error)
      setError('Error saving material. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    if (id) {
      fetchMaterial()
    } else {
      setMaterial({
        name: '',
        description: '',
        unit: 'kg',
        minStock: '',
        isActive: true
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Material' : 'Create New Material'}</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={material.name}
            onChange={(e) => setMaterial({ ...material, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={material.description}
            onChange={(e) => setMaterial({ ...material, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="unit" className="block text-gray-700 text-sm font-bold mb-2">Unit</label>
          <select
            id="unit"
            value={material.unit}
            onChange={(e) => setMaterial({ ...material, unit: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="kg">Kilogram (kg)</option>
            <option value="liter">Liter (L)</option>
            <option value="pcs">Pieces (pcs)</option>
            <option value="pack">Pack</option>
            <option value="bottle">Bottle</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="minStock" className="block text-gray-700 text-sm font-bold mb-2">Minimum Stock</label>
          <input
            type="number"
            id="minStock"
            value={material.minStock}
            onChange={(e) => setMaterial({ ...material, minStock: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={material.isActive}
              onChange={(e) => setMaterial({ ...material, isActive: e.target.checked })}
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
            disabled={isLoading}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (id ? 'Update' : 'Create') + ' Material'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductMaterialForm