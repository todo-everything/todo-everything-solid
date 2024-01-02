import { JSX, ParentProps, splitProps } from 'solid-js'
import { Button, Modal as BSModal } from 'solid-bootstrap'

const DEFAULT_CANCEL = 'cancel'
const DEFAULT_CONFIRM = 'save'

interface ModalProps extends ParentProps {
  onOpen: () => void
  onHide: () => void
  centered?: boolean
  title: JSX.Element
  show: boolean
  confirmText?: string
  cancelText?: string

  [other: string]: any
}

export default function Modal(props: ModalProps) {
  const [local, others] = splitProps(props, [
    'children',
    'onHide',
    'onOpen',
    'centered',
    'title',
    'confirmText',
    'cancelText',
  ])
  return (
    <BSModal
      show={props.show}
      onHide={props.onHide}
      centered={props.centered || false}
      {...others}
    >
      <BSModal.Header closeButton>
        <BSModal.Title>{props.title}</BSModal.Title>
      </BSModal.Header>
      <BSModal.Body>{props.children}</BSModal.Body>
      <BSModal.Footer>
        <Button variant="secondary">
          {props.cancelText || DEFAULT_CANCEL}
        </Button>
        <Button variant="primary">
          {props.confirmText || DEFAULT_CONFIRM}
        </Button>
      </BSModal.Footer>
    </BSModal>
  )
}
