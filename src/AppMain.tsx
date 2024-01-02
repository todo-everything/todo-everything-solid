import { Router } from '@solidjs/router'
import { ContextProvider } from './store/storeContext.tsx'
import { routes } from './routes.tsx'
import App from './App.tsx'

export default function AppMain() {
  return (
    <ContextProvider>
      <Router root={App}>{routes}</Router>
    </ContextProvider>
  )
}
