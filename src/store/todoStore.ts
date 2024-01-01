import type {IPartialTodo, ITodo, TodoMap} from '~/api/models'
import TodosApi from '~/api/todos.ts'
import {Setter} from 'solid-js'

export interface ITodoActions {
  fetchAll(): Promise<void>

  createTodo(newTodo: ITodo): Promise<void>

  updateTodo(todoId: number, updates: IPartialTodo): Promise<void>

  // clearTodoState(): Function

  deleteTodo(todoId: number): Promise<void>
}

interface TodoStoreProps {
  todos: Function,
  mutateTodos: Setter<TodoMap>,
  refetchTodos: (data?: any) => any,
}

export function createTodoStore(options: TodoStoreProps): ITodoActions {
  const {todos, mutateTodos, refetchTodos} = options

  return {
    fetchAll: async (): Promise<void> => {
      const res = await TodosApi.fetchAll()
      // TODO:
      mutateTodos(res)
    },
    createTodo: async (newTodo: ITodo): Promise<void> => {
      const res = await TodosApi.create(newTodo)
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
    deleteTodo: async (todoId: number) => {
      console.log('delete', {todoId})
      const res = await TodosApi.delete(todoId)
      const _todos = todos()
      delete _todos[todoId]
      console.log({_todos, res})
      mutateTodos({..._todos})
    },
  }
}