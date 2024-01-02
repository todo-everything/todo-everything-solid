import memoize from 'memoize'
import { httpClient } from './httpClient'

type Response = {
  data: {
    access: string
  }
}

const refreshTokenFn = async () => {
  console.log('Refreshing token!')
  const accessToken = localStorage.getItem('access_token')
  const refreshToken = localStorage.getItem('refresh_token')

  try {
    const response = await httpClient.post('/token/refresh/', {
      refresh: refreshToken,
    })

    console.log('Refresh token res: ', { response })
    const {
      data: { access },
    }: Response = response

    if (!access) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }

    localStorage.setItem('access_token', access)

    return access
  } catch (error) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}

const maxAge = 10000

export const memoizedRefreshToken = memoize(refreshTokenFn, { maxAge })
