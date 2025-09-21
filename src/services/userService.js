import api from './api'

export const userService = {
  // Get users with pagination, search, and sort
  getUsers: async (params) => {
    const { page, perPage, search, sortBy, sortDirection } = params
    const response = await api.get('/users', {
      params: {
        page,
        per_page: perPage,
        search,
        sort_by: sortBy,
        sort_direction: sortDirection
      }
    })
    return response.data
  },

  // Get single user
  getUser: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  // Create user
  createUser: async (userData) => {
    const response = await api.post('/users', userData)
    return response.data
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  }
}