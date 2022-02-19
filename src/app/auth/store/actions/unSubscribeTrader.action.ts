import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

export const unSubscribeTraderAction = createAction(
  ActionTypes.UNSUBSCRIBE_TRADER,
  props<{ traderId: string; userId: string }>()
);

export const unSubscribeTraderSuccessAction = createAction(
  ActionTypes.UNSUBSCRIBE_TRADER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const unSubscribeTraderFailureAction = createAction(
  ActionTypes.UNSUBSCRIBE_TRADER_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
