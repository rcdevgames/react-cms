import api from '@/utils/api'

const userService = {
  // Get users with pagination and search
  getUsers: async (params) => {
    const { page, perPage, search } = params

    const response = await api.get('/users', {
      params: {
        page,
        limit: perPage,
        search
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
  },

  // Role user
  getRole: async (params) => {
    const { page, perPage } = params
    const response = await api.get('/roles', {
      params: {
        page,
        per_page: perPage
      }
    })
    return response.data
  }
}

export default userService;