import { CloseButton, Offcanvas } from 'solid-bootstrap'
import { ParentProps } from 'solid-js'

interface IProps extends ParentProps {
  title: string
  show: boolean
  onHide?: () => void
}

export default function TdeOffcanvas(props: IProps) {
  return (
    <Offcanvas backdrop placement="end" show={props.show} onHide={props.onHide}>
      <Offcanvas.Header>
        <Offcanvas.Title>{props.title}</Offcanvas.Title>
        <CloseButton onClick={props.onHide} />
      </Offcanvas.Header>
      <Offcanvas.Body>{props.children}</Offcanvas.Body>
    </Offcanvas>
  )
}
