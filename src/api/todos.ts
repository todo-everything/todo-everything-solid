import {httpClientPrivate} from './httpClientPrivate'
import {IPartialTodo, ITodo} from './models'
import {IHttpApi} from '~/api/types.ts'

export interface Todo {
  id?: number
  title: string
  body: string
  completed?: boolean
  created?: Date
  modified?: Date
  due_on?: Date
  started_on?: Date
}

const TodosApi: IHttpApi<ITodo> = {
  fetchAll: async (): Promise<ITodo[]> => {
    const res = await httpClientPrivate.get('/todo/')
    return res?.data
  },

  get: async (id: number): Promise<ITodo> => {
    const res = await httpClientPrivate.get(`/todo/${id}`)
    return res?.data
  },

  create: async (data: Todo): Promise<ITodo> => {
    const res = await httpClientPrivate.post('/todo/', data)
    return res?.data
  },

  update: async (id: number, updates: IPartialTodo): Promise<ITodo> => {
    const res = await httpClientPrivate.put(`/todo/${id}/`, updates)
    return res?.data
  },

  delete: async (id: number) => {
    const res = await httpClientPrivate.delete(`/todo/${id}/`)
    return res?.data
  }
}

export default TodosApi