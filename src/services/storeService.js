import api from '@/utils/api'

export const storeService = {
  // Branches
  getBranches: async (params) => {
    const response = await api.get('/branches', { params })
    return response.data
  },
  getBranchById: async (id) => {
    const response = await api.get(`/branches/${id}`)
    return response.data
  },
  createBranch: async (data) => {
    const response = await api.post('/branches', data)
    return response.data
  },
  updateBranch: async (id, data) => {
    const response = await api.put(`/branches/${id}`, data)
    return response.data
  },
  deleteBranch: async (id) => {
    const response = await api.delete(`/branches/${id}`)
    return response.data
  },

  // Tables
  getTables: async (params) => {
    const response = await api.get('/tables', { params })
    return response.data
  },
  getTableById: async (id) => {
    const response = await api.get(`/tables/${id}`)
    return response.data
  },
  createTable: async (data) => {
    const response = await api.post('/tables', data)
    return response.data
  },
  updateTable: async (id, data) => {
    const response = await api.put(`/tables/${id}`, data)
    return response.data
  },
  deleteTable: async (id) => {
    const response = await api.delete(`/tables/${id}`)
    return response.data
  }
}