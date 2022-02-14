import { createReducer, on, Action } from '@ngrx/store';

import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import { logoutAction } from './actions/logout.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const authReducer = createReducer(
  initialState,
  on(
    logoutAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoggedIn: false,
      currentUser: null,
    })
  )
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
