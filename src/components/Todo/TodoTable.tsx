import {Index} from 'solid-js'
import TodoRow from './TodoRow.tsx'

import type {Accessor, ParentProps} from 'solid-js'
import type {ITodo} from '../../api/models'

interface ITodoTable extends ParentProps {
  todos: { [s: string]: ITodo }
  onDelete: (todoId: number) => Promise<void>
  onComplete: (todo: ITodo, completed: boolean) => Promise<void>
  onSave: (todo: ITodo) => Promise<void>
  onItemClick: (todo: ITodo) => void
}

export default function TodoTable(props: ITodoTable) {
  return (
    <div class="d-flex flex-column">
      <Index each={Object.values<ITodo>(props.todos)}>
        {(todo: Accessor<ITodo>, index) => (
          <TodoRow
            todo={todo()}
            index={index}
            onDelete={props.onDelete}
            onComplete={props.onComplete}
            onSave={props.onSave}
            onItemClick={props.onItemClick}
          />
        )}
      </Index>
    </div>
  )
}