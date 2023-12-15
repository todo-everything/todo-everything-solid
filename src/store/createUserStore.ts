import {createComputed, createResource, createSignal, Resource} from "solid-js";
import {SetStoreFunction} from "solid-js/store";
import {IUser} from "../api/models";
import {IStoreState} from "./storeState";
import {APIClient} from "../api/request";
import {REFRESH_TOKEN_KEY} from "./createCommonStore.ts";

export interface IUserActions {
  pullUser: () => true

  login(email: string, password: string): Promise<void>

  register(username: string, email: string, password: string): Promise<void>

  logout(): Promise<void>

  updateUser(newUser: IUser): Promise<void>

  refetchUser(): Promise<void>
}

export function createUserStore(actions: IUserActions, state: IStoreState, setState: SetStoreFunction<IStoreState>): Resource<IUser> {

  /**
   * Get the current user details from the server
   */

  const fetchCurrentUser = async (): IUser => {
    console.log('fetchCurrentUser', state.token)
    const data = await apiClient.getCurrentUser()
    console.log("Fetch user: ", {data})
    return data
  }

  const [isLoggedIn, setIsLoggedIn] = createSignal(null)
  const [currentUser, {mutate, refetch}] = createResource<IUser>(isLoggedIn, fetchCurrentUser)

  // Add our actions the provided actions container

  Object.assign(actions, {
    refreshToken: async (token) => {
      console.log('createUserState > refreshToken');
      setIsLoggedIn(false);
      const data  = await apiClient.refreshToken(token);

      console.log('Refresh token data', { data })
      actions.setToken(data?.access)

      setIsLoggedIn(true)
    },

    pullUser: async () => {
      console.log('userStore > pullUser')
      setIsLoggedIn(true)
    },

    async login(email: string, password: string) {
      const {data, error} = await apiClient.login({email, password})
      if (error) throw error
      actions.setToken(data?.access)
      actions.setRefreshToken(data?.refresh)
      setIsLoggedIn(true)
    },

    async register(username: string, email: string, password: string) {
      const {data, error} = await apiClient.users.createUser({user: {username, email, password}})
      if (error) throw error
      actions.setToken(data.user.token)
      setIsLoggedIn(true)
    },

    logout() {
      console.log("createUserStore -> logout")
      actions.setToken(undefined)
      actions.setRefreshToken(undefined)
      mutate(undefined)
      setIsLoggedIn(false)
      console.log(isLoggedIn())
    },

    async updateUser(newUser: IUser) {
      const {data, error} = await apiClient.updateCurrentUser({user: newUser})
      if (error) throw errors
      mutate(data.user)
    }

  })

  createComputed(async () => {
    const localRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    console.log("Computed on createUserStore", {localRefreshToken});
    if (localRefreshToken && !state.currentUser) {
      console.log("createUserStore > token > no currentUser", localRefreshToken);
      await actions.refreshToken(localRefreshToken);
    }
  })

  return currentUser
}