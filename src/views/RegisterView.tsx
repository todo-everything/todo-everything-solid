import {A} from '@solidjs/router'
import {Button, Container, FloatingLabel, Form} from 'solid-bootstrap'
import {createStore} from 'solid-js/store'
import {useStore} from '~/store/storeContext.tsx'


interface RegisterViewProps {

}

export default function RegisterView(props: RegisterViewProps) {
  const [store, actions] = useStore()
  const [formState, setFormState] = createStore({email: '', password: ''})


  const handleSubmit = async (e) => {
    e.preventDefault()
    await actions.register(formState.email, formState.password)
    // TODO: Error handling here or on the actions/store side.
    await actions.login(formState.email, formState.password)
  }

  return (
    <Container class="mt-3">
      <div class="d-flex align-items-center py-4">
        <div class="m-auto w-100" style="max-width: 500px;">
          <Form onSubmit={handleSubmit}>
            <h1 class="h3 mb-3">Create an account</h1>
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

            <Button class="w-100 py-2" variant="primary" type="submit">
              Create new account
            </Button>

            <div class="mt-2">
              <p class="d-flex justify-content-center align-items-center">
                Already have an account? <A class="btn btn-link" href="/login">Login here</A>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  )
}