import Modal from '../Modal.tsx'
import type {ITodo} from '~/api/models'

interface TodoModalProps {
  todo: ITodo
}

export default function TodoModal(props: TodoModalProps) {
  return (
    <Modal onOpen={() => console.log("opening modal..")}>
      Todo modal

      {props.todo.title} -
      {props.todo.body}
    </Modal>
  )
}