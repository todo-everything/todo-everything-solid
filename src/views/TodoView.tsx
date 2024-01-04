import { createEffect, createSignal, Suspense } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import type { IPartialTodo, ITodo, TodoMap } from '~/api/models'
import { useStore } from '~/store/storeContext'
import Loading from '~/components/Loading'
import { omitBy } from '~/helpers'
import { TodoInput, TodoTable, TodoUpdate } from '~/components/Todo'
import SideFilterMenu from '~/components/SideFilterMenu'
import TdeOffcanvas from '~/components/TdeOffcanvas'
import TodoSingleDetail from '~/components/Todo/TodoSingleDetail.tsx'

export default function TodoView(props) {
  const [store, actions] = useStore()
  const [showDrawer, setShowDrawer] = createSignal<boolean>(false)
  const [isEditing, setIsEditing] = createSignal<boolean>(false)
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
    actions.todos.updateTodo(todo.id, {
      completed: completed ? new Date() : null,
    })

  const handleDeleteClick = async (todoId: number) => actions.deleteTodo(todoId)

  const handleFilterChange = () => {}

  const handleCloseDrawer = () => {
    setShowDrawer(false)
    setIsEditing(false)
  }

  const handleTodoUpdate = async (
    todoId: number,
    todoPartial: IPartialTodo,
  ) => {
    await actions.todos.updateTodo(todoId, todoPartial)
    setIsEditing(false)
    // Update `selectedTodo` with the newest thing from the store
    setSelectedTodo(store.todos()[todoId])
  }

  const handleChangeEditMode = () => {
    setIsEditing(!isEditing())
  }

  const handleUpdateCancel = () => {
    setIsEditing(false)
  }

  return (
    <div class="d-flex flex-row">
      <SideFilterMenu onFilterChange={handleFilterChange} />
      <div class="flex-column w-100 mx-6">
        <TodoInput class="mb-3" onSubmit={actions.todos.createTodo} />
        <Suspense fallback={<Loading />}>
          <TodoTable
            // Only using `viewTodos` here, but adding in `store.todos()` so
            // <Suspense> can show the loading indicator properly.
            todos={store.todos.loading ? store.todos() : viewTodos()}
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
            title={isEditing() ? 'Update Todo' : 'Todo Detail'}
            show={showDrawer()}
            onHide={handleCloseDrawer}
          >
            {isEditing() ? (
              <TodoUpdate
                todo={selectedTodo()!}
                onTodoUpdate={handleTodoUpdate}
                onCancel={handleUpdateCancel}
                onEditClick={handleChangeEditMode}
              />
            ) : (
              <TodoSingleDetail
                todo={selectedTodo()}
                isEditing={isEditing()}
                onEditClick={handleChangeEditMode}
                onCloseClick={handleCloseDrawer}
              />
            )}
          </TdeOffcanvas>
        )}
      </div>
    </div>
  )
}
