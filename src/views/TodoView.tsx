import {createEffect, createSignal, Suspense} from 'solid-js'
import TodoTable from '../components/Todo/TodoTable'
import {useStore} from '../store/storeContext'
import TodoInput from '../components/Todo/TodoInput'
import {ITodo, TodoMap} from '../api/models'
import {useSearchParams} from '@solidjs/router'
import Loading from '../components/Loading.tsx'
import {omitBy} from '../helpers.ts'
import SideMenu from '../components/SideFilterMenu'
import SideFilterMenu from '../components/SideFilterMenu'
import TodoDetailDrawer from './TodoDetailDrawer.tsx'
import {create} from 'axios'
import {Portal} from 'solid-js/web'

export default function TodoView(props) {
  const [store, actions] = useStore()
  const [showPortal, setShowPortal] = createSignal()
  const [showDrawer, setShowDrawer] = createSignal(false)
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

  const handleChange = async (todo: ITodo, completed: boolean) => {
    if (completed) {
      await actions.completeTodo(todo.id)
    } else {
      await actions.unCompleteTodo(todo.id)
    }
  }

  const handleDeleteClick = async (todoId: number) => actions.deleteTodo(todoId)

  const handleFilterChange = () => {

  }

  const handleItemClick = (todo: ITodo) => {
    console.log('clicking.... ', showDrawer())
    setShowDrawer(!showDrawer())
  }

  return (
    <>
      <SideFilterMenu onFilterChange={handleFilterChange} />
      <div class="flex flex-col flex-grow w-100 mx-6">
        <TodoInput classList={{'mb-4': true}} onSubmit={actions.createTodo} />
        <Suspense fallback={<Loading />}>
          <TodoTable
            todos={viewTodos()}
            onDelete={handleDeleteClick}
            onComplete={handleChange}
            onItemClick={handleItemClick}
          />
        </Suspense>
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={showDrawer() ? 'checked' : null} />
      </div>
    </>
  )
}