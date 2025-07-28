import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const apiEndpoints = {
  // Auth endpoints
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh',
  
  // User endpoints
  users: '/users',
  userById: (id: string) => `/users/${id}`,
  
  // Dashboard endpoints
  dashboard: '/dashboard',
  analytics: '/analytics',
  
  // System endpoints
  health: '/health',
  settings: '/settings',
}

// API functions
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post(apiEndpoints.login, credentials),
  
  register: (userData: { name: string; email: string; password: string }) =>
    api.post(apiEndpoints.register, userData),
  
  logout: () => api.post(apiEndpoints.logout),
  
  refreshToken: () => api.post(apiEndpoints.refreshToken),
}

export const userAPI = {
  getUsers: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get(apiEndpoints.users, { params }),
  
  getUserById: (id: string) => api.get(apiEndpoints.userById(id)),
  
  createUser: (userData: any) => api.post(apiEndpoints.users, userData),
  
  updateUser: (id: string, userData: any) =>
    api.put(apiEndpoints.userById(id), userData),
  
  deleteUser: (id: string) => api.delete(apiEndpoints.userById(id)),
}

export const dashboardAPI = {
  getDashboardData: () => api.get(apiEndpoints.dashboard),
  
  getAnalytics: (params?: { period?: string }) =>
    api.get(apiEndpoints.analytics, { params }),
}

export const systemAPI = {
  getHealth: () => api.get(apiEndpoints.health),
  
  getSettings: () => api.get(apiEndpoints.settings),
  
  updateSettings: (settings: any) => api.put(apiEndpoints.settings, settings),
}

export default api