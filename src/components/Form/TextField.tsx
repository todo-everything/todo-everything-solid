import {Show} from 'solid-js'
import type {JSX} from 'solid-js'

type TextFieldProps = {
  value: string
  type: string

  onChange?: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> | undefined
  onInput?: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> | undefined
  onBlur?: JSX.FocusEventHandlerUnion<HTMLInputElement, FocusEvent> | undefined

  label?: string
  labelLocation?: string
  placeholder?: string
}


export default function TextField(props: TextFieldProps) {
  return (
    <label class="form-control">
      <Show when={props.label}>
        <div class="label">
          <span class="label-text">{props.label}</span>
        </div>
      </Show>
      <input
        class={`input input-bordered w-full max-w-xs ${props.joinItem ? 'join-item' : ''}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onInput={(e) => props.onInput(e.target.value)}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </label>
  )
}