import { createAction } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';

export const logoutAction = createAction(ActionTypes.LOGOUT);
export const logoutSuccessAction = createAction(
  ActionTypes.LOGOUT_SUCCESS_ACTION
);
