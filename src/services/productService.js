import api from '@/utils/api'

export const productService = {
  // Categories
  getCategories: async (params) => {
    const response = await api.get('/categories', { params })
    return response.data
  },
  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`)
    return response.data
  },
  createCategory: async (data) => {
    const response = await api.post('/categories', data)
    return response.data
  },
  updateCategory: async (id, data) => {
    const response = await api.put(`/categories/${id}`, data)
    return response.data
  },
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`)
    return response.data
  },

  // Products
  getProducts: async (params) => {
    const response = await api.get('/products', { params })
    return response.data
  },
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },
  createProduct: async (data) => {
    const response = await api.post('/products', data)
    return response.data
  },
  updateProduct: async (id, data) => {
    const response = await api.put(`/products/${id}`, data)
    return response.data
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },

  // Product Materials
  getProductMaterials: async (params) => {
    const response = await api.get('/product-materials', { params })
    return response.data
  },
  getProductMaterialById: async (id) => {
    const response = await api.get(`/product-materials/${id}`)
    return response.data
  },
  createProductMaterial: async (data) => {
    const response = await api.post('/product-materials', data)
    return response.data
  },
  updateProductMaterial: async (id, data) => {
    const response = await api.put(`/product-materials/${id}`, data)
    return response.data
  },
  deleteProductMaterial: async (id) => {
    const response = await api.delete(`/product-materials/${id}`)
    return response.data
  }
}