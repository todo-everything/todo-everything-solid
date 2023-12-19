import {createSignal, createResource, InitializedResource, createComputed} from 'solid-js'
import {SetStoreFunction} from 'solid-js/store'
import {IStoreState} from './storeState'
import type {IPartialTodo, ITodo} from '../api/models'

export interface IProfileActions {
  loadProfile(name: string): void

  follow(): Promise<void>

  unfollow(): Promise<void>
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

/**
 * Create interface to the profile API endpoint. We populate the supplied
 * actions object with methods that wrap the low-level
 * server API
 *
 * @param apiClient Used for communication with the sever API
 * @param actions The actions object to be populated
 * @param state
 * @param setState
 * @returns
 */

export function createTodoStore(apiClient, actions: ITodoActions, state: IStoreState, setState: SetStoreFunction<IStoreState>): InitializedResource<ITodo> {

  const fetchTodos = async () => {
    const {currentUser} = state
    console.log('todoStore > fetchTodos > ', {currentUser: currentUser()?.email})
    const data = await apiClient.getTodos()
    console.log('fetchTodos > ', {data})
    return data
  }

  const [userId, setUserId] = createSignal(null);
  const [todos, {mutate, refetch}] = createResource<ITodo[]>(userId, fetchTodos, {initialValue: []});

  // Add our actions the provided actions container

  Object.assign(actions, {

    loadTodos(userId: number) {
      setUserId(userId)
    },

    async getTodos() {
      const {currentUser} = state
      console.log('todo state', {currentUser: currentUser()})
      if (state.token) {
        console.log("Have a token...")
        await refetch()
      }
    },

    async clearTodoState() {
      mutate([])
    }

    // async unfollow() {
    //   if (state.profile && state.profile.following) {
    //     setState('profile', 'following', false)
    //     try {
    //       await agent.profiles.unfollowUserByUsername(state.profile.username)
    //     } catch (err) {
    //       setState('profile', 'following', true)
    //     }
    //   }
    // }

  })

  createComputed(() => {
    if (!state.currentUser || !state.isLoggedIn) {
      console.log("No user detected. Clearing TODO state")
      actions.clearTodoState();
    }
  })

  return todos;
}