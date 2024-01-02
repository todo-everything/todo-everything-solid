import { createEffect, createSignal, ParentProps, Show } from 'solid-js'
import Navbar from '~/components/Navbar/index.tsx'
import { useStore } from './store/storeContext.tsx'
import Loading from './components/Loading.tsx'

// Use https://github.com/Exelord/solid-services
// For auth services

function Fallback(props) {
  return (
    <div class="d-flex w-100 justify-content-center">
      <Loading />
    </div>
  )
}

export default function App(props: ParentProps) {
  const [store, actions] = useStore()
  const [loading, setLoading] = createSignal(false)

  createEffect(async () => {
    if (!store.currentUser() && localStorage.getItem('access_token') != null) {
      setLoading(true)
      await actions.accounts.refetchUser()
      setLoading(false)
    }
  })

  return (
    <>
      <Navbar />
      <Show when={!loading()} fallback={<Fallback />}>
        {props.children}
      </Show>
      <div id="modal-portal"></div>
    </>
  )
}
