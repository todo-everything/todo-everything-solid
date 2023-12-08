import {createSignal} from 'solid-js'


interface OnSubmitCallback {
  (data: { title: string, body: string }): Promise<void>
}

interface TodoInputProps {
  onSubmit: OnSubmitCallback
}


export default function TodoInput(props: TodoInputProps) {
  const [title, setTitle] = createSignal<string>('')
  const [body, setBody] = createSignal<string>('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onSubmit({title: title(), body: body()})
    setTitle('')
    setBody('')
  }

  const handleInput = (e) => {
    setTitle(e.target.value)
  }

  return (
    <form classList={{...props.classList, 'w-100': true}} onSubmit={handleSubmit}>
      <div class="flex flex-row join">
        <button class="join-item btn" type="submit">Add</button>
        <input
          class="join-item w-full input input-bordered"
          onInput={handleInput}
          value={title()}
          placeholder="Add todo..."
        />
      </div>
    </form>
  )
}