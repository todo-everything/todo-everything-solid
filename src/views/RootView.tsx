import {useStore} from "../store/storeContext.tsx";
import {useNavigate} from "@solidjs/router";
import {createEffect} from "solid-js";

export default function RootView() {
  const [store, _] = useStore()
  const navigate = useNavigate()

  createEffect(() => {
    navigate('/todos', { replace: true })
  })

  return (
    <section class="bg-gray-400">
      <p>
        Home page, RootView
      </p>
    </section>
  )
}