import axios, { InternalAxiosRequestConfig } from 'axios'

import { memoizedRefreshToken } from './refreshToken'

axios.defaults.baseURL = 'http://localhost:8000/api/'

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('access_token') || ''
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true
      await memoizedRefreshToken()
      return axios(config)
    }
    return Promise.reject(error)
  },
)

export const httpClientPrivate = axios
