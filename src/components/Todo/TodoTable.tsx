import {createSignal, For, ParentProps} from 'solid-js'
import {ITodo, TodoMap} from '../../api/models'
import {RiDesignEdit2Fill, RiSystemDeleteBin2Fill} from 'solid-icons/ri'

interface TodoCallback {
  (todoId: number): Promise<void>
}

interface TodoCompletedCallback {
  (todo: ITodo, completed: boolean): Promise<void>
}

interface ITodoTable extends ParentProps {
  todos: TodoMap
  onDelete: TodoCallback
  onComplete: TodoCompletedCallback
}

export default function TodoTable(props: ITodoTable) {
  const [selected, setSelected] = createSignal([])

  return (
    <div class="flex flex-col">
      <For each={Object.values(props.todos)}>
        {(todo: ITodo, index) => (
          <div class="flex flex-row w-100 items-center mb-4 hover:bg-base-300/25 px-2">
            <input
              class="checkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() => props.onComplete(todo, !todo.completed)}
            />
            <div class="flex grow items-center ml-4">
              <span class="flex-start">{todo.title}</span>
            </div>
            <div class="actions flex-end">
              <div class="join">
                <button
                  class="btn btn-ghost join-item"
                >
                  <RiDesignEdit2Fill /> Edit
                </button>
                <button
                  class="btn btn-ghost join-item"
                  onClick={() => props.onDelete(todo.id)}>
                  <RiSystemDeleteBin2Fill /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}