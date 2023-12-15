import {createEffect} from 'solid-js'
import {SetStoreFunction} from 'solid-js/store'
import {IStoreState} from './storeState'

// import {logger} from '../utils/logger'
export const AUTH_TOKEN_KEY = "access"
export const REFRESH_TOKEN_KEY = "refresh"

export interface ICommonActions {
  setToken: (token: string | undefined) => void
  setRefreshToken: (refreshToken: string | undefined) => void
}

/**
 *
 * @param agent
 * @param actions
 * @param state
 * @param setState
 * @returns
 */

export function createCommonStore(actions: ICommonActions, state: IStoreState, setState: SetStoreFunction<IStoreState>): void {

  // Triggered by change in the store.token state. Save the new
  // token state to the local store.

  createEffect(() => {
    if (state.token) {
      // logger.warn('Add token [%s ...]', state.token.slice(0, 15))
      console.log('Have auth token in state, storing in localStorage', {
        token: state.token,
        refresh: state.refreshToken,
      });
      localStorage.setItem(AUTH_TOKEN_KEY, state.token);
    } else {
      console.warn('Removing tokens from localStorage');
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }

    if (state.refreshToken) {
      console.log('Have refreshToken in state, storing in localStorage', {
        refresh: state.refreshToken,
      });
      localStorage.setItem(REFRESH_TOKEN_KEY, state.refreshToken);
    } else {
      console.warn('Removing REFRESH_TOKEN localStorage');
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  })

  // login/logout actions call setToken() which updates the
  // token state in the store. This, in turn, triggers
  // the above createEffect()
  actions.setRefreshToken = (refreshToken: string | undefined) => {
    console.log('set refreshToken')
    setState({refreshToken})
  }

  actions.setToken = (token: string | undefined) => {
    console.log('set token???', {token})
    setState({token})
  }

}