import {
  createContext,
  createResource,
  createSignal,
  InitializedResource,
  ParentProps,
  useContext,
} from 'solid-js'
import { createStore } from 'solid-js/store'

import type { ITodo, IUser, TodoMap } from '~/api/models'
import AuthApi from '../api/auth.ts'
import TodosApi from '../api/todos.ts'
import { createUserStore, IUserActions } from '~/store/userStore.ts'
import { createTodoStore, ITodoActions } from '~/store/todoStore.ts'

export const AUTH_TOKEN_KEY = 'access'
export const REFRESH_TOKEN_KEY = 'refresh'

export interface IStoreState {
  readonly todos: InitializedResource<TodoMap>
  readonly currentUser: InitializedResource<IUser>
  readonly token: string
  readonly refreshToken: string
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

export interface IActions extends IUserActions, ITodoActions, ICommonActions {
  todos: ITodoActions
  accounts: IUserActions
}

export type IStoreContext = [state: IStoreState, actions: IActions]

export const mapTodos = (todos: ITodo[]): TodoMap =>
  todos.reduce((prev: { [key: number]: ITodo }, curr) => {
    prev[curr.id] = curr
    return prev
  }, {})

export function createApplicationStore() {
  const fetchCurrentUser = async () => {
    // TODO: Memoize?
    return AuthApi.getUser()
  }

  const fetchTodos = async (): Promise<TodoMap> => {
    return mapTodos(await TodosApi.fetchAll())
  }

  const [isLoggedIn, setIsLoggedIn] = createSignal<boolean>(false)
  const [currentUser, { mutate: mutateUser, refetch: refetchUser }] =
    createResource<IUser>(isLoggedIn, fetchCurrentUser)

  const [todos, { mutate: mutateTodos, refetch: refetchTodos }] =
    createResource<TodoMap>(currentUser, fetchTodos, { initialValue: {} })

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

  return [
    state,
    {
      accounts: createUserStore({
        setIsLoggedIn,
        mutateUser,
        refetchUser,
        currentUser,
        mutateTodos,
      }),
      todos: createTodoStore({ mutateTodos, todos, refetchTodos }),
    } as IActions,
  ]
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
