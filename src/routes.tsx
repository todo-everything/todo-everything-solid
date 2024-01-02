import { lazy } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router' // Protected route pattern from:

// Protected route pattern from:
// https://codesandbox.io/p/sandbox/solid-app-router-protected-routes-qt5mv?file=%2Findex.tsx%3A57%2C19

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./views/ProtectedView')),
    children: [
      {
        path: '/',
        component: lazy(() => import('./views/RootView')),
      },
      {
        path: 'todos',
        component: lazy(() => import('./views/TodoView')),
      },
    ],
  },
  {
    path: '/login',
    component: lazy(() => import('./views/LoginView')),
  },
  {
    path: '/register',
    component: lazy(() => import('./views/RegisterView')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
]
