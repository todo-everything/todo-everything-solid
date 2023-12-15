import {createSignal, Show} from 'solid-js'
import {RiSystemDeleteBin2Fill} from 'solid-icons/ri'
import {ITodo} from '../../api/models'

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
    <>
      <div class="flex flex-row w-100 mb-4 p-2 items-center hover:bg-base-300/25 hover:cursor-pointer">
        <input
          class="checkbox"
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => props.onComplete(props.todo, !props.todo.completed)}
        />
        <div class="flex grow ml-4" onClick={props.onItemClick}>
          <span>{props.todo.body}</span>
        </div>
        <div class="actions flex-end">
          <div class="join">
            <button
              class="btn btn-ghost join-item"
              onClick={() => props.onDelete(props.todo.id)}>
              <RiSystemDeleteBin2Fill /> Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}