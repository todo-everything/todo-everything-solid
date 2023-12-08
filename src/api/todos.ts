import {httpClientPrivate} from "./httpClientPrivate";
import {ITodo} from "./models";

export interface Todo {
  id?: number
  title: string
  body: string
  completed?: boolean
  created?: Date
  modified?: Date
}

const TodosApi = {
  getTodos: async (): Promise<ITodo[]> => {
    const res = await httpClientPrivate.get("/todo/")
    return res?.data
  },

  createTodo: async (data: Todo): Promise<ITodo> => {
    const res = await httpClientPrivate.post("/todo/", data)
    return res?.data
  },

  complete: async (todoId: number): Promise<ITodo> => {
    const res = await httpClientPrivate.post(`/todo/${todoId}/complete/`)
    return res?.data
  },

  unComplete: async (todoId: number): Promise<ITodo> => {
    const res = await httpClientPrivate.post(`/todo/${todoId}/uncomplete/`)
    return res?.data
  },

  delete: async (todoId: number) => {
    const res = await httpClientPrivate.delete(`/todo/${todoId}/`)
    return res?.data
  }
}

export default TodosApi