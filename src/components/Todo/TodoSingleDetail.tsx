import { ITodo } from '~/api/models'
import { Button } from 'solid-bootstrap'

interface IProps {
  todo: ITodo
  isEditing: boolean
  onChangeEditMode: () => void
}

export default function TodoSingleDetail(props: IProps) {
  return (
    <div>
      <h4>{props.todo.title}</h4>
      <p>{props.todo.body}</p>

      <p>Is editing: {props.isEditing ? 'yes' : 'No'}</p>

      <Button onClick={props.onChangeEditMode}>Edit</Button>
    </div>
  )
}
