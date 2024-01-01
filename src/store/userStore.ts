import {Setter} from 'solid-js'
import axios from 'axios'
import {httpClient} from '~/api/httpClient.ts'
import AuthApi from '~/api/auth.ts'
import type {IUser} from '~/api/models'

export interface IUserActions {
  // pullUser: () => true

  login(email: string, password: string): Promise<void>

  signup(email: string, password: string): Promise<void>

  logout(): Promise<void>

  updateUser(newUser: IUser): Promise<void>

  refetchUser(): Promise<void>
}

interface UserStoreProps {
  setIsLoggedIn: Setter<boolean>,
  mutateUser: Setter<IUser>,
  refetchUser: (data?: any) => any,
  mutateTodos: Function,
  currentUser: Function,
}


export function createUserStore(options: UserStoreProps): IUserActions {
  const {setIsLoggedIn, mutateUser, refetchUser, mutateTodos, currentUser} = options

  return {
    login: async (email: string, password: string): Promise<void> => {
      const {data} = await httpClient.post('/token/', {
        email: email,
        password: password
      })
      const {access, refresh} = data

      // Initialize the access & refresh token in localstorage.
      localStorage.clear()
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
      setIsLoggedIn(true)
    },
    /**
     * Register with provided details.
     *
     * Note: This does not return auth details, so use the `login` endpoint
     * after registering to get the final token response.
     * @param email
     * @param password
     */
    signup: async (email: string, password: string): Promise<void> => {
      const {data} = await httpClient.post('/register/', {
        email,
        password
      })
      localStorage.clear()
      // TODO: Error handling
    },
    updateUser: async (userUpdates: IUser): Promise<void> => {
      const {data} = await httpClient.put('/account/', {
        ...userUpdates
      })
      mutateUser(data)
    },
    refetchUser: async () => {
      setIsLoggedIn(true)
      await refetchUser()
      console.log(currentUser())
    },
    async logout() {
      // AuthApi.clearAllTokens()
      await AuthApi.logout()
      setIsLoggedIn(false)
      mutateTodos({})
      mutateUser(null)
    },
  }
}