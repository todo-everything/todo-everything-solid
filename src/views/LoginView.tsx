import {createStore} from "solid-js/store";
import {A, useNavigate} from "@solidjs/router";
import {useStore} from "../store/storeContext.tsx";

export default function LoginView() {
  const [store, actions] = useStore()
  const navigate = useNavigate()
  const [formState, setFormState] = createStore({email: "", password: ""})

  const handleSubmit = async (ev: SubmitEvent) => {
    ev.preventDefault();
    await actions.login(formState.email, formState.password)
    navigate("/todos")
  }

  return (
    <div class="w-1/3 mx-auto card bg-base-200 border-base-300">
      <div class="card-body">
        <h1 class="card-title text-2xl font-semibold">Login</h1>
        <form onSubmit={handleSubmit}>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              class="input input-bordered"
              name="email"
              type="email"
              placeholder="Email"
              value={formState.email}
              onInput={(e) => setFormState("email", e.target.value)}
              required
              // use:validate={[userNameExists]}
            />
            {/*{errors.email && <ErrorMessage error={errors.email}/>}*/}
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              class="input input-bordered"
              type="password"
              name="password"
              placeholder="Password"
              required=""
              minLength="2"
              value={formState.password}
              onInput={(e) => setFormState("password", e.target.value)}
              // use:validate
            />
          </div>

          <div class="form-control mt-4">
            <button class="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          <div class="mt-2">
            <p class="flex justify-center items-center">
              Need an account? <A class="btn btn-link" href="/register">Create a new account here</A>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
