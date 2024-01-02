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
  // These dates come in as UTC strings and are compatible with the default
  // `Date()` constructor, but will need to be parsed/converted when dealing
  // with certain inputs (i.e. `datetime-local`) and timezones.
  due_on: Date
  started_on: Date
}

export interface IPartialTodo {
  title?: string
  body?: string
  completed?: boolean
  due_on?: Date | string
  started_on?: Date | string
}

export interface TodoMap {
  [key: number]: ITodo
}

export interface IOrganization extends IBaseModel {
  name: string
}