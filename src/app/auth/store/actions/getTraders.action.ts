import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { Trader } from './../../../shared/types/trader.interface';

export const getTradersAction = createAction(
  ActionTypes.GET_TRADERS,
  props<{ userId: string }>()
);

export const getTradersSuccessAction = createAction(
  ActionTypes.GET_TRADERS_SUCCESS,
  props<{ traders: Trader[] }>()
);

export const getTradersFailureAction = createAction(
  ActionTypes.GET_TRADERS_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
