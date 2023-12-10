import {createSignal, For, ParentProps, Show} from 'solid-js'
import {ITodo, TodoMap} from '../../api/models'
import {RiDesignEdit2Fill, RiDeviceSaveLine, RiSystemDeleteBin2Fill} from 'solid-icons/ri'
import TodoRow from './TodoRow.tsx'

interface ITodoTable extends ParentProps {
  todos: TodoMap
  onDelete: (todoId: number) => Promise<void>
  onComplete: (todo: ITodo, completed: boolean) => Promise<void>
  onSave: (todo: ITodo) => Promise<void>
}

export default function TodoTable(props: ITodoTable) {
  const [selected, setSelected] = createSignal([])

  return (
    <div class="flex flex-col">
      <For each={Object.values(props.todos)}>
        {(todo: ITodo, index) => (
          <TodoRow
            todo={todo}
            index={index()}
            onDelete={props.onDelete}
            onComplete={props.onComplete}
            onSave={props.onSave}
          />
        )}
      </For>
    </div>
  )
}