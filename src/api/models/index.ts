export interface IUser {
  id: number
  email: string
}

export interface ITodo {
  id: number
  title: string
  body: string
  completed: boolean
  created_by: IUser
  created: Date
  updated: Date
}

export interface TodoMap {
  [key: number]: ITodo
}