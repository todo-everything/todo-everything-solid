import {A as Link, useNavigate} from '@solidjs/router'
import {Show} from 'solid-js'
import {useStore} from '../../store/storeContext.tsx'
import {RiUserFacesAccountCircleFill} from 'solid-icons/ri'

const debounce = (func, timeout = 300) => {
  let timer

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export default function () {
  const [store, actions] = useStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await actions.logout()
    navigate('/login', {replace: true})
  }

  return (
    <div class="navbar bg-base-200 mb-10">
      <div class="navbar-start">
        <Link class="btn btn-ghost normal-case text-xl" href="/todos">todo-everything</Link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <Link href="/todos" class="no-underline hover:underline">
              Todos
            </Link>
          </li>
        </ul>
      </div>

      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <div tabIndex="0" role="button" class="p-2 btn btn-ghost">
            <RiUserFacesAccountCircleFill role="button" size={'2rem'} />
          </div>

          <ul tabindex="0" class="dropdown-content menu p-2 shadow z-[1] bg-base-100 w-100 rounded-box">
            <Show when={store.currentUser()}>
              <li>
                <Link href="/me">Settings</Link>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>Logout</a>
              </li>
            </Show>
            <Show when={!store.currentUser()}>
              <li>
                <Link class="" href="/login">
                  Login
                </Link>
              </li>
            </Show>
          </ul>
        </div>
      </div>
    </div>
  )
}
