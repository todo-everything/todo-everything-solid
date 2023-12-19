import {httpClientPrivate} from './httpClientPrivate'
import memoize from 'memoize'
import axios from 'axios'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const ALL_TOKENS = [
  ACCESS_TOKEN,
  REFRESH_TOKEN
]
const TOKENS: { [key: string]: string } = {
  access: ACCESS_TOKEN,
  refresh: REFRESH_TOKEN,
}
const getUserFunc = async () => {
  const res = await httpClientPrivate.get('/account/me/')
  return res?.data
}

const AuthApi = {
  clearToken: (name: string) => {
    const tokenName = TOKENS?.[name]
    if (tokenName) {
      localStorage.removeItem(tokenName)
    }
  },

  clearAllTokens: () => {
    ALL_TOKENS.forEach((token) => localStorage.removeItem(token))
    axios.defaults.headers.common['Authorization'] = null
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    const res = await httpClientPrivate.post('/token/blacklist/', {
      refresh: refreshToken,
    })

    // TODO: Check res status code, etc.

    ALL_TOKENS.forEach((token) => localStorage.removeItem(token))
    axios.defaults.headers.common['Authorization'] = null
  },

  getUser: memoize(getUserFunc, {maxAge: 10000})
}

export default AuthApi