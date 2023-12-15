import {useSearchParams} from '@solidjs/router'
import {createEffect, createSignal} from 'solid-js'

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
    setSearchParams({hideCompleted: !(searchParams.hideCompleted === 'true')})
  }

  return (
    <ul class="menu rounded-box">
      <li>
        <h2 class="menu-title">Filters</h2>
        <ul>
          <li>
            <a onClick={handleHideCompleted}>{hideAction()} completed</a>
          </li>
        </ul>
      </li>
    </ul>
  )
}