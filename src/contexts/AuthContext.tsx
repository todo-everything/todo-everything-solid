import { createContext, ParentProps, useContext } from 'solid-js'
import { IUser } from '../api/models'

interface AuthProviderProps extends ParentProps {
  user: IUser | null
}

export const AuthContext = createContext()

// export function AuthProvider(props: AuthProviderProps) {
//   const user = createSignal<IUser | null>(props.user)
//
//   return (
//       <AuthContext.Provider value={user}>
//         {props.children}
//       </AuthContext.Provider>
//   )
// }

export function useAuth() {
  return useContext(AuthContext)
}
