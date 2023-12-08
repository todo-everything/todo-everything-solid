import {useStore} from "../store/storeContext.tsx";
import {useNavigate} from "@solidjs/router";
import {createEffect} from "solid-js";
import SideMenu from "../components/SideMenu";

export default function ProtectedView(props) {
  const [store, _] = useStore()
  const navigate = useNavigate()

  createEffect(() => {
    console.log("Protected", store.currentUser())
    if (!store.currentUser()) {
      navigate("/login", { replace: true })
    }
  })

  return (
    <div class="flex">
      <SideMenu />
      <div class="content basis-1/2">
        {props.children}
      </div>
    </div>
  )
}