import api from '@/utils/api'

export const inventoryService = {
  // Stock OpName
  getStockOpNames: async (params) => {
    const response = await api.get('/stock-opnames', { params })
    return response.data
  },
  getStockOpNameById: async (id) => {
    const response = await api.get(`/stock-opnames/${id}`)
    return response.data
  },
  createStockOpName: async (data) => {
    const response = await api.post('/stock-opnames', data)
    return response.data
  },
  updateStockOpName: async (id, data) => {
    const response = await api.put(`/stock-opnames/${id}`, data)
    return response.data
  },
  deleteStockOpName: async (id) => {
    const response = await api.delete(`/stock-opnames/${id}`)
    return response.data
  },

  // UoM (Unit of Measure)
  getUoMs: async (params) => {
    const response = await api.get('/uoms', { params })
    return response.data
  },
  getUoMById: async (id) => {
    const response = await api.get(`/uoms/${id}`)
    return response.data
  },
  createUoM: async (data) => {
    const response = await api.post('/uoms', data)
    return response.data
  },
  updateUoM: async (id, data) => {
    const response = await api.put(`/uoms/${id}`, data)
    return response.data
  },
  deleteUoM: async (id) => {
    const response = await api.delete(`/uoms/${id}`)
    return response.data
  }
}