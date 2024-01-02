import { useSearchParams } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'

interface SideFilterMenuProps {
  onFilterChange: () => ''
}

export default function SideFilterMenu(props: SideFilterMenuProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [hideAction, setHideAction] = createSignal<string>('Hide')

  createEffect(() => {
    if (searchParams.hideCompleted === 'true') {
      // Currently hiding completed, so we want to show on click
      setHideAction('Show')
    } else {
      setHideAction('Hide')
    }
  })

  const handleHideCompleted = () => {
    setSearchParams({ hideCompleted: !(searchParams.hideCompleted === 'true') })
  }

  return (
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link" onClick={handleHideCompleted}>
          {hideAction()} completed
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          Link
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          Link
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" aria-disabled="true">
          Disabled
        </a>
      </li>
    </ul>
  )
}
