import {ITodo, IUser, TodoMap} from "../api/models";
import {InitializedResource} from "solid-js";

export interface IStoreState {
  readonly todos: InitializedResource<TodoMap>
  readonly currentUser: InitializedResource<IUser>;
  readonly token: string;
  readonly refreshToken: string;
}