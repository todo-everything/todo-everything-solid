import { useStore } from '../store/storeContext.tsx'
import { useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'

export default function ProtectedView(props) {
  const [store, _] = useStore()
  const navigate = useNavigate()

  createEffect(() => {
    if (!store.currentUser.loading && !store.currentUser()) {
      navigate('/login', { replace: true })
    }
  })

  return <div class="container">{props.children}</div>
}
