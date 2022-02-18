import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ExchangeApi } from './../../types/newApiKey.interface';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';

export const newApiAction = createAction(
  ActionTypes.NEW_API_KEY,
  props<{ newApi: ExchangeApi[] }>()
);

export const newApiSuccessAction = createAction(
  ActionTypes.NEW_API_KEY_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const newApiFailureAction = createAction(
  ActionTypes.NEW_API_KEY_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
