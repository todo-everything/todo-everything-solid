import {RiSystemDeleteBin2Fill} from 'solid-icons/ri'
import type {ITodo} from '~/api/models'

interface TodoRowProps {
  todo: ITodo
  index: number
  onDelete: (todoId: number) => Promise<void>
  onComplete: (todo: ITodo, completed: boolean) => Promise<void>
  onSave: (todo: ITodo) => Promise<void>
  onItemClick: (todo: ITodo) => Promise<void>
}

export default function TodoRow(props: TodoRowProps) {
  return (
    <div class="todo-row mb-4 p-2">
      <div class="form-check me-2 mb-0">
        <input
          class="form-check-input"
          type="checkbox"
          checked={!!props.todo.completed}
          onChange={() => props.onComplete(props.todo, !props.todo.completed)}
        />
      </div>
      <div class="todo-title mx-2 p-2" onClick={() => props.onItemClick(props.todo)}>
        <span>{props.todo.title || "<none>"}</span>
      </div>
      <div class="actions flex-end">
        <button
          class="btn btn-secondary"
          onClick={() => props.onDelete(props.todo.id)}>
          <RiSystemDeleteBin2Fill /> Delete
        </button>
      </div>
    </div>
  )
}