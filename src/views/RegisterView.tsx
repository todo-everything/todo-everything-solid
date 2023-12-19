import {createSignal} from 'solid-js'
import {A} from '@solidjs/router'


interface RegisterViewProps {

}

export default function RegisterView(props: RegisterViewProps) {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')

  const handleSubmit = (e) => {

  }

  const handleInput = (e, field: string) => {
    if (field === 'email') {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }


  return (
    <div class="w-1/3 mx-auto card bg-base-200 border-base-300">
      <div class="card-body">
        <h1 class="text-2xl font-semibold">Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div class="form-control">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              class="input input-bordered"
              type="text"
              value={email()}
              placeholder="youremail@example.com"
              onInput={(e) => handleInput(e, 'email')}
            />
          </div>
          <div class="form-control">
            <div class="label">
              <span class="label-text">Password</span>
            </div>
            <input
              class="input input-bordered"
              type="password"
              value={password()}
              placeholder="Your password"
              onInput={(e) => handleInput(e, 'password')}
            />
          </div>

          <div class="form-control mt-4">
            <button class="btn btn-primary">Create new account</button>
          </div>

          <div class="mt-2">
            <p class="flex justify-center items-center">
              Already have an account? <A class="btn btn-link" href="/login">Login here</A>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}