import {createSignal} from 'solid-js'
import {debounce} from '~/helpers.ts'


interface OnSubmitCallback {
  (data: { title: string, body: string }): Promise<void>
}

interface TodoInputProps {
  onSubmit: OnSubmitCallback
}


export default function TodoInput(props: TodoInputProps) {
  const [title, setTitle] = createSignal<string>('')
  const [body, setBody] = createSignal<string>('')

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    props.onSubmit({title: title(), body: body()})
    setTitle('')
    setBody('')
  }

  const debouncedSubmit = debounce(handleSubmit)

  const handleInput = (e) => {
    setTitle(e.target.value)
    // setBody(e.target.value)
  }

  return (
    <form role="form" class={props.class} onSubmit={debouncedSubmit}>
      <div class="input-group">
        <button class="btn btn-outline-secondary" type="submit">Add</button>
        <input
          class="form-control"
          onInput={handleInput}
          value={title()}
          placeholder="Add todo..."
        />
      </div>
    </form>
  )
}