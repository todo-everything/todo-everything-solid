import {createEffect, createSignal, Suspense} from 'solid-js'
import TodoTable from '../components/Todo/TodoTable'
import {useStore} from '../store/storeContext'
import TodoInput from '../components/Todo/TodoInput'
import type {IPartialTodo, ITodo, TodoMap} from '../api/models'
import {useSearchParams} from '@solidjs/router'
import Loading from '../components/Loading'
import {omitBy} from '../helpers.ts'
import SideFilterMenu from '../components/SideFilterMenu'
import TodoUpdate from '../components/Todo/TodoUpdate.tsx'
import TdeOffcanvas from '../components/TdeOffcanvas.tsx'

export default function TodoView(props) {
  const [store, actions] = useStore()
  const [showDrawer, setShowDrawer] = createSignal<boolean>(false)
  const [selectedTodo, setSelectedTodo] = createSignal<ITodo>()
  // Create a reactive view of the todos to apply filters on?
  // The todos in the actual global store will not change.
  const [viewTodos, setViewTodos] = createSignal<TodoMap>(store.todos())
  const [searchParams, _] = useSearchParams()

  createEffect(() => {
    if (searchParams.hideCompleted === 'true') {
      setViewTodos(omitBy(store.todos()!, (t) => t.completed))
    } else if (store.todos()) {
      setViewTodos(store.todos())
    }
  })

  const handleChange = async (todo: ITodo, completed: boolean) =>
    actions.updateTodo(todo.id, {completed: completed ? new Date() : null})

  const handleDeleteClick = async (todoId: number) => actions.deleteTodo(todoId)

  const handleFilterChange = () => ''

  const handleCloseDrawer = () => {
    setShowDrawer(false)
  }

  const handleTodoUpdate = async (todoId: number, todoPartial: IPartialTodo) => {
    await actions.updateTodo(todoId, todoPartial)
    handleCloseDrawer()
  }

  return (
    <div class="d-flex flex-row">
      <SideFilterMenu onFilterChange={handleFilterChange} />
      <div class="flex flex-col flex-grow w-100 mx-6">
        <TodoInput class="mb-3" onSubmit={actions.createTodo} />
        <Suspense fallback={<Loading />}>
          <TodoTable
            todos={viewTodos()}
            onDelete={handleDeleteClick}
            onComplete={handleChange}
            onItemClick={(todo: ITodo) => {
              setShowDrawer(true)
              setSelectedTodo(todo)
            }}
          />
        </Suspense>

        {selectedTodo() && (
          <TdeOffcanvas
            title="Update Todo"
            show={showDrawer()}
            onHide={handleCloseDrawer}
          >
            <TodoUpdate
              todo={selectedTodo()!}
              onTodoUpdate={handleTodoUpdate}
              onCancel={handleCloseDrawer}
            />
          </TdeOffcanvas>
        )}
      </div>
    </div>
  )
}