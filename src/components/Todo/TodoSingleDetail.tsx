import { ITodo } from '~/api/models'
import {
  RiBusinessCalendar2Fill,
  RiUserFacesAccountCircleFill,
} from 'solid-icons/ri'
import { createEffect, createSignal } from 'solid-js'
import { Button, ButtonGroup } from 'solid-bootstrap'

interface IProps {
  todo: ITodo
  isEditing: boolean
  onEditClick: () => void
  onCloseClick: () => void
}

export default function TodoSingleDetail(props: IProps) {
  const [dueDt, setDueDt] = createSignal<Date | null>()

  createEffect(() => {
    setDueDt(new Date(props.todo.due_on))
  })
  const getDueStr = () =>
    `${dueDt()?.toLocaleDateString()}, ${dueDt()?.toLocaleTimeString()}`

  return (
    <div class="todo-detail">
      <div class="todo-detail-content">
        <div class="todo-detail-header mb-4 pb-2">
          <h4 class="mb-2">{props.todo.title}</h4>
          <div class="todo-detail-top-meta">
            <div class="todo-meta-item">
              <RiBusinessCalendar2Fill class="h-100" />
              <span class="ps-2">{props.todo.created}</span>
            </div>
            <div class="todo-meta-item">
              <RiUserFacesAccountCircleFill class="h-100" />
              <span>{props.todo.created_by.email}</span>
            </div>
          </div>
        </div>

        <div class="todo-detail-body">
          <p>{props.todo.body}</p>
        </div>

        <div class="todo-detail-bottom-meta">
          <div class="todo-meta-item">
            <RiBusinessCalendar2Fill class="h-100" />{' '}
            <span class="ps-2">
              {props.todo.due_on ? getDueStr() : <em>No due date</em>}
            </span>
          </div>
        </div>
      </div>

      <ButtonGroup class="mt-4 w-100">
        <Button variant="secondary" onClick={props.onCloseClick}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onEditClick}>
          Edit
        </Button>
      </ButtonGroup>
    </div>
  )
}
