import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '@/services'

const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    isActive: true,
    sku: ''
  })
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch categories for dropdown
  useEffect(() => {
    fetchCategories()
  }, [])

  // Fetch product data if editing
  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories({ perPage: 100 })
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Error fetching categories')
    }
  }

  const fetchProduct = async () => {
    setIsLoading(true)
    try {
      const response = await productService.getProductById(id)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
      setError('Error fetching product details')
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
        await productService.updateProduct(id, product)
      } else {
        await productService.createProduct(product)
      }
      navigate('/product/products')
    } catch (error) {
      console.error('Error saving product:', error)
      setError('Error saving product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    if (id) {
      fetchProduct()
    } else {
      setProduct({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        isActive: true,
        sku: ''
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Product' : 'Create New Product'}</h1>
      
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
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sku" className="block text-gray-700 text-sm font-bold mb-2">SKU</label>
          <input
            type="text"
            id="sku"
            value={product.sku}
            onChange={(e) => setProduct({ ...product, sku: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            id="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
            id="categoryId"
            value={product.categoryId}
            onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={product.isActive}
              onChange={(e) => setProduct({ ...product, isActive: e.target.checked })}
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
            {isLoading ? 'Saving...' : (id ? 'Update' : 'Create') + ' Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm