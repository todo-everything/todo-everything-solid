import { Button, Form } from 'solid-bootstrap'
import { createEffect, createSignal } from 'solid-js'
import type { IPartialTodo, ITodo } from '~/api/models'

interface TodoDetailProps {
  todo: ITodo
  onTodoUpdate: (todoId: number, data: IPartialTodo) => void
  onCancel: () => void
  onEditClick: () => void
}

function convertToDateTimeLocalString(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function parseDateTime(date: Date | string) {
  if (date == null) {
    return date
  }

  if (date instanceof Date) {
    return convertToDateTimeLocalString(date)
  } else {
    const d = new Date(date)
    return convertToDateTimeLocalString(d)
  }
}

export default function TodoUpdate(props: TodoDetailProps) {
  // NOTE: Don't pass props directly into a `createSignal`?
  // https://github.com/solidjs/solid/discussions/287#discussioncomment-324499
  const [todoData, setTodoData] = createSignal<IPartialTodo>({})

  const setData = (data: IPartialTodo) =>
    setTodoData({
      ...todoData(),
      ...data,
    })

  // Create an effect for when props change. Adding it into `createSignal`
  // initial value will not track the prop changes
  createEffect(() => {
    setTodoData({ ...props.todo })
  })

  const handleTodoUpdate = (e: SubmitEvent) => {
    e.preventDefault()
    props.onTodoUpdate(props.todo.id, todoData())
    props.onEditClick()
  }

  return (
    <div class="d-flex flex-column w-100">
      <Form class="todo-update-form" onSubmit={handleTodoUpdate}>
        <Form.Group class="form-floating form-field-title">
          <Form.Control
            type="text"
            value={todoData().title}
            onInput={(e) => setData({ title: e.target.value })}
          />
          <Form.Label>Title</Form.Label>
        </Form.Group>

        <Form.Group class="form-floating form-field-body">
          <Form.Control
            as="textarea"
            rows={10}
            value={todoData().body}
            onInput={(e) => setData({ body: e.target.value })}
          />
          <Form.Label>Body</Form.Label>
        </Form.Group>

        <Form.Group class="form-floating form-field-body">
          <Form.Control
            as="input"
            type="datetime-local"
            // This is only local timezone aware (as the "-local" type suggests)
            value={parseDateTime(todoData().due_on!)}
            onInput={(e) => setData({ due_on: e.target.value })}
          />
          <Form.Label>Due on</Form.Label>
        </Form.Group>

        <Button
          class="w-50"
          variant="secondary"
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </Button>
        <Button class="w-50" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  )
}
