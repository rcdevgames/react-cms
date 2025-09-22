import api from "@/utils/api";

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },
  
  getMe: async () => {
    const response = await api.get('/me')
    return response.data
  },

  refreshToken: async (refresh_token) => {
    const response = await api.post('/auth/refresh_token', { refresh_token })
    return response.data
  }
}

export default authService;