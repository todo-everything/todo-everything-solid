import { RiBusinessCalendar2Fill } from 'solid-icons/ri'
import Modal from '~/components/Modal.tsx'
import { createEffect, createSignal, ParentProps } from 'solid-js'
import { ITodo } from '~/api/models'

interface TodoModalProps extends ParentProps {
  todo: ITodo
  show: boolean
  onOpen: () => void
  onHide: () => void

  [other: string]: any
}

export default function TodoModal(props: TodoModalProps) {
  const [dueDt, setDueDt] = createSignal<Date | null>()

  createEffect(() => {
    setDueDt(new Date(props.todo.due_on))
  })

  const getDueStr = () =>
    `${dueDt()?.toLocaleDateString()}, ${dueDt()?.toLocaleTimeString()}`

  const PreFooter = () => (
    <div class="todo-modal-meta-row p-2">
      <div class="todo-modal-meta-item">
        <RiBusinessCalendar2Fill class="h-100" />{' '}
        <span class="ps-2">
          {props.todo.due_on ? getDueStr() : <em>No due date</em>}
        </span>
      </div>
    </div>
  )

  return (
    <Modal
      class="todo-modal"
      title={props.todo.title}
      onOpen={props.onOpen}
      onHide={props.onHide}
      show={props.show}
      centered={true}
      preFooter={<PreFooter />}
      showFooter={false}
    >
      <div class="d-flex flex-column">
        <p>{props.todo.body}</p>
      </div>
    </Modal>
  )
}
