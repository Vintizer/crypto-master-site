import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

export const makeTraderAction = createAction(
  ActionTypes.MAKE_TRADER,
  props<{ userId: string }>()
);

export const makeTraderSuccessAction = createAction(
  ActionTypes.MAKE_TRADER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const makeTraderFailureAction = createAction(
  ActionTypes.MAKE_TRADER_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
