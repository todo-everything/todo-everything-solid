import {createStore} from 'solid-js/store'
import {A, useNavigate} from '@solidjs/router'
import {useStore} from '../store/storeContext.tsx'
import {Button, Container, FloatingLabel, Form} from 'solid-bootstrap'
import {createEffect} from 'solid-js'

export default function LoginView() {
  const [store, actions] = useStore()
  const navigate = useNavigate()
  const [formState, setFormState] = createStore({email: '', password: ''})

  createEffect(() => {
    if (!store.currentUser.loading && store.currentUser()!) {
      navigate('/todos')
    }
  })

  const handleSubmit = async (ev: SubmitEvent) => {
    ev.preventDefault()
    await actions.accounts.login(formState.email, formState.password)
    navigate('/todos')
  }

  return (
    <Container class="mt-3">
      <div class="d-flex align-items-center py-4">
        <div class="m-auto w-100" style="max-width: 500px;">
          <Form role="form" onSubmit={handleSubmit}>
            <h1 class="h3 mb-3">Login</h1>

            <FloatingLabel controlId="form-email" label="Email">
              <Form.Control
                id="form-email"
                class="form-control"
                name="email"
                type="email"
                placeholder="Email"
                value={formState.email}
                onInput={(e) => setFormState('email', e.target.value)}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="form-password" label="Password">
              <Form.Control
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
            </FloatingLabel>

            <Button class="w-100 py-2" role="button" type="submit" variant="primary">
              Login
            </Button>

            <div class="mt-2">
              <p class="d-flex justify-content-center align-items-center">
                Need an account? <A class="btn btn-link" href="/register">Create a new account here</A>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  )
}
