import {
  createContext,
  useContext,
  InitializedResource,
  ParentProps, createSignal, createResource
} from 'solid-js'
import {createStore} from 'solid-js/store'
import axios from 'axios'

import type {IPartialTodo, ITodo, IUser, TodoMap} from '~/api/models'
import {httpClient} from '../api/httpClient.ts'
import AuthApi from '../api/auth.ts'
import TodosApi from '../api/todos.ts'


export const AUTH_TOKEN_KEY = 'access'
export const REFRESH_TOKEN_KEY = 'refresh'

export interface IStoreState {
  readonly todos: InitializedResource<TodoMap>
  readonly currentUser: InitializedResource<IUser>;
  readonly token: string;
  readonly refreshToken: string;
}

export interface ICommonActions {
  setToken: (token: string | undefined) => void
  setRefreshToken: (refreshToken: string | undefined) => void
}

export interface IProfileActions {
  loadProfile(name: string): void

  follow(): Promise<void>

  unfollow(): Promise<void>
}

export interface IUserActions {
  pullUser: () => true

  login(email: string, password: string): Promise<void>

  register(email: string, password: string): Promise<void>

  logout(): Promise<void>

  updateUser(newUser: IUser): Promise<void>

  refetchUser(): Promise<void>
}

export interface ITodoActions {
  loadTodos(): Promise<void>

  getTodos(): Promise<void>

  createTodo(newTodo: ITodo): Promise<void>

  updateTodo(todoId: number, updates: IPartialTodo): Promise<void>

  completeTodo(todoId: number): Promise<void>

  unCompleteTodo(todoId: number): Promise<void>

  clearTodoState(): Function

  deleteTodo(todoId: number): Promise<void>
}

export interface IActions extends IUserActions, ITodoActions, ICommonActions {
}

export type IStoreContext = [state: IStoreState, actions: IActions];

export const mapTodos = (todos: ITodo[]): TodoMap =>
  todos.reduce((prev: { [key: number]: ITodo }, curr) => {
      prev[curr.id] = curr
      return prev
    },
    {})

export function createApplicationStore() {
  const fetchCurrentUser = async () => {
    // TODO: Memoize?
    const res = await AuthApi.getUser()
    console.log('FetchUser', {res})
    return res
  }

  const fetchTodos = async (): Promise<TodoMap> => {
    console.log('fetch todos')
    const res = await TodosApi.getTodos()
    return mapTodos(res)
  }

  const [isLoggedIn, setIsLoggedIn] = createSignal()
  const [currentUser, {
    mutate: mutateUser,
    refetch: refetchUser
  }] = createResource<IUser>(isLoggedIn, fetchCurrentUser)

  const [todos, {
    mutate: mutateTodos,
    refetch: refetchTodos
  }] = createResource<TodoMap>(currentUser, fetchTodos, {initialValue: {}})

  let todoStore: InitializedResource<TodoMap> = todos
  let currentUserStore: InitializedResource<IUser> = currentUser

  const [state, setState] = createStore<IStoreState>({
    get todos(): InitializedResource<TodoMap> {
      return todoStore
    },
    get currentUser(): InitializedResource<IUser> {
      return currentUserStore
    },
    token: localStorage.getItem(AUTH_TOKEN_KEY),
  })

  const actions: IActions = {
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
    register: async (email: string, password: string): Promise<void> => {
      const {data} = await httpClient.post('/register/', {
        email,
        password
      })
      localStorage.clear()
      // TODO: Error handling
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
    createTodo: async (newTodo: ITodo): Promise<void> => {
      const res = await TodosApi.createTodo(newTodo)
      const _todos = todos()
      _todos[res.id] = res
      mutateTodos({..._todos})
    },
    completeTodo: async (todoId: number) => {
      const res = await TodosApi.complete(todoId)
      console.log('complete', {res})
      const _todos = todos()
      _todos[res.id] = res
      mutateTodos({..._todos})
    },
    updateTodo: async (todoId: number, updates: IPartialTodo) => {
      const res = await TodosApi.update(todoId, updates)
      console.log('update todo')
      const _todos = todos()
      _todos[res.id] = res
      mutateTodos({..._todos})
    },
    unCompleteTodo: async (todoId: number) => {
      const res = await TodosApi.unComplete(todoId)
      console.log('un-complete', {res})
      const _todos = todos()
      _todos[res.id] = res
      mutateTodos({..._todos})
    },
    deleteTodo: async (todoId: number) => {
      console.log('delete', {todoId})
      const res = await TodosApi.delete(todoId)
      const _todos = todos()
      delete _todos[todoId]
      console.log({_todos, res})
      mutateTodos({..._todos})
    },
  }

  return [state, actions]
}

export const StoreContext = createContext<IStoreContext>()

export function ContextProvider(props: ParentProps) {
  const store = createApplicationStore()

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}


export function useStore(): IStoreContext {
  return useContext<IStoreContext>(StoreContext)
}
