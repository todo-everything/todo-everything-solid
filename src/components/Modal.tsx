import { JSX, ParentProps, splitProps } from 'solid-js'
import { Button, Modal as BSModal } from 'solid-bootstrap'

const DEFAULT_CANCEL = 'Cancel'
const DEFAULT_CONFIRM = 'Save'

interface ModalProps extends ParentProps {
  onOpen: () => void
  onCancel?: () => void
  onHide: () => void
  centered?: boolean
  title: JSX.Element
  preFooter: JSX.Element
  show: boolean
  confirmText?: string
  cancelText?: string
  hideOnConfirm?: boolean
  showFooter?: boolean

  [other: string]: any
}

export default function Modal(props: ModalProps) {
  const [local, others] = splitProps(props, [
    'children',
    'onHide',
    'onOpen',
    'hideOnConfirm',
    'centered',
    'title',
    'confirmText',
    'cancelText',
  ])

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel()
    }
    props.onHide()
  }

  const handleConfirm = () => {
    props.onConfirm()
    if (props.hideOnConfirm) props.onHide()
  }

  return (
    <BSModal
      show={props.show}
      onHide={props.onHide}
      centered={props.centered || false}
      {...others}
    >
      <BSModal.Header closeButton>
        {props.title && <BSModal.Title>{props.title}</BSModal.Title>}
      </BSModal.Header>
      <BSModal.Body>{props.children}</BSModal.Body>

      {props.preFooter}

      {props?.showFooter !== false && (
        <BSModal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            {props.cancelText || DEFAULT_CANCEL}
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {props.confirmText || DEFAULT_CONFIRM}
          </Button>
        </BSModal.Footer>
      )}
    </BSModal>
  )
}
