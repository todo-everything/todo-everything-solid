interface IIdModel {
  id: number
}

interface IBaseModel extends IIdModel {
  created: Date
  updated: Date
}

export interface IUser extends IIdModel {
  email: string
}

export interface ITodo extends IBaseModel {
  title: string
  body: string
  completed: Date
  created_by: IUser
}

export interface IPartialTodo {
  title?: string
  body?: string
  completed?: boolean
}

export interface TodoMap {
  [key: number]: ITodo
}

export interface IOrganization extends IBaseModel {
  name: string
}