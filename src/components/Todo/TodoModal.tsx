import Modal from '~/components/Modal.tsx'
import type { ITodo } from '~/api/models'

interface TodoModalProps {
  show?: boolean
  todo: ITodo
  onOpen: () => void
  onClose: () => void

  [other: string]: any
}

export default function TodoModal(props: TodoModalProps) {
  return (
    <Modal
      title="Wat"
      onOpen={props.onOpen}
      onClose={props.onClose}
      show={props.show || false}
    >
      Wat body
    </Modal>
  )
}
