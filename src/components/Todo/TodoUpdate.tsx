import {Button, Form} from 'solid-bootstrap'
import {createEffect, createSignal} from 'solid-js'
import type {IPartialTodo, ITodo} from '../../api/models'


interface TodoDetailProps {
  todo: ITodo
  onTodoUpdate: (todoId: number, data: IPartialTodo) => void
  onCancel: () => void
}


export default function TodoUpdate(props: TodoDetailProps) {
  // NOTE: Don't pass props directly into a `createSignal`?
  // https://github.com/solidjs/solid/discussions/287#discussioncomment-324499
  const [todoTitle, setTodoTitle] = createSignal<string>()
  const [todoBody, setTodoBody] = createSignal<string>()

  // Create an effect for when props change. Adding it into `createSignal`
  // initial value will not track the prop changes
  createEffect(() => {
    setTodoTitle(props.todo.title)
    setTodoBody(props.todo.body)
  })

  const handleTodoUpdate = (e: SubmitEvent) => {
    e.preventDefault()
    return props.onTodoUpdate(props.todo.id, {title: todoTitle(), body: todoBody()})
  }

  return (
    <div class="d-flex flex-column w-100">
      <Form class="todo-update-form" onSubmit={handleTodoUpdate}>
        <Form.Group class="form-floating form-field-title">
          <Form.Control
            type="text"
            value={todoTitle()}
            onInput={(e) => setTodoTitle(e.target.value)}
          />
          <Form.Label>Title</Form.Label>
        </Form.Group>

        <Form.Group class="form-floating form-field-body">
          <Form.Control
            as="textarea"
            rows={10}
            value={todoBody()}
            onInput={(e) => setTodoBody(e.target.value)}
          />
          <Form.Label>Body</Form.Label>
        </Form.Group>

        <Button class="w-50" variant="primary" type="submit">
          Update
        </Button>
        <Button class="w-50" variant="secondary" type="button" onClick={props.onCancel}>
          Cancel
        </Button>
      </Form>
    </div>
  )
}