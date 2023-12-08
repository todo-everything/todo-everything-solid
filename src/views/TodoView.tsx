import {createEffect, createSignal, Match, Suspense, Switch} from "solid-js";
import TodoTable from "../components/Todo/TodoTable";
import {useStore} from "../store/storeContext";
import TodoInput from "../components/Todo/TodoInput";
import {ITodo, TodoMap} from "../api/models";
import {useSearchParams} from "@solidjs/router";
import Loading from "../components/Loading.tsx";
import {omitBy} from "../helpers.ts";

export default function TodoView(props) {
  const [store, actions] = useStore()
  // Create a reactive view of the todos to apply filters on?
  // The todos in the actual global store will not change.
  const [viewTodos, setViewTodos] = createSignal<TodoMap>(store.todos())
  const [searchParams, _] = useSearchParams();

  createEffect(() => {
    if (searchParams.hideCompleted === "true") {
      setViewTodos(omitBy(store.todos()!, (t) => t.completed))
    } else if (store.todos()) {
      setViewTodos(store.todos())
    }
  })

  const handleChange = async (todo: ITodo, completed: boolean) => {
    console.log({todo: todo.completed, completed})
    if (completed) {
      await actions.completeTodo(todo.id)
    } else {
      await actions.unCompleteTodo(todo.id)
    }
  }

  const handleDeleteClick = async (todoId: number) => actions.deleteTodo(todoId)

  return (
    <div class="flex flex-col flex-grow mx-6">
      <TodoInput classList={{ 'mb-4': true }} onSubmit={actions.createTodo} />
      <Suspense fallback={<Loading />}>
        <TodoTable
          todos={viewTodos()}
          onDelete={handleDeleteClick}
          onComplete={handleChange}
        />
      </Suspense>
    </div>
  )
}