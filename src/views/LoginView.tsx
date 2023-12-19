import {createStore} from 'solid-js/store'
import {A, useNavigate} from '@solidjs/router'
import {useStore} from '../store/storeContext.tsx'

export default function LoginView() {
  const [store, actions] = useStore()
  const navigate = useNavigate()
  const [formState, setFormState] = createStore({email: '', password: ''})

  const handleSubmit = async (ev: SubmitEvent) => {
    ev.preventDefault()
    await actions.login(formState.email, formState.password)
    navigate('/todos')
  }

  return (
    <div class="container mt-3">
      <div class="d-flex align-items-center py-4">
        <div class="m-auto w-100" style="max-width: 500px;">
          <form onSubmit={handleSubmit}>
            <h1 class="h3 mb-3">Login</h1>
            <div class="form-floating">
              <input
                id="form-email"
                class="form-control"
                name="email"
                type="email"
                placeholder="Email"
                value={formState.email}
                onInput={(e) => setFormState('email', e.target.value)}
                required
                // use:validate={[userNameExists]}
              />
              <label class="label" htmlFor="form-email">Email</label>
              {/*{errors.email && <ErrorMessage error={errors.email}/>}*/}
            </div>

            <div class="form-floating">
              <input
                class="form-control"
                id="form-password"
                type="password"
                name="password"
                placeholder="Password"
                minLength="2"
                value={formState.password}
                onInput={(e) => setFormState('password', e.target.value)}
                // use:validate
              />
              <label htmlFor="form-password">Password</label>
            </div>

            <button class="btn btn-primary w-100 py-2" type="submit">
              Login
            </button>

            <div class="mt-2">
              <p class="flex justify-center items-center">
                Need an account? <A class="btn btn-link" href="/register">Create a new account here</A>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
