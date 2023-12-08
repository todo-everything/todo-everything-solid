import {ParentProps} from 'solid-js'

interface ModalProps extends ParentProps {

}

export default function Modal(props: ModalProps) {
  let dialogRef

  const handleOpen = () => {
    if (dialogRef != null) {
      dialogRef.showModal()
    }
  }

  return (
    <div>
      <button class="btn" onClick={handleOpen}>open modal</button>
      <dialog ref={dialogRef} id={props.id} class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {props.children}
        </div>
      </dialog>
    </div>
  )
}